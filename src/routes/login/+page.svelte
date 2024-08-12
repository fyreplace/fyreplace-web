<script lang="ts">
	import { t } from 'i18next';
	import { DisplayableError, eventBus } from '$lib/events';
	import { call, getTokensClient } from '$lib/openapi';
	import Logo from '$lib/components/branding/logo.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import TextField from '$lib/components/inputs/text-field.svelte';

	let identifier = '';
	let canSubmit = false;
	let loading = false;

	$: canSubmit = identifier.length >= 3 && identifier.length <= 254;

	async function submit() {
		call(
			async () => {
				try {
					loading = true;
					const client = await getTokensClient();
					await client.createNewToken({ identifier });
				} finally {
					loading = false;
				}
			},
			(error) => {
				switch (error.response.status) {
					case 404:
						return new DisplayableError('login.errors.404');
				}
			}
		);
	}
</script>

<form class="destination">
	<Logo />
	<TextField
		label={t('login.identifier')}
		name="username"
		placeholder={t('login.identifier-placeholder')}
		autofocus
		bind:value={identifier}
	/>
	<Button type="submit" disabled={!canSubmit} {loading} on:click={submit}>
		{t('destinations.login')}
	</Button>
</form>

<style lang="scss">
	@import '$lib/style/mixins';

	.destination {
		width: 100%;
		padding: 2em 0;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2em;

		@include expanded-height {
			height: 100%;
		}
	}
</style>
