<script lang="ts">
	export let type: HTMLButtonElement['type'];
	export let disabled = false;
</script>

<button {type} {disabled} on:click|preventDefault>
	<slot />
</button>

<style lang="scss">
	button {
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
</style>
