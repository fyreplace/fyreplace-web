import BellIcon from '$lib/components/icons/bell.svelte';
import DocumentIcon from '$lib/components/icons/document.svelte';
import HistoryIcon from '$lib/components/icons/history.svelte';
import HomeIcon from '$lib/components/icons/home.svelte';
import InventoryIcon from '$lib/components/icons/inventory.svelte';
import PersonIcon from '$lib/components/icons/person.svelte';

export interface Destination {
	route: string;
	titleKey: string;
	icon?: any;
	parent?: Destination;
	isVisible: () => Boolean;
}

export namespace Destination {
	export const Feed: Destination = {
		route: '/feed',
		titleKey: 'destinations.feed',
		icon: HomeIcon,
		isVisible: () => true
	};

	export const Notifications: Destination = {
		route: '/notifications',
		titleKey: 'destinations.notifications',
		icon: BellIcon,
		isVisible: () => true
	};

	export const Archive: Destination = {
		route: '/archive',
		titleKey: 'destinations.archive',
		icon: HistoryIcon,
		parent: Notifications,
		isVisible: () => true
	};

	export const Drafts: Destination = {
		route: '/drafts',
		titleKey: 'destinations.drafts',
		icon: DocumentIcon,
		isVisible: () => true
	};

	export const Published: Destination = {
		route: '/published',
		titleKey: 'destinations.published',
		icon: InventoryIcon,
		parent: Drafts,
		isVisible: () => true
	};

	export const Settings: Destination = {
		route: '/settings',
		titleKey: 'destinations.settings',
		icon: PersonIcon,
		isVisible: () => false
	};

	export const Login: Destination = {
		route: '/login',
		titleKey: 'destinations.login',
		parent: Settings,
		isVisible: () => true
	};

	export const Register: Destination = {
		route: '/register',
		titleKey: 'destinations.register',
		parent: Settings,
		isVisible: () => true
	};
}

export const allDestinations = Object.values(Destination);

export const topLevelDestinations = Object.values(Destination).filter((d) => d.icon);

export const essentialDestinations = allDestinations.filter((destination) => !destination.parent);

export function findDestinationByRoute(route: string | null) {
	return allDestinations.find((d) => d.route === route) ?? Destination.Feed;
}
