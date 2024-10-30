<script lang="ts" generics="T">
	import { onDestroy, onMount } from 'svelte';
	import { browser } from '$app/environment';
	import { eventBus, type Listener, type Class } from '$lib/events';

	interface Props {
		type: Class<T>;
		listener: Listener<T>;
	}

	let { type, listener }: Props = $props();

	if (browser) {
		onMount(() => eventBus.addListener(type, listener));
		onDestroy(() => eventBus.removeListener(type, listener));
	}
</script>
