import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test } from 'vitest';
import { eventBus, useNewStoringEventBus, DisplayableError, StoringEventBus } from '$lib/events';
import FakeTokensEndpointApi from '$lib/openapi/fakes/tokens-endpoint';
import { sleep } from '$lib/utils';
import Page from './+page.svelte';

beforeEach(useNewStoringEventBus);

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

	await user.type(identifier, FakeTokensEndpointApi.badIdentifier);
	submit.click();
	await sleep(100);
	expect(bus.events).to.have.length(1);
	expect(bus.events[0]).to.be.instanceOf(DisplayableError);
});

test('Valid identifier produces no error', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const identifier = screen.getByRole('textbox', { name: 'Identifier' });
	const submit = screen.getByRole('button', { name: 'Login' });

	await user.type(identifier, FakeTokensEndpointApi.goodIdentifier);
	submit.click();
	await sleep(100);
	console.debug(bus.events);
	expect(bus.events).to.have.length(0);
});
