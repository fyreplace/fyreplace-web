<script lang="ts">
	import { t } from 'i18next';
	import Button from '$lib/components/inputs/button.svelte';
	import { createEventDispatcher } from 'svelte';

	export let visible: boolean;
	export let title: string;
	export let message: string;

	const dispatch = createEventDispatcher();
</script>

<div class="dialog" class:visible hidden={!visible}>
	<div class="background" />
	<div class="alert">
		<h2>{title}</h2>
		<p>{message}</p>
		<div class="buttons">
			<Button type="button" on:click={() => dispatch('ok')}>{t('ok')}</Button>
		</div>
	</div>
</div>

<style lang="scss">
	@import '$lib/style/mixins';

	.dialog,
	.background {
		width: 100%;
		height: 100%;
		position: absolute;
		display: flex;
		justify-content: center;
		align-items: center;
	}

	.dialog:not(.visible) {
		pointer-events: none;
	}

	.background {
		transition: 0.3s;

		.visible & {
			background: #0000003f;
			backdrop-filter: blur(4px);
		}
	}

	.alert {
		z-index: 1;
		display: flex;
		flex-direction: column;
		min-width: 240px;
		padding: 1em 2em;
		border-radius: 1em;
		opacity: 0;
		background: var(--color-surface);
		box-shadow: 0 0 1em var(--color-surface-shadow);
		transform: scale(85%);
		transition: 0.3s;

		@include regular {
			min-width: 300px;
		}

		.visible & {
			opacity: 1;
			transform: none;
		}
	}

	.buttons {
		align-self: flex-end;
		margin: 1em 0;
	}
</style>
