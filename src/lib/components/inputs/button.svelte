<script lang="ts">
	import Loader from './button/loader.svelte';

	export let type: HTMLButtonElement['type'];
	export let disabled = false;
	export let loading = false;
</script>

<button {type} disabled={disabled || loading} on:click|preventDefault>
	<div class:invisible={loading}><slot /></div>
	{#if loading}
		<div class="loader"><Loader /></div>
	{/if}
</button>

<style lang="scss">
	button {
		position: relative;
		min-width: 80px;
		padding: 0.5em 1em;
		border: none;
		border-radius: 0.5em;
		background-color: var(--color-accent);
		color: var(--color-on-accent);
		font-size: 1em;
		cursor: pointer;
		transition: 0.3s;

		&:disabled {
			background-color: var(--color-disabled);
			cursor: not-allowed;
		}

		&:not(:disabled) {
			&:hover {
				filter: brightness(150%);
			}

			&:active {
				transform: scale(85%);
				transition: 0.1s;
			}
		}
	}

	.invisible {
		opacity: 0;
	}

	.loader {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}
</style>
