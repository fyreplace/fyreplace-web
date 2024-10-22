<script lang="ts">
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { t } from 'i18next';
	import { navigate, Destination } from '$lib/destinations';
	import { DisplayableError } from '$lib/events';
	import { call, getTokensClient } from '$lib/openapi';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Logo from '$lib/components/branding/logo.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import TextField from '$lib/components/inputs/text-field.svelte';

	const identifier = writable('');
	const randomCode = writable('');
	const isWaitingForRandomCode = writable(false);
	const token = writable<string | null>(null);
	let isLoading = false;

	const isIdentifierValid = derived(
		identifier,
		($identifier) => $identifier.length >= 3 && $identifier.length <= 254
	);
	const isRandomCodeValid = derived(randomCode, ($randomCode) => $randomCode.length >= 8);
	const canSubmit = derived(
		[isIdentifierValid, isRandomCodeValid, isWaitingForRandomCode],
		([$isIdentifierValid, $isRandomCodeValid, $isWaitingForRandomCode]) =>
			$isWaitingForRandomCode ? $isRandomCodeValid : $isIdentifierValid
	);

	onMount(() => {
		const unsubscribe = token.subscribe(async ($token) => {
			if ($token) {
				await navigate(Destination.Settings);
			}
		});

		if (window.location.hash && $isWaitingForRandomCode) {
			$randomCode = window.location.hash.replace('#', '');
			window.location.hash = '';
			createToken();
		}

		return unsubscribe;
	});

	function cancel() {
		$isWaitingForRandomCode = false;
		$randomCode = '';
	}

	async function submit() {
		if (!$canSubmit) {
			return;
		} else if ($isWaitingForRandomCode) {
			await createToken();
		} else {
			await sendEmail();
		}
	}

	function sendEmail() {
		return call(
			async () => {
				try {
					isLoading = true;
					const client = await getTokensClient();
					await client.createNewToken({ identifier: $identifier });
					$isWaitingForRandomCode = true;
				} finally {
					isLoading = false;
				}
			},
			async (error) => {
				switch (error.response.status) {
					case 400:
						return new DisplayableError('errors.400');
					case 403:
						$isWaitingForRandomCode = true;
						return new DisplayableError('login.errors.403');
					case 404:
						return new DisplayableError('login.errors.404');
					default:
						return new DisplayableError();
				}
			}
		);
	}

	function createToken() {
		return call(
			async () => {
				try {
					isLoading = true;
					const client = await getTokensClient();
					$token = await client.createToken({ identifier: $identifier, secret: $randomCode });
					$isWaitingForRandomCode = false;
				} finally {
					isLoading = false;
				}
			},
			async (error) => {
				switch (error.response.status) {
					case 400:
						return new DisplayableError('account.errors.createToken.400');
					case 404:
						return new DisplayableError('login.errors.404');
					default:
						return new DisplayableError();
				}
			}
		);
	}
</script>

<SavedValue name="account.identifier" store={identifier} />
<SavedValue name="account.isWaitingForRandomCode" store={isWaitingForRandomCode} />
<SavedValue name="connection.token" store={token} />

<form class="destination">
	<Logo />
	<div class="fields">
		<TextField
			label={t('login.identifier.label')}
			name="username"
			placeholder={t('login.identifier.placeholder')}
			autofocus
			disabled={$isWaitingForRandomCode}
			bind:value={$identifier}
		/>
		{#if $isWaitingForRandomCode}
			<TextField
				label={t('account.randomCode.label')}
				name="one-time-code"
				placeholder={t('account.randomCode.placeholder')}
				autofocus
				bind:value={$randomCode}
			/>
			<div class="help">{t('account.help.randomCode')}</div>
		{/if}
	</div>
	<div class="buttons">
		<Button type="button" disabled={!$isWaitingForRandomCode || isLoading} on:click={cancel}>
			{t('cancel')}
		</Button>
		<Button type="submit" primary disabled={!$canSubmit} loading={isLoading} on:click={submit}>
			{t('destinations.login')}
		</Button>
	</div>
</form>

<style lang="scss">
	@import '$lib/style/mixins';

	.destination {
		width: 100%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2em;

		@include expanded-height {
			height: 100%;
		}
	}

	.fields {
		width: min-content;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.help {
		text-align: center;
	}

	.buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1em;
	}
</style>
