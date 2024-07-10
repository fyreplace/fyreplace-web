<script lang="ts">
	import { currentDestination } from '$lib/stores/destinations';
</script>

<svelte:component this={$currentDestination.content} />
