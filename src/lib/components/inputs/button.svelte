<script lang="ts">
	import type { Snippet } from 'svelte';
	import Loader from './button/loader.svelte';

	interface Props {
		type: HTMLButtonElement['type'];
		primary?: boolean;
		disabled?: boolean;
		loading?: boolean;
		children?: Snippet;
		onClick: (event: MouseEvent) => void;
	}

	let {
		type,
		primary = false,
		disabled = false,
		loading = false,
		children,
		onClick
	}: Props = $props();

	function onClickPreventingDefault(event: MouseEvent) {
		event.preventDefault();
		onClick(event);
	}
</script>

<button {type} disabled={disabled || loading} class:primary onclick={onClickPreventingDefault}>
	<span class:invisible={loading}>{@render children?.()}</span>
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
