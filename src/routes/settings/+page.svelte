<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { t } from 'i18next';
	import { info } from '$lib/data/urls.json';
	import { navigate, Destination } from '$lib/destinations';
	import { DisplayableError } from '$lib/events';
	import { call, getUsersClient } from '$lib/openapi';
	import type { User } from '$lib/openapi/generated';
	import SavedValue from '$lib/components/saved-value.svelte';
	import List from '$lib/components/list.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import EditableAvatar from './editable-avatar.svelte';
	import Loader from '$lib/components/inputs/button/loader.svelte';

	const isRegistering = writable(false);
	const token = writable<string | null>(null);
	let currentUser: User | null = null;
	let isLoadingAvatar = false;

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
					isLoadingAvatar = true;
					const client = await getUsersClient();
					const avatar = await client.setCurrentUserAvatar(event.detail);

					if (currentUser) {
						currentUser = { ...currentUser, avatar };
					}
				} finally {
					isLoadingAvatar = false;
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
				const client = await getUsersClient();
				await client.deleteCurrentUserAvatar();

				if (currentUser) {
					currentUser = { ...currentUser, avatar: '' };
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
			<svelte:fragment slot="header">
				<tr>
					<td colspan="2">{t('settings.profile.header')}</td>
				</tr>
			</svelte:fragment>
			<svelte:fragment slot="body">
				<tr>
					<td>
						<div class="avatar-wrapper">
							<EditableAvatar user={currentUser} loading={isLoadingAvatar} on:file={updateAvatar} />
						</div>
					</td>
					<td>
						<Button
							type="button"
							disabled={!currentUser?.avatar || isLoadingAvatar}
							on:click={removeAvatar}
						>
							{t('settings.profile.avatar.remove')}
						</Button>
					</td>
				</tr>
				<tr>
					<td>{t('settings.profile.username')}</td>
					<td title={t('settings.profile.username')} class="username">
						{currentUser?.username ?? t('loading')}
					</td>
				</tr>
				<tr>
					<td>{t('settings.profile.dateJoined')}</td>
					<td title={t('settings.profile.dateJoined')}>
						{currentUser?.dateCreated.toLocaleString() ?? t('loading')}
					</td>
				</tr>
				<tr>
					<td colspan="2" class="logout">
						<Button type="button" on:click={logout}>{t('settings.profile.logout')}</Button>
					</td>
				</tr>
			</svelte:fragment>
		</List>

		<List borderless>
			<svelte:fragment slot="header">
				<tr>
					<td>{t('settings.about.header')}</td>
				</tr>
			</svelte:fragment>
			<svelte:fragment slot="body">
				<tr>
					<td>
						<a href={info.website} target="_blank">{t('settings.about.website')}</a>
					</td>
				</tr>
				<tr>
					<td>
						<a href={info.termsOfService} target="_blank">{t('settings.about.termsOfService')}</a>
					</td>
				</tr>
				<tr>
					<td>
						<a href={info.privacyPolicy} target="_blank">{t('settings.about.privacyPolicy')}</a>
					</td>
				</tr>
				<tr>
					<td>
						<a href={info.sourceCode} target="_blank">{t('settings.about.sourceCode')}</a>
					</td>
				</tr>
			</svelte:fragment>
		</List>
	</div>
{/if}

<style lang="scss">
	@import '$lib/style/mixins';

	.destination {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2em;

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

	.logout {
		text-align: center;
	}
</style>
