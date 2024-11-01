<script lang="ts" generics="N extends keyof SavedValueKeys, T extends SavedValueKeys[N]">
	import { onMount } from 'svelte';
	import { getStoredItem, setStoredItem } from '$lib/storage';
	import { StorageChange } from '$lib/events';
	import EventListener from './event-listener.svelte';

	interface Props {
		name: N;
		value?: T;
	}

	let { name, value = $bindable() }: Props = $props();

	let skip = $state(true);

	$effect(() => {
		if (!skip && value !== undefined) {
			setStoredItem(name, value);
		}
	});

	onMount(() => {
		const existingValue = getStoredItem<T>(name);

		if (existingValue !== undefined) {
			value = existingValue;
		}

		skip = false;
	});

	function onExternalStorageEvent(event: StorageEvent) {
		if (event.key === name) {
			const newValue = event.newValue !== null ? JSON.parse(event.newValue) : null;

			if (newValue !== value) {
				value = newValue;
			}
		}
	}

	function onInternalStorageChange(change: StorageChange) {
		if (change.key === name) {
			const newValue = getStoredItem<T>(name);

			if (newValue !== value) {
				value = newValue;
			}
		}
	}
</script>

<svelte:window onstorage={onExternalStorageEvent} />
<EventListener type={StorageChange} listener={(e) => onInternalStorageChange(e.detail)} />
