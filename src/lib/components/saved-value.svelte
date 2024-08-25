<script lang="ts" generics="N extends keyof SavedValueKeys, T extends SavedValueKeys[N]">
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { getStoredItem, setStoredItem } from '$lib/storage';
	import { StorageChange } from '$lib/events';
	import EventListener from './event-listener.svelte';

	export let name: N;
	export let store: Writable<T | null>;

	onMount(() => {
		$store = getStoredItem<T>(name) ?? $store;
		return store.subscribe((value) => setStoredItem(name, value));
	});

	function onExternalStorageEvent(event: StorageEvent) {
		if (event.key === name) {
			$store = JSON.parse(event.newValue || 'null');
		}
	}

	function onInternalStorageChange(change: StorageChange) {
		if (change.key === name) {
			const value = getStoredItem<T>(name);

			if (value !== $store) {
				$store = value;
			}
		}
	}
</script>

<svelte:window on:storage={onExternalStorageEvent} />
<EventListener type={StorageChange} listener={(e) => onInternalStorageChange(e.detail)} />
