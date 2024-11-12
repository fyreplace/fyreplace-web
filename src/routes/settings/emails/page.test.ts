import { render, screen } from '@testing-library/svelte';
import { beforeEach, expect, test } from 'vitest';
import { eventBus, DisplayableError, StoringEventBus } from '$lib/events';
import { setUpTesting, sleep } from '$lib/utils';
import Page from './+page.svelte';

beforeEach(() => setUpTesting({ withToken: true }));

test('Loading emails produces no failures', async () => {
	const bus = eventBus as StoringEventBus;
	render(Page);

	await sleep(100);
	const emails = screen.getAllByTestId('email');
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.be.empty;
	expect(emails).toHaveLength(3);
});
