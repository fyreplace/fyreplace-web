import Bell from '$lib/components/icons/bell.svelte';
import Document from '$lib/components/icons/document.svelte';
import History from '$lib/components/icons/history.svelte';
import Home from '$lib/components/icons/home.svelte';
import Inventory from '$lib/components/icons/inventory.svelte';
import Person from '$lib/components/icons/person.svelte';

export interface Destination {
	route: string;
	title: string;
	icon: any;
	replacement?: Destination;
}

export namespace Destination {
	export const Feed: Destination = {
		route: '/feed',
		title: 'Feed',
		icon: Home
	};

	export const Notifications: Destination = {
		route: '/notifications',
		title: 'Notifications',
		icon: Bell
	};

	export const Archive: Destination = {
		route: '/archive',
		title: 'Archive',
		icon: History,
		replacement: Destination.Notifications
	};

	export const Drafts: Destination = {
		route: '/drafts',
		title: 'Drafts',
		icon: Document
	};

	export const Published: Destination = {
		route: '/published',
		title: 'Published',
		icon: Inventory,
		replacement: Destination.Drafts
	};

	export const Settings: Destination = {
		route: '/settings',
		title: 'Settings',
		icon: Person
	};
}

export const allDestinations: Destination[] = Object.values(Destination);

export const essentialDestinations: Destination[] = allDestinations.filter(
	(destination) => !destination.replacement
);
