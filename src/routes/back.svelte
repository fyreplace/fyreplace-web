<script lang="ts">
	import { t } from 'i18next';
	import Icon from '$lib/components/icon.svelte';
	import Back from '$lib/components/icons/back.svelte';

	function goBack(event: MouseEvent) {
		event.preventDefault();
		history.back();
	}
</script>

<a href="#back" title={t('back')} onclick={goBack}>
	<Icon><Back /></Icon>
</a>

<style lang="scss">
	a {
		display: inline-flex;
		padding: 0.5em;
		border-radius: 50%;
		color: currentColor;
		transition: 0.1s;

		&:hover {
			background-color: var(--color-accent-hover);
		}

		&:active {
			background-color: var(--color-accent);
		}
	}
</style>
