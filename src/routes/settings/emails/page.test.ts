import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test } from 'vitest';
import { eventBus, DisplayableError, StoringEventBus } from '$lib/events';
import { setUpTesting, sleep } from '$lib/utils';
import Page from './+page.svelte';
import FakeUsersEndpointApi from '$lib/openapi/fakes/users-endpoint';
import FakeTokensEndpointApi from '$lib/openapi/fakes/tokens-endpoint';

beforeEach(() => setUpTesting({ withToken: true }));

test('Loading emails produces no failures', async () => {
	const bus = eventBus as StoringEventBus;
	render(Page);

	await sleep(100);
	const emails = screen.getAllByTestId('email-row');
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.be.empty;
	expect(emails).toHaveLength(3);
});

test('Invalid email produces a failure', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);

	const newEmail = screen.getByRole('textbox', { name: 'New email' });
	const addButton = screen.getByRole('button', { name: 'Add' });
	await user.type(newEmail, FakeUsersEndpointApi.badEmail);
	await user.click(addButton);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(1);
});

test('Valid email produces no failures', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);

	const newEmail = screen.getByRole('textbox', { name: 'New email' });
	const addButton = screen.getByRole('button', { name: 'Add' });
	await user.type(newEmail, FakeUsersEndpointApi.goodEmail);
	await user.click(addButton);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.be.empty;
});

test('Invalid random code produces failure', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);

	await sleep(100);
	const randomCode = screen.getByPlaceholderText('Verification code');
	const verifyButton = screen.getByRole('button', { name: 'Verify' });
	expect(verifyButton).to.have.property('disabled', true);
	await user.type(randomCode, FakeTokensEndpointApi.badSecret);
	expect(verifyButton).to.have.property('disabled', false);
	await user.click(verifyButton);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(1);
});

test('Valid random code produces no failures', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);

	await sleep(100);
	const randomCode = screen.getByPlaceholderText('Verification code');
	const verifyButton = screen.getByRole('button', { name: 'Verify' });
	expect(verifyButton).to.have.property('disabled', true);
	await user.type(randomCode, FakeTokensEndpointApi.goodSecret);
	expect(verifyButton).to.have.property('disabled', false);
	await user.click(verifyButton);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.be.empty;
});
