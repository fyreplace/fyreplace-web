<script lang="ts">
	import i18next from 'i18next';
	import Logo from '$lib/components/branding/logo.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import TextField from '$lib/components/inputs/text-field.svelte';

	let username = '';
	let email = '';
	let canSubmit = false;

	$: canSubmit =
		username.length >= 3 &&
		username.length <= 50 &&
		email.length >= 3 &&
		email.length <= 254 &&
		email.includes('@');
</script>

<form class="destination" data-testid="destinations.register">
	<Logo />
	<div class="fields">
		<TextField
			label={i18next.t('register.username')}
			name="username"
			placeholder={i18next.t('register.username-placeholder')}
			bind:value={username}
		/>
		<TextField
			label={i18next.t('register.email')}
			name="email"
			placeholder={i18next.t('register.email-placeholder')}
			bind:value={email}
		/>
	</div>
	<Button type="submit" disabled={!canSubmit}>{i18next.t('destinations.register')}</Button>
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
