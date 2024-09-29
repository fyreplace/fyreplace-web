import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';
import { beforeEach, expect, test } from 'vitest';
import { eventBus, useNewStoringEventBus, DisplayableError, StoringEventBus } from '$lib/events';
import { setStoredItem } from '$lib/storage';
import FakeTokensEndpointApi from '$lib/openapi/fakes/tokens-endpoint';
import FakeUsersEndpointApi from '$lib/openapi/fakes/users-endpoint';
import { sleep } from '$lib/utils';
import Page from './+page.svelte';

beforeEach(() => {
	useNewStoringEventBus();
	window.localStorage.clear();
	setStoredItem('connection.token', FakeTokensEndpointApi.token);
});

test('Screen retrieves current user', async () => {
	render(Page);
	const username = screen.getByTitle('Username');

	await sleep(100);
	expect(username.textContent).to.equal('random_user');
});

test('Too large avatar produces a failure', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const imagePicker = screen.getByTitle('Image picker');

	await user.upload(imagePicker, FakeUsersEndpointApi.largeImageFile);
	const avatar = screen.queryByTitle<HTMLImageElement>('Avatar');
	expect(avatar).not.to.exist;
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(1);
});

test('Not image avatar produces a failure', async () => {
	const user = userEvent.setup();
	const bus = eventBus as StoringEventBus;
	render(Page);
	const imagePicker = screen.getByTitle('Image picker');

	await user.upload(imagePicker, FakeUsersEndpointApi.notImageFile);
	const avatar = screen.queryByTitle<HTMLImageElement>('Avatar');
	expect(avatar).not.to.exist;
	expect(bus.events.filter((e) => e instanceof DisplayableError)).to.have.length(1);
});

test('Valid avatar produces no failures', async () => {
	const user = userEvent.setup();
	render(Page);
	const imagePicker = screen.getByTitle('Image picker');

	await user.upload(imagePicker, FakeUsersEndpointApi.normalImageFile);
	const avatar = screen.getByTitle<HTMLImageElement>('Avatar');
	expect(avatar.src).to.contain(FakeUsersEndpointApi.normalImageFile.name);
});
