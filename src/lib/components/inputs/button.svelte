<script lang="ts">
	import Loader from './button/loader.svelte';

	export let type: HTMLButtonElement['type'];
	export let primary = false;
	export let disabled = false;
	export let loading = false;
</script>

<button {type} disabled={disabled || loading} class:primary on:click|preventDefault>
	<span class:invisible={loading}><slot /></span>
	{#if loading}
		<span class="loader"><Loader /></span>
	{/if}
</button>

<style lang="scss">
	button {
		position: relative;
		min-width: 80px;
		padding: 0.5em 1em;
		box-sizing: border-box;
		border: 2px solid transparent;
		border-radius: 0.5em;
		font-size: 1em;
		cursor: pointer;
		transition: 0.3s;

		&:disabled {
			cursor: not-allowed;

			&.primary {
				background: var(--color-disabled);
				color: var(--color-on-disabled);
			}

			&:not(.primary) {
				background: transparent;
				color: var(--color-disabled);
				border-color: var(--color-disabled);
			}
		}

		&:not(:disabled) {
			&:active {
				transition: 0.1s;
			}

			@media (hover: hover) {
				&:hover {
					filter: brightness(150%);
				}
			}

			&:active {
				filter: brightness(50%);
			}

			&.primary {
				background: var(--color-accent);
				color: var(--color-on-accent);
			}

			&:not(.primary) {
				color: var(--color-accent);
				border-color: var(--color-accent);

				@media (hover: hover) {
					&:hover {
						background: var(--color-accent-hover);
					}
				}
			}
		}

		&:not(.primary) {
			background: transparent;
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
