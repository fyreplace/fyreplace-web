<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from 'i18next';
	import { info } from '$lib/data/urls.json';
	import { navigate, Destination } from '$lib/destinations';
	import { DisplayableError } from '$lib/events';
	import { call, getTokensClient, getUsersClient } from '$lib/openapi';
	import type { ExplainedFailure, ViolationReport } from '$lib/openapi/generated';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Logo from '$lib/components/branding/logo.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import TextField from '$lib/components/inputs/text-field.svelte';

	let username = $state('');
	let email = $state('');
	let randomCode = $state('');
	let isWaitingForRandomCode = $state(false);
	let hasAcceptedTerms = $state(false);
	let isRegistering = $state(false);
	let token = $state<string>();
	let isLoading = $state(false);

	const areUsernameAndEmailValid = $derived(
		username.length >= 3 &&
			username.length <= 50 &&
			email.length >= 3 &&
			email.length <= 254 &&
			email.includes('@')
	);
	const isRandomCodeValid = $derived(randomCode.length >= 8);
	const canSubmit = $derived(
		isWaitingForRandomCode ? isRandomCodeValid : areUsernameAndEmailValid && hasAcceptedTerms
	);

	$effect(() => {
		if (token) {
			navigate(Destination.Settings);
		}
	});

	onMount(() => {
		if (window.location.hash && isWaitingForRandomCode) {
			randomCode = window.location.hash.replace('#', '');
			window.location.hash = '';
			createToken();
		}
	});

	function makeAnchor(textKey: string, link: string) {
		return `<a href="${link}" target="_blank">${t(textKey)}</a>`;
	}

	function cancel() {
		isWaitingForRandomCode = false;
		isRegistering = false;
		randomCode = '';
	}

	async function submit() {
		if (!canSubmit) {
			return;
		} else if (isWaitingForRandomCode) {
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
					const client = await getUsersClient();
					await client.createUser({ username, email });
					isWaitingForRandomCode = true;
					isRegistering = true;
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
								return new DisplayableError('errors.400');
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

	function createToken() {
		return call(
			async () => {
				try {
					isLoading = true;
					const client = await getTokensClient();
					token = await client.createToken({ identifier: email, secret: randomCode });
					isWaitingForRandomCode = false;
					isRegistering = false;
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

<SavedValue name="account.username" bind:value={username} />
<SavedValue name="account.email" bind:value={email} />
<SavedValue name="account.isWaitingForRandomCode" bind:value={isWaitingForRandomCode} />
<SavedValue name="account.isRegistering" bind:value={isRegistering} />
<SavedValue name="connection.token" bind:value={token} />

<form class="destination">
	<Logo />
	<div class="fields">
		<TextField
			label={t('register.username.label')}
			placeholder={t('register.username.placeholder')}
			name="username"
			autofocus
			disabled={isWaitingForRandomCode}
			bind:value={username}
		/>
		<TextField
			label={t('register.email.label')}
			placeholder={t('register.email.placeholder')}
			name="email"
			disabled={isWaitingForRandomCode}
			bind:value={email}
		/>
		{#if isWaitingForRandomCode}
			<TextField
				label={t('account.randomCode.label')}
				placeholder={t('account.randomCode.placeholder')}
				name="one-time-code"
				autofocus
				bind:value={randomCode}
			/>
			<div class="help">{t('account.help.randomCode')}</div>
		{/if}
		<label class="terms">
			<input type="checkbox" disabled={isWaitingForRandomCode} bind:checked={hasAcceptedTerms} />
			<span>
				{@html t('register.terms-acceptance', {
					interpolation: { escapeValue: false },
					terms: makeAnchor('register.terms-of-service', info.termsOfService),
					privacy: makeAnchor('register.privacy-policy', info.privacyPolicy)
				})}
			</span>
		</label>
	</div>
	<div class="buttons">
		<Button type="button" disabled={!isWaitingForRandomCode || isLoading} onClick={cancel}>
			{t('cancel')}
		</Button>
		<Button type="submit" primary disabled={!canSubmit} loading={isLoading} onClick={submit}>
			{t('destinations.register')}
		</Button>
	</div>
</form>

<style lang="scss">
	@use '$lib/style/mixins';

	.destination {
		width: 100%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2em;

		@include mixins.expanded-height {
			height: 100%;
		}
	}

	.fields {
		width: min-content;
		min-width: 280px;
		display: flex;
		flex-direction: column;
		gap: 1em;
	}

	.help {
		text-align: center;
	}

	.terms {
		display: flex;
		flex-direction: row;
		gap: 0.5em;
	}

	.buttons {
		display: grid;
		grid-template-columns: repeat(2, 1fr);
		gap: 1em;
	}
</style>
