<script lang="ts">
	export let label: string;
	export let name: string;
	export let placeholder: string;
	export let maxLength: number;
	export let value = '';
	export let disabled = false;
</script>

<label class="text-area">
	<span>{label}</span>
	<textarea contenteditable {name} {placeholder} {disabled} maxlength={maxLength} bind:value />
</label>

<style lang="scss">
	.text-area textarea {
		width: 100%;
		min-height: 5em;
		margin-top: 0.5em;
		padding: 0.5em;
		border: 2px solid var(--color-border);
		border-radius: 0.5em;
		outline: none;
		box-sizing: border-box;
		resize: vertical;
		transition: 0.1s;

		&:focus {
			border-color: var(--color-accent);
		}
	}
</style>
