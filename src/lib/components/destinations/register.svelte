<script lang="ts">
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

<form class="destination">
	<Logo />
	<div class="fields">
		<TextField
			label="Username"
			name="username"
			placeholder="Only letters, numbers and dashes"
			bind:value={username}
		/>
		<TextField label="Email" name="email" placeholder="email@example.org" bind:value={email} />
	</div>
	<Button disabled={!canSubmit}>Sign up</Button>
</form>

<style lang="scss">
	.destination {
		width: 100%;
		height: 100%;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2em;
	}

	.fields {
		display: flex;
		flex-direction: column;
		gap: 1em;
	}
</style>
