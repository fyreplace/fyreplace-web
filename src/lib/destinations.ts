import { derived } from 'svelte/store';
import { page } from '$app/stores';
import { goto } from '$app/navigation';
import BellIcon from '$lib/components/icons/bell.svelte';
import DocumentIcon from '$lib/components/icons/document.svelte';
import HistoryIcon from '$lib/components/icons/history.svelte';
import HomeIcon from '$lib/components/icons/home.svelte';
import InventoryIcon from '$lib/components/icons/inventory.svelte';
import PersonIcon from '$lib/components/icons/person.svelte';

let fakeNavigation = false;

export function useFakeNavigation() {
	fakeNavigation = true;
}

export interface Destination {
	route: string;
	titleKey: string;
	icon?: any;
	parent?: Destination;
	requiresAuthentication: boolean;
}

export namespace Destination {
	export const Feed: Destination = {
		route: '/feed',
		titleKey: 'destinations.feed',
		icon: HomeIcon,
		requiresAuthentication: false
	};

	export const Notifications: Destination = {
		route: '/notifications',
		titleKey: 'destinations.notifications',
		icon: BellIcon,
		requiresAuthentication: true
	};

	export const Archive: Destination = {
		route: '/archive',
		titleKey: 'destinations.archive',
		icon: HistoryIcon,
		parent: Notifications,
		requiresAuthentication: true
	};

	export const Drafts: Destination = {
		route: '/drafts',
		titleKey: 'destinations.drafts',
		icon: DocumentIcon,
		requiresAuthentication: true
	};

	export const Published: Destination = {
		route: '/published',
		titleKey: 'destinations.published',
		icon: InventoryIcon,
		parent: Drafts,
		requiresAuthentication: true
	};

	export const Settings: Destination = {
		route: '/settings',
		titleKey: 'destinations.settings',
		icon: PersonIcon,
		requiresAuthentication: false
	};

	export const Login: Destination = {
		route: '/login',
		titleKey: 'destinations.login',
		parent: Settings,
		requiresAuthentication: false
	};

	export const Register: Destination = {
		route: '/register',
		titleKey: 'destinations.register',
		parent: Settings,
		requiresAuthentication: false
	};
}

export const allDestinations = Object.values(Destination);

export const topLevelDestinations = Object.values(Destination).filter((d) => d.icon);

export const essentialDestinations = allDestinations.filter((destination) => !destination.parent);

export const currentDestination = derived(page, ($page) =>
	findDestinationByRoute($page.url.pathname)
);

export function findDestinationByRoute(route: string | null) {
	return allDestinations.find((d) => d.route === route) ?? Destination.Feed;
}

export async function navigate(destination: Destination) {
	if (!fakeNavigation) {
		await goto(destination.route, { replaceState: true });
	}
}
