import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test } from 'vitest';
import { eventBus, useNewStoringEventBus, DisplayableError, StoringEventBus } from '$lib/events';
import FakeTokensEndpointApi from '$lib/openapi/fakes/tokens-endpoint';
import FakeUsersEndpointApi from '$lib/openapi/fakes/users-endpoint';
import Page from './+page.svelte';

beforeEach(() => {
	useNewStoringEventBus();
	window.localStorage.clear();
});

test('Identifier must have correct length', { timeout: 60000 }, async () => {
	const user = userEvent.setup();
	render(Page);
	const identifier = screen.getByRole('textbox', { name: 'Identifier' });
	const submit = screen.getByRole('button', { name: 'Login' });

	await user.type(identifier, 'aa');
	expect(submit).to.have.property('disabled', true);
	await user.clear(identifier);

	await user.type(identifier, 'aaa');
	expect(submit).to.have.property('disabled', false);
	await user.clear(identifier);

	await user.type(identifier, 'a'.repeat(254));
	expect(submit).to.have.property('disabled', false);
	await user.clear(identifier);

	await user.type(identifier, 'a'.repeat(255));
	expect(submit).to.have.property('disabled', true);
});

test('Invalid identifier produces an error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const identifier = screen.getByRole('textbox', { name: 'Identifier' });
	const submit = screen.getByRole('button', { name: 'Login' });

	await user.type(identifier, FakeUsersEndpointApi.badUsername);
	await user.click(submit);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(1);
	const randomCode = screen.queryByRole('textbox', { name: 'One-time code' });
	expect(randomCode).not.to.exist;
});

test('Valid identifier produces no error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const identifier = screen.getByRole('textbox', { name: 'Identifier' });
	const submit = screen.getByRole('button', { name: 'Login' });

	await user.type(identifier, FakeUsersEndpointApi.goodUsername);
	await user.click(submit);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(0);
	const randomCode = screen.queryByRole('textbox', { name: 'One-time code' });
	expect(randomCode).to.exist;
});

test('Password identifier produces an error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const identifier = screen.getByRole('textbox', { name: 'Identifier' });
	const submit = screen.getByRole('button', { name: 'Login' });

	await user.type(identifier, FakeUsersEndpointApi.passwordUsername);
	await user.click(submit);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(1);
	const randomCode = screen.queryByRole('textbox', { name: 'One-time code' });
	expect(randomCode).to.exist;
});

test('Random code must have correct length', async () => {
	const user = userEvent.setup();
	render(Page);
	const identifier = screen.getByRole('textbox', { name: 'Identifier' });
	const submit = screen.getByRole('button', { name: 'Login' });
	await user.type(identifier, FakeUsersEndpointApi.goodUsername);
	await user.click(submit);
	const randomCode = screen.getByRole('textbox', { name: 'One-time code' });

	await user.type(randomCode, 'abcd123');
	expect(submit).to.have.property('disabled', true);
	await user.clear(randomCode);

	await user.type(randomCode, 'abcd1234');
	expect(submit).to.have.property('disabled', false);
	await user.clear(randomCode);
});

test('Invalid random code produces an error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const identifier = screen.getByRole('textbox', { name: 'Identifier' });
	const submit = screen.getByRole('button', { name: 'Login' });
	await user.type(identifier, FakeUsersEndpointApi.goodUsername);
	await user.click(submit);
	const randomCode = screen.getByRole('textbox', { name: 'One-time code' });

	await user.type(randomCode, FakeTokensEndpointApi.badSecret);
	await user.click(submit);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(1);
});

test('Valid random code produces no error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const identifier = screen.getByRole('textbox', { name: 'Identifier' });
	const submit = screen.getByRole('button', { name: 'Login' });
	await user.type(identifier, FakeUsersEndpointApi.goodUsername);
	await user.click(submit);
	const randomCode = screen.getByRole('textbox', { name: 'One-time code' });

	await user.type(randomCode, FakeTokensEndpointApi.goodSecret);
	await user.click(submit);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(0);
});
