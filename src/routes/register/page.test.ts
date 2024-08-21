import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test } from 'vitest';
import Page from './+page.svelte';

beforeEach(() => window.localStorage.clear());

test('Username must have correct length', { timeout: 60000 }, async () => {
	const user = userEvent.setup();
	render(Page);
	const username = screen.getByRole('textbox', { name: 'Username' });
	const email = screen.getByRole('textbox', { name: 'Email' });
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(email, 'email@example');

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
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(username, 'Example');

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
	const submit = screen.getByRole('button', { name: 'Sign up' });
	await user.type(username, 'Example');

	await user.type(email, 'email');
	expect(submit).to.have.property('disabled', true);
	await user.clear(email);

	await user.type(email, 'email@example');
	expect(submit).to.have.property('disabled', false);
});
