<script lang="ts">
	interface Props {
		label: string;
		name: string;
		placeholder: string;
		maxLength: number;
		value?: string;
		disabled?: boolean;
	}

	let {
		label,
		name,
		placeholder,
		maxLength,
		value = $bindable(''),
		disabled = false
	}: Props = $props();
</script>

<label class="text-area">
	<span>{label}</span>
	<textarea contenteditable {name} {placeholder} {disabled} maxlength={maxLength} bind:value
	></textarea>
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
