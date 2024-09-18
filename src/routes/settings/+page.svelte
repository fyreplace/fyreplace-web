<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { t } from 'i18next';
	import { navigate, Destination } from '$lib/destinations';
	import { getUsersClient } from '$lib/openapi';
	import type { User } from '$lib/openapi/generated';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Avatar from '$lib/components/avatar.svelte';
	import Button from '$lib/components/inputs/button.svelte';

	const isRegistering = writable(false);
	const token = writable<string | null>(null);
	let currentUser: User | null = null;

	onMount(() =>
		token.subscribe(async ($token) => {
			if ($token) {
				const client = await getUsersClient();
				currentUser = await client.getCurrentUser();
			} else {
				await navigate($isRegistering ? Destination.Register : Destination.Login);
			}
		})
	);

	async function logout() {
		$token = '';
		await navigate(Destination.Login);
	}
</script>

<SavedValue name="account.isRegistering" store={isRegistering} />
<SavedValue name="connection.token" store={token} />

{#if $token}
	<div class="destination">
		<Avatar user={currentUser} size={100} tinted />
		<span class="username">{currentUser?.username ?? t('loading')}</span>
		<span>
			{t('settings.dateJoined')}
			<time>{currentUser?.dateCreated.toLocaleString() ?? t('loading')}</time>
		</span>
		<Button type="button" on:click={logout}>{t('settings.logout')}</Button>
	</div>
{/if}

<style lang="scss">
	@import '$lib/style/mixins';

	.destination {
		width: 100%;
		padding: 2em;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 1em;

		@include expanded-height {
			height: 100%;
		}
	}

	.username {
		font-size: 1.5em;
		font-weight: bold;
	}
</style>
