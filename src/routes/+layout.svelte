<script lang="ts">
	import { type Snippet } from 'svelte';
	import { t } from 'i18next';
	import * as Sentry from '@sentry/sveltekit';
	import { navigate, Destination } from '$lib/destinations';
	import { DisplayableError } from '$lib/events';
	import { getUsersClient } from '$lib/openapi';
	import SavedValue from '$lib/components/saved-value.svelte';
	import EventListener from '$lib/components/event-listener.svelte';
	import CurrentDestination from '$lib/components/current-destination.svelte';
	import Navigation from './navigation.svelte';
	import TopBar from './top-bar.svelte';
	import Dialog from './dialog.svelte';

	interface Props {
		children: Snippet;
	}

	let { children }: Props = $props();

	let token = $state<string>();
	let currentUserId = $state<string>();
	let currentDestination = $state(Destination.Feed);
	let errors = $state<DisplayableError[]>([]);
	let currentError = $state<DisplayableError>();

	$effect(() => {
		fetchCurrentUser(token);
	});

	$effect(() => {
		if (!token && currentDestination.requiresAuthentication) {
			navigate(Destination.Settings);
		}
	});

	function addError(error: DisplayableError) {
		errors = [...errors, error];
		currentError = errors[0];
	}

	function removeError() {
		errors = errors.slice(1);

		if (errors.length > 0) {
			currentError = errors[0];
		}
	}

	async function fetchCurrentUser(token?: string) {
		if (token) {
			const client = await getUsersClient();
			let currentUser = await client.getCurrentUser();
			currentUserId = currentUser.id;
			Sentry.setUser({ id: currentUserId, username: currentUser.username });
		} else {
			currentUserId = '';
			Sentry.setUser(null);
		}
	}
</script>

<SavedValue name="connection.token" bind:value={token} />
<SavedValue name="currentUser.id" bind:value={currentUserId} />
<EventListener type={DisplayableError} listener={(event) => addError(event.detail)} />
<CurrentDestination bind:destination={currentDestination} />

<svelte:head>
	<title>{t(currentDestination.titleKey)} | {t('app.name')}</title>
</svelte:head>

<div class="layout">
	<Navigation vertical />
	<div class="content">
		<TopBar sideNavigation />
		<TopBar />
		<main class="page">
			{@render children()}
		</main>
	</div>
	<Navigation />
	<Dialog visible={errors.length > 0} title={currentError?.title || ''} onClickOk={removeError}>
		{#snippet content()}
			<p>{currentError?.message || ''}</p>
		{/snippet}
	</Dialog>
</div>

<style lang="scss">
	@use '$lib/style/mixins';
	@use '$lib/style/values';

	:global(:root),
	:global(body) {
		width: 100%;
		height: 100%;
		margin: 0;
		overflow: hidden;
	}

	:global(:root) {
		font-family: sans-serif;
		accent-color: var(--color-accent);
	}

	:global(a) {
		color: var(--color-accent);
	}

	.layout {
		height: 100%;
		position: relative;
		display: flex;
		flex-direction: column;

		@include mixins.regular {
			flex-direction: row;
		}
	}

	.content,
	.page {
		flex: 1;
		display: flex;
		flex-direction: column;
	}

	.content {
		overflow: hidden;
	}

	.page {
		padding-left: env(safe-area-inset-left);
		padding-right: env(safe-area-inset-right);
		overflow: auto;

		@include mixins.regular {
			padding-left: 0;
			padding-bottom: env(safe-area-inset-bottom);
		}
	}
</style>
