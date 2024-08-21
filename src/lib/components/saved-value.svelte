<script lang="ts" generics="N extends keyof SavedValueKeys, T extends SavedValueKeys[N]">
	import { onMount } from 'svelte';
	import type { Writable } from 'svelte/store';
	import { browser } from '$app/environment';
	import { eventBus, StorageChange } from '$lib/events';
	import EventListener from './event-listener.svelte';

	export let name: N;
	export let store: Writable<T | null>;

	onMount(() => {
		$store = getStoredValue() ?? $store;
		return store.subscribe((value) => {
			if (browser) {
				localStorage.setItem(name, JSON.stringify(value));
				eventBus.publish(new StorageChange(name));
			}
		});
	});

	function getStoredValue() {
		return JSON.parse(localStorage.getItem(name) || 'null');
	}

	function onExternalStorageEvent(event: StorageEvent) {
		if (event.key === name) {
			$store = JSON.parse(event.newValue || 'null');
		}
	}

	function onInternalStorageChange(change: StorageChange) {
		if (change.key === name) {
			const value = getStoredValue();

			if (value !== $store) {
				$store = value;
			}
		}
	}
</script>

<svelte:window on:storage={onExternalStorageEvent} />
<EventListener type={StorageChange} listener={(e) => onInternalStorageChange(e.detail)} />
