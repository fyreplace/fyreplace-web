<script lang="ts">
	import Logo from '$lib/components/branding/logo.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import TextField from '$lib/components/inputs/text-field.svelte';

	let identifier = '';
	let canSubmit = false;

	$: canSubmit = identifier.length >= 3 && identifier.length <= 254;
</script>

<form class="destination">
	<Logo />
	<TextField
		label="Identifier"
		name="username"
		placeholder="Username or email"
		bind:value={identifier}
	/>
	<Button disabled={!canSubmit}>Login</Button>
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
</style>
