<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { t } from 'i18next';
	import { navigate, Destination } from '$lib/destinations';
	import { DisplayableError } from '$lib/events';
	import { call, getUsersClient } from '$lib/openapi';
	import type { User } from '$lib/openapi/generated';
	import SavedValue from '$lib/components/saved-value.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import EditableAvatar from './editable-avatar.svelte';

	const isRegistering = writable(false);
	const token = writable<string | null>(null);
	let currentUser: User | null = null;

	onMount(() =>
		token.subscribe(async ($token) => {
			if ($token) {
				await call(
					async () => {
						const client = await getUsersClient();
						currentUser = await client.getCurrentUser();
					},
					async () => {}
				);
			} else {
				await navigate($isRegistering ? Destination.Register : Destination.Login);
			}
		})
	);

	function updateAvatar(event: CustomEvent<File>) {
		return call(
			async () => {
				const client = await getUsersClient();
				const avatar = await client.setCurrentUserAvatar(event.detail);

				if (currentUser) {
					currentUser = { ...currentUser, avatar };
				}
			},
			async (error) => {
				switch (error.response.status) {
					case 413:
						return new DisplayableError('settings.errors.413');
					case 415:
						return new DisplayableError('settings.errors.415');
					default:
						return new DisplayableError();
				}
			}
		);
	}

	async function logout() {
		$token = '';
		await navigate(Destination.Login);
	}
</script>

<SavedValue name="account.isRegistering" store={isRegistering} />
<SavedValue name="connection.token" store={token} />

{#if $token}
	<div class="destination">
		<EditableAvatar user={currentUser} on:file={updateAvatar} />
		<span title={t('settings.username')} class="username"
			>{currentUser?.username ?? t('loading')}</span
		>
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
