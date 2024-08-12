<script lang="ts" generics="T">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { eventBus, type Listener, type Class } from '$lib/events';

	export let type: Class<T>;
	export let listener: Listener<T>;

	if (browser) {
		onMount(() => eventBus.addListener(type, listener));
		onDestroy(() => eventBus.removeListener(type, listener));
	}
</script>
