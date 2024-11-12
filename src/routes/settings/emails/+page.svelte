<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from 'i18next';
	import { DisplayableError } from '$lib/events';
	import { call, getEmailsClient } from '$lib/openapi';
	import type { Email } from '$lib/openapi/generated';
	import List from '$lib/components/list.svelte';

	let emails = $state<Email[]>([]);

	onMount(loadEmails);

	function loadEmails() {
		return call(
			async () => {
				const client = await getEmailsClient();
				let page = 0;
				let newEmails: Email[];

				do {
					newEmails = await client.listEmails(page);
					emails = emails.concat(newEmails);
					page++;
				} while (newEmails.length > 0);
			},
			async () => new DisplayableError()
		);
	}
</script>

<div class="destination">
	<List>
		{#snippet body()}
			{#each emails as email}
				<tr>
					<td data-testid="email">{email.email}</td>
					<td>{email.main ? t('emails.main') : ''}</td>
				</tr>
			{/each}
		{/snippet}
	</List>
</div>

<style lang="scss">
	@use '$lib/style/mixins';

	.destination {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		align-items: center;
		justify-content: center;

		@include mixins.expanded-width {
			padding: 2em;
		}
	}
</style>
