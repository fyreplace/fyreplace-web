<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { t } from 'i18next';
	import { Destination, navigate } from '$lib/destinations';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Button from '$lib/components/inputs/button.svelte';

	const token = writable<string | null>(null);

	onMount(() =>
		token.subscribe(async ($token) => {
			if (!$token) {
				await navigate(Destination.Login);
			}
		})
	);

	async function logout() {
		$token = null;
		await navigate(Destination.Login);
	}
</script>

<SavedValue name="connection.token" store={token} />

{#if $token}
	<div class="destination">
		<Button type="button" primary on:click={logout}>{t('settings.logout')}</Button>
	</div>
{/if}

<style lang="scss">
	.destination {
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		justify-content: center;
	}
</style>
