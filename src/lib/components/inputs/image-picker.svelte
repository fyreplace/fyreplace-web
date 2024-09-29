<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { t } from 'i18next';

	const dispatch = createEventDispatcher();
	let input: HTMLInputElement;

	function onInput() {
		const file = input.files?.item(0);

		if (file) {
			dispatch('file', file);
		}
	}
</script>

<label title={t('components.image-picker')} class="image-picker">
	<input
		type="file"
		accept="image/jpeg,image/png,image/wepb"
		class="input"
		on:input={onInput}
		bind:this={input}
	/>
	<slot />
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
