<script lang="ts">
	import { onMount } from 'svelte';
	import { derived, writable } from 'svelte/store';
	import { t } from 'i18next';
	import { navigate, Destination } from '$lib/destinations';
	import { DisplayableError } from '$lib/events';
	import { call, getTokensClient, getUsersClient } from '$lib/openapi';
	import type { ExplainedFailure, ViolationReport } from '$lib/openapi/generated';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Logo from '$lib/components/branding/logo.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import TextField from '$lib/components/inputs/text-field.svelte';

	const username = writable('');
	const email = writable('');
	const randomCode = writable('');
	const isWaitingForRandomCode = writable(false);
	const isRegistering = writable(false);
	const token = writable<string | null>(null);
	let isLoading = false;

	const areUsernameAndEmailValid = derived(
		[username, email],
		([$username, $email]) =>
			$username.length >= 3 &&
			$username.length <= 50 &&
			$email.length >= 3 &&
			$email.length <= 254 &&
			$email.includes('@')
	);
	const isRandomCodeValid = derived(randomCode, ($randomCode) => $randomCode.length >= 8);
	const canSubmit = derived(
		[areUsernameAndEmailValid, isRandomCodeValid, isWaitingForRandomCode],
		([$areUsernameAndEmailValid, $isRandomCodeValid, $isWaitingForRandomCode]) =>
			$isWaitingForRandomCode ? $isRandomCodeValid : $areUsernameAndEmailValid
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
		$isRegistering = false;
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

	async function sendEmail() {
		call(
			async () => {
				try {
					isLoading = true;
					const client = await getUsersClient();
					await client.createUser({ username: $username, email: $email });
					$isWaitingForRandomCode = true;
					$isRegistering = true;
				} finally {
					isLoading = false;
				}
			},
			async (error) => {
				switch (error.response.status) {
					case 400:
						const violationReport = (await error.response.json()) as ViolationReport;

						switch (violationReport?.violations?.[0]?.field) {
							case 'createUser.input.username':
								return new DisplayableError('register.errors.createUser.400.username');
							case 'createUser.input.email':
								return new DisplayableError('register.errors.createUser.400.email');
							default:
								return new DisplayableError('erros.400');
						}
					case 403:
						return new DisplayableError('register.errors.createUser.403');
					case 409:
						const explainedFailure = (await error.response.json()) as ExplainedFailure;

						switch (explainedFailure.reason) {
							case 'username_taken':
								return new DisplayableError('register.errors.createUser.409.username');
							case 'email_taken':
								return new DisplayableError('register.errors.createUser.409.email');
							default:
								return new DisplayableError();
						}
					default:
						return new DisplayableError();
				}
			}
		);
	}

	async function createToken() {
		call(
			async () => {
				try {
					isLoading = true;
					const client = await getTokensClient();
					$token = await client.createToken({ identifier: $email, secret: $randomCode });
					$isWaitingForRandomCode = false;
					$isRegistering = false;
				} finally {
					isLoading = false;
				}
			},
			async (error) => {
				switch (error.response.status) {
					case 400:
						return new DisplayableError('account.errors.createToken.400');
					case 404:
						return new DisplayableError('register.errors.createToken.404');
					default:
						return new DisplayableError();
				}
			}
		);
	}
</script>

<SavedValue name="account.username" store={username} />
<SavedValue name="account.email" store={email} />
<SavedValue name="account.isWaitingForRandomCode" store={isWaitingForRandomCode} />
<SavedValue name="account.isRegistering" store={isRegistering} />
<SavedValue name="connection.token" store={token} />

<form class="destination">
	<Logo />
	<div class="fields">
		<TextField
			label={t('register.username')}
			name="username"
			placeholder={t('register.username-placeholder')}
			autofocus
			disabled={$isWaitingForRandomCode}
			bind:value={$username}
		/>
		<TextField
			label={t('register.email')}
			name="email"
			placeholder={t('register.email-placeholder')}
			disabled={$isWaitingForRandomCode}
			bind:value={$email}
		/>
		{#if $isWaitingForRandomCode}
			<TextField
				label={t('account.randomCode')}
				name="one-time-code"
				placeholder={t('account.randomCode-placeholder')}
				autofocus
				disabled={!$isWaitingForRandomCode}
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
			{t('destinations.register')}
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
