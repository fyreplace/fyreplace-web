<script lang="ts">
	import type { Snippet } from 'svelte';

	interface Props {
		title: string;
		children: Snippet;
		onFile: (file: File) => void;
	}

	let { title, children, onFile }: Props = $props();

	let input: HTMLInputElement | undefined = $state();

	function onInput() {
		const file = input?.files?.item(0);

		if (file) {
			onFile(file);
		}
	}

	function onDragOver(event: DragEvent) {
		event.preventDefault();

		if (event.dataTransfer) {
			event.dataTransfer.dropEffect = 'copy';
		}
	}

	function onDrop(event: DragEvent) {
		event.preventDefault();
		const file = event.dataTransfer?.files.item(0);

		if (file) {
			onFile(file);
		}
	}
</script>

<label {title} class="image-picker" ondragover={onDragOver} ondrop={onDrop}>
	<input
		type="file"
		accept="image/jpeg,image/png,image/wepb"
		class="input"
		oninput={onInput}
		bind:this={input}
	/>
	{@render children()}
</label>

<style lang="scss">
	.image-picker {
		position: relative;
		display: flex;
	}

	.input {
		position: absolute;
		left: 0;
		top: 0;
		width: 1px;
		height: 1px;
		opacity: 0;
	}
</style>
