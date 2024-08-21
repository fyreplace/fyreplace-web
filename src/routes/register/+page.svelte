<script lang="ts">
	import { derived, writable } from 'svelte/store';
	import { t } from 'i18next';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Logo from '$lib/components/branding/logo.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import TextField from '$lib/components/inputs/text-field.svelte';

	const username = writable('');
	const email = writable('');
	const canSubmit = derived(
		[username, email],
		([$username, $email]) =>
			$username.length >= 3 &&
			$username.length <= 50 &&
			$email.length >= 3 &&
			$email.length <= 254 &&
			$email.includes('@')
	);
</script>

<SavedValue name="account.username" store={username} />
<SavedValue name="account.email" store={email} />

<form class="destination">
	<Logo />
	<div class="fields">
		<TextField
			label={t('register.username')}
			name="username"
			placeholder={t('register.username-placeholder')}
			autofocus
			bind:value={$username}
		/>
		<TextField
			label={t('register.email')}
			name="email"
			placeholder={t('register.email-placeholder')}
			bind:value={$email}
		/>
	</div>
	<Button type="submit" primary disabled={!$canSubmit}>{t('destinations.register')}</Button>
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
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
