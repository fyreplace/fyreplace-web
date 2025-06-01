<script lang="ts">
	import { onMount } from 'svelte';

	interface Props {
		label: string;
		placeholder: string;
		name: string;
		value?: string;
		autofocus?: boolean;
		disabled?: boolean;
		title?: string;
	}

	let {
		label,
		placeholder,
		name,
		value = $bindable(''),
		autofocus = false,
		disabled = false,
		title = ''
	}: Props = $props();

	let input: HTMLInputElement | undefined = $state();

	if (autofocus) {
		onMount(() =>
			setTimeout(() => {
				if (!value) {
					input?.focus();
				}
			})
		);
	}
</script>

<label class="text-field" {title}>
	{#if value}
		<input type="hidden" {name} bind:value />
	{/if}
	{#if label}
		<span class="label">{label}</span>
	{/if}
	<input type="text" {placeholder} {name} {disabled} bind:this={input} bind:value />
</label>

<style lang="scss">
	.text-field {
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
		outline: none;

		&:disabled {
			cursor: not-allowed;
		}

		@media (hover: hover) {
			&:hover:not(:focus):not(:disabled) {
				border-color: currentColor;
			}
		}

		&:focus {
			border-color: var(--color-accent);
		}
	}
</style>
