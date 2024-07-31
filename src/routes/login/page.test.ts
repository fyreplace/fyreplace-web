import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { expect, test } from 'vitest';
import Page from './+page.svelte';

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
