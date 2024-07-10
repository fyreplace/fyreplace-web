<script lang="ts">
	import Navigation from './navigation.svelte';
	import TopBar from './top-bar.svelte';
</script>

<div class="layout">
	<Navigation vertical />
	<div class="content">
		<TopBar vertical />
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
</style>
