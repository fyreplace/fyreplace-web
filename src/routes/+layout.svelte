<script lang="ts">
	import i18next from 'i18next';
	import { currentDestination } from '$lib/stores/destinations';
	import Navigation from './navigation.svelte';
	import TopBar from './top-bar.svelte';
</script>

<svelte:head>
	<title>{i18next.t($currentDestination.titleKey)} | {i18next.t('app.name')}</title>
</svelte:head>

<div class="layout">
	<Navigation vertical />
	<div class="content">
		<TopBar sideNavigation />
		<TopBar />
		<main class="page">
			<slot />
		</main>
	</div>
	<Navigation />
</div>

<style lang="scss">
	@import '$lib/style/mixins';

	:global(:root),
	:global(body) {
		width: 100%;
		height: 100%;
		margin: 0;
		font-family: sans-serif;
		overflow: hidden;
	}

	.layout {
		height: 100%;
		display: flex;
		flex-direction: column;

		@include regular {
			flex-direction: row;
		}
	}

	.content,
	.page {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.content {
		overflow: hidden;
	}

	.page {
		padding-left: env(safe-area-inset-left);
		padding-right: env(safe-area-inset-right);
		overflow: auto;

		@include regular {
			padding-left: 0;
			padding-bottom: env(safe-area-inset-bottom);
		}
	}
</style>
