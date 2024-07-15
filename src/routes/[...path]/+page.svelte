<script lang="ts">
	import i18next from 'i18next';
	import { currentDestination } from '$lib/stores/destinations';
</script>

<svelte:head>
	<title>{i18next.t($currentDestination.titleKey)} | {i18next.t('app.name')}</title>
</svelte:head>

<svelte:component this={$currentDestination.content} />
