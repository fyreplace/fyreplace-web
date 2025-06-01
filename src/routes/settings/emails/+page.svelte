<script lang="ts">
	import { onMount } from 'svelte';
	import { t } from 'i18next';
	import { DisplayableError } from '$lib/events';
	import { call, getEmailsClient } from '$lib/openapi';
	import type { Email } from '$lib/openapi/generated';
	import List from '$lib/components/list.svelte';
	import Button from '$lib/components/inputs/button.svelte';
	import TextField from '$lib/components/inputs/text-field.svelte';

	type EmailAndCode = {
		email: Email;
		code: string;
		verificationStarted: boolean;
	};

	let newEmail = $state('');
	const emailsAndCodes = $state<EmailAndCode[]>([]);

	onMount(async () => {
		await loadEmails();

		if (window.location.hash) {
			const fragmentParts = window.location.hash.replace('#', '').split(':');
			window.location.hash = '';
			const emailAndCode = emailsAndCodes.find((ec) => ec.email.email === fragmentParts[0]);

			if (emailAndCode) {
				emailAndCode.code = fragmentParts[1] ?? '';
				await verifyEmail(emailAndCode);
			}
		}
	});

	function loadEmails() {
		return call(
			async () => {
				const client = await getEmailsClient();
				let page = 0;
				let newEmails: Email[];

				do {
					newEmails = await client.listEmails(page);
					emailsAndCodes.push(
						...newEmails.map((email) => ({ email, code: '', verificationStarted: false }))
					);
					page++;
				} while (newEmails.length > 0);
			},
			async () => new DisplayableError()
		);
	}

	function addEmail() {
		return call(
			async () => {
				const client = await getEmailsClient();
				const email = await client.createEmail({ email: newEmail }, false);
				emailsAndCodes.push({ email, code: '', verificationStarted: false });
				newEmail = '';
			},
			async (error) => {
				switch (error.response.status) {
					case 400:
						return new DisplayableError('emails.errors.addEmail.400');

					case 409:
						return new DisplayableError('emails.errors.addEmail.409');

					default:
						return new DisplayableError();
				}
			}
		);
	}

	function verifyEmail(emailAndCode: EmailAndCode) {
		return call(
			async () => {
				emailAndCode.verificationStarted = true;
				const client = await getEmailsClient();
				await client.verifyEmail({ email: emailAndCode.email.email, code: emailAndCode.code });
				emailAndCode.email.verified = true;
			},
			async (error) => {
				emailAndCode.verificationStarted = false;

				switch (error.response.status) {
					case 400:
						return new DisplayableError('errors.400');

					case 404:
						return new DisplayableError('emails.errors.verifyEmail.404');

					default:
						return new DisplayableError();
				}
			}
		);
	}
</script>

<div class="destination">
	<List>
		{#snippet body()}
			{#each emailsAndCodes as emailAndCode}
				<tr data-testid="email-row">
					{#if emailAndCode.email.main}
						<td class="email">
							<strong>{emailAndCode.email.email}</strong>
						</td>
						<td>{emailAndCode.email.main ? t('emails.main') : ''}</td>
					{:else if !emailAndCode.email.verified}
						<td>
							<TextField
								label={`${emailAndCode.email.email} ⚠️`}
								placeholder={t('emails.verification.placeholder')}
								name={`email-${emailAndCode.email.id}`}
								disabled={emailAndCode.verificationStarted}
								title={t('emails.verification.title')}
								bind:value={emailAndCode.code}
							/>
						</td>
						<td class="text-field-cell">
							<Button
								type="button"
								disabled={emailAndCode.code.length === 0 || emailAndCode.verificationStarted}
								onClick={() => verifyEmail(emailAndCode)}
							>
								{t('emails.verify')}
							</Button>
						</td>
					{:else}
						<td colspan="2" class="email">{emailAndCode.email.email}</td>
					{/if}
				</tr>
			{/each}

			<tr>
				<td>
					<TextField
						label={t('emails.new.label')}
						placeholder={t('emails.new.placeholder')}
						name="new-email"
						bind:value={newEmail}
					/>
				</td>
				<td class="text-field-cell">
					<Button type="button" disabled={newEmail.length === 0} onClick={addEmail}>
						{t('emails.add')}
					</Button>
				</td>
			</tr>
		{/snippet}
	</List>
</div>

<style lang="scss">
	@use '$lib/style/mixins';

	.destination {
		width: 100%;
		box-sizing: border-box;
		display: flex;
		flex-direction: column;
		align-items: center;
		justify-content: center;
		gap: 2em;

		@include mixins.expanded-width {
			padding: 2em;
		}
	}

	.email {
		padding-left: calc(1.5em + 2px) !important;
	}

	.text-field-cell {
		vertical-align: bottom;
	}
</style>
