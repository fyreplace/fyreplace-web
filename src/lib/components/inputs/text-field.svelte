<script lang="ts">
	import { onMount } from 'svelte';

	export let label: string;
	export let name: string;
	export let placeholder: string;
	export let value = '';
	export let autofocus = false;

	let input: HTMLInputElement;

	if (autofocus && !value) {
		onMount(() => input.focus());
	}
</script>

<label class="text-field">
	<span class="label">{label}</span>
	<input type="text" {name} {placeholder} bind:this={input} bind:value />
</label>

<style lang="scss">
	.text-field {
		min-width: 280px;
		display: flex;
		flex-direction: column;
		gap: 0.25em;
	}

	.label {
		padding-inline-start: calc(0.5em + 2px);
	}

	input {
		padding: 0.5em;
		box-sizing: border-box;
		border: 2px solid var(--color-border);
		border-radius: 0.5em;
		font-size: 1em;
		transition: 0.1s;

		&:hover,
		&:focus {
			border-color: var(--color-accent);
		}
	}
</style>
