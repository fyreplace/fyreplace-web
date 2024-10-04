<script lang="ts">
	import { onMount } from 'svelte';
	import { writable } from 'svelte/store';
	import { t } from 'i18next';
	import { currentDestination, navigate, Destination } from '$lib/destinations';
	import { DisplayableError } from '$lib/events';
	import SavedValue from '$lib/components/saved-value.svelte';
	import EventListener from '$lib/components/event-listener.svelte';
	import Navigation from './navigation.svelte';
	import TopBar from './top-bar.svelte';
	import Dialog from './dialog.svelte';

	const token = writable<string | null>(null);
	let errors: DisplayableError[] = [];
	let currentError: DisplayableError | undefined;

	onMount(() =>
		token.subscribe(async ($token) => {
			if (!$token && $currentDestination.requiresAuthentication) {
				await navigate(Destination.Settings);
			}
		})
	);

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
</script>

<SavedValue name="connection.token" store={token} />
<EventListener type={DisplayableError} listener={(event) => addError(event.detail)} />

<svelte:head>
	<title>{t($currentDestination.titleKey)} | {t('app.name')}</title>
</svelte:head>

<div class="layout">
	<Navigation vertical />
	<div class="content">
		<TopBar sideNavigation />
		<TopBar />
		<main class="page">
			<slot />
		</main>
	</div>
	<Navigation />
	<Dialog
		visible={errors.length > 0}
		title={currentError?.title || ''}
		message={currentError?.message || ''}
		on:ok={removeError}
	/>
</div>

<style lang="scss">
	@import '$lib/style/mixins';

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

		@include regular {
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

		@include regular {
			padding-left: 0;
			padding-bottom: env(safe-area-inset-bottom);
		}
	}
</style>
