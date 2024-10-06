<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { t } from 'i18next';
	import { navigate, Destination } from '$lib/destinations';
	import { DisplayableError } from '$lib/events';
	import { call, getUsersClient } from '$lib/openapi';
	import type { User } from '$lib/openapi/generated';
	import SavedValue from '$lib/components/saved-value.svelte';
	import List from '$lib/components/list.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import EditableAvatar from './editable-avatar.svelte';

	const isRegistering = writable(false);
	const token = writable<string | null>(null);
	let currentUser: User | null = null;
	let isAvatarLoading = false;

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
				try {
					isAvatarLoading = true;
					const client = await getUsersClient();
					const avatar = await client.setCurrentUserAvatar(event.detail);

					if (currentUser) {
						currentUser = { ...currentUser, avatar };
					}
				} finally {
					isAvatarLoading = false;
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

	function removeAvatar() {
		return call(
			async () => {
				try {
					isAvatarLoading = true;
					const client = await getUsersClient();
					await client.deleteCurrentUserAvatar();

					if (currentUser) {
						currentUser = { ...currentUser, avatar: '' };
					}
				} finally {
					isAvatarLoading = false;
				}
			},
			async () => new DisplayableError()
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
		<List borderless>
			<tr>
				<td>
					<div class="avatar-wrapper">
						<EditableAvatar user={currentUser} on:file={updateAvatar} />
					</div>
				</td>
				<td>
					<Button
						type="button"
						disabled={!currentUser?.avatar}
						loading={isAvatarLoading}
						on:click={removeAvatar}
					>
						{t('settings.avatar.remove')}
					</Button>
				</td>
			</tr>
			<tr>
				<td>{t('settings.username')}</td>
				<td title={t('settings.username')} class="username">
					{currentUser?.username ?? t('loading')}
				</td>
			</tr>
			<tr>
				<td>{t('settings.dateJoined')}</td>
				<td title={t('settings.dateJoined')}>
					{currentUser?.dateCreated.toLocaleString() ?? t('loading')}
				</td>
			</tr>
			<tr>
				<td colspan="2">
					<Button type="button" on:click={logout}>{t('settings.logout')}</Button>
				</td>
			</tr>
		</List>
	</div>
{/if}

<style lang="scss">
	@import '$lib/style/mixins';

	.destination {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;

		@include expanded-width {
			padding: 2em;
		}

		@include expanded {
			height: 100%;
		}
	}

	.avatar-wrapper {
		display: inline-block;
	}

	.username {
		font-weight: bold;
	}
</style>
