import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test } from 'vitest';
import { eventBus, useNewStoringEventBus, DisplayableError, StoringEventBus } from '$lib/events';
import FakeTokensEndpointApi from '$lib/openapi/fakes/tokens-endpoint';
import FakeUsersEndpointApi from '$lib/openapi/fakes/users-endpoint';
import { sleep } from '$lib/utils';
import Page from './+page.svelte';

beforeEach(() => {
	useNewStoringEventBus();
	window.localStorage.clear();
});

test('Username must have correct length', { timeout: 60000 }, async () => {
	const user = userEvent.setup();
	render(Page);
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const acceptTerms = screen.getByRole('checkbox');
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(email, FakeUsersEndpointApi.goodEmail);
	await user.click(acceptTerms);

	await user.type(username, 'aa');
	expect(submit).to.have.property('disabled', true);
	await user.clear(username);

	await user.type(username, 'aaa');
	expect(submit).to.have.property('disabled', false);
	await user.clear(username);

	await user.type(username, 'a'.repeat(50));
	expect(submit).to.have.property('disabled', false);
	await user.clear(username);

	await user.type(username, 'a'.repeat(51));
	expect(submit).to.have.property('disabled', true);
});

test('Email must have correct length', { timeout: 60000 }, async () => {
	const user = userEvent.setup();
	render(Page);
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const acceptTerms = screen.getByRole('checkbox');
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(username, FakeUsersEndpointApi.goodUsername);
	await user.click(acceptTerms);

	await user.type(email, '@@');
	expect(submit).to.have.property('disabled', true);
	await user.clear(email);

	await user.type(email, '@@@');
	expect(submit).to.have.property('disabled', false);
	await user.clear(email);

	await user.type(email, '@'.repeat(254));
	expect(submit).to.have.property('disabled', false);
	await user.clear(email);

	await user.type(email, '@'.repeat(255));
	expect(submit).to.have.property('disabled', true);
});

test('Email must have @', async () => {
	const user = userEvent.setup();
	render(Page);
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const acceptTerms = screen.getByRole('checkbox');
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(username, FakeUsersEndpointApi.goodUsername);
	await user.click(acceptTerms);

	await user.type(email, 'email');
	expect(submit).to.have.property('disabled', true);
	await user.clear(email);

	await user.type(email, 'email@example');
	expect(submit).to.have.property('disabled', false);
});

test('Invalid username produces an error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const acceptTerms = screen.getByRole('checkbox');
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(email, FakeUsersEndpointApi.goodEmail);
	await user.click(acceptTerms);
	const invalidValues = [
		FakeUsersEndpointApi.badUsername,
		FakeUsersEndpointApi.reservedUsername,
		FakeUsersEndpointApi.usedUsername
	];

	for (let i = 0; i < invalidValues.length; i++) {
		await user.clear(username);
		await user.type(username, invalidValues[i]!);
		await user.click(submit);
		await sleep(100);
		expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(i + 1);
		const randomCode = screen.queryByRole('textbox', { name: 'One-time code' });
		expect(randomCode).not.to.exist;
	}
});

test('Invalid email produces an error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const acceptTerms = screen.getByRole('checkbox');
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(username, FakeUsersEndpointApi.goodUsername);
	await user.click(acceptTerms);
	const invalidValues = [FakeUsersEndpointApi.badEmail, FakeUsersEndpointApi.usedEmail];

	for (let i = 0; i < invalidValues.length; i++) {
		await user.clear(email);
		await user.type(email, invalidValues[i]!);
		await user.click(submit);
		await sleep(100);
		expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(i + 1);
		const randomCode = screen.queryByRole('textbox', { name: 'One-time code' });
		expect(randomCode).not.to.exist;
	}
});

test('Valid username and email produce no error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const acceptTerms = screen.getByRole('checkbox');
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(username, FakeUsersEndpointApi.goodUsername);
	await user.click(acceptTerms);

	await user.type(email, FakeUsersEndpointApi.goodEmail);
	await user.click(submit);
	await sleep(100);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(0);
	const randomCode = screen.queryByRole('textbox', { name: 'One-time code' });
	expect(randomCode).to.exist;
});

test('Random code must have correct length', async () => {
	const user = userEvent.setup();
	render(Page);
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const acceptTerms = screen.getByRole('checkbox');
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(username, FakeUsersEndpointApi.goodUsername);
	await user.type(email, FakeUsersEndpointApi.goodEmail);
	await user.click(acceptTerms);
	await user.click(submit);
	await sleep(100);
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
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const acceptTerms = screen.getByRole('checkbox');
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(username, FakeUsersEndpointApi.goodUsername);
	await user.type(email, FakeUsersEndpointApi.goodEmail);
	await user.click(acceptTerms);
	await user.click(submit);
	await sleep(100);
	const randomCode = screen.getByRole('textbox', { name: 'One-time code' });

	await user.type(randomCode, FakeTokensEndpointApi.badSecret);
	await user.click(submit);
	await sleep(100);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(1);
});

test('Valid random code produces no error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const acceptTerms = screen.getByRole('checkbox');
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(username, FakeUsersEndpointApi.goodUsername);
	await user.type(email, FakeUsersEndpointApi.goodEmail);
	await user.click(acceptTerms);
	await user.click(submit);
	await sleep(100);
	const randomCode = screen.getByRole('textbox', { name: 'One-time code' });

	await user.type(randomCode, FakeTokensEndpointApi.goodSecret);
	await user.click(submit);
	await sleep(100);
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(0);
});
