import FeedDestination from '$lib/components/destinations/feed.svelte';
import NotificationsDestination from '$lib/components/destinations/notifications.svelte';
import ArchiveDestination from '$lib/components/destinations/archive.svelte';
import DraftsDestination from '$lib/components/destinations/drafts.svelte';
import PublishedDestination from '$lib/components/destinations/published.svelte';
import SettingsDestination from '$lib/components/destinations/settings.svelte';
import LoginDestination from '$lib/components/destinations/login.svelte';
import RegisterDestination from '$lib/components/destinations/register.svelte';
import BellIcon from '$lib/components/icons/bell.svelte';
import DocumentIcon from '$lib/components/icons/document.svelte';
import HistoryIcon from '$lib/components/icons/history.svelte';
import HomeIcon from '$lib/components/icons/home.svelte';
import InventoryIcon from '$lib/components/icons/inventory.svelte';
import PersonIcon from '$lib/components/icons/person.svelte';

export interface Destination {
	content: any;
	route: string;
	titleKey: string;
	icon?: any;
	parent?: Destination;
	isVisible: () => Boolean;
}

export namespace Destination {
	export const Feed: Destination = {
		content: FeedDestination,
		route: '/feed',
		titleKey: 'destinations/feed',
		icon: HomeIcon,
		isVisible: () => true
	};

	export const Notifications: Destination = {
		content: NotificationsDestination,
		route: '/notifications',
		titleKey: 'destinations/notifications',
		icon: BellIcon,
		isVisible: () => true
	};

	export const Archive: Destination = {
		content: ArchiveDestination,
		route: '/archive',
		titleKey: 'destinations/archive',
		icon: HistoryIcon,
		parent: Notifications,
		isVisible: () => true
	};

	export const Drafts: Destination = {
		content: DraftsDestination,
		route: '/drafts',
		titleKey: 'destinations/drafts',
		icon: DocumentIcon,
		isVisible: () => true
	};

	export const Published: Destination = {
		content: PublishedDestination,
		route: '/published',
		titleKey: 'destinations/published',
		icon: InventoryIcon,
		parent: Drafts,
		isVisible: () => true
	};

	export const Settings: Destination = {
		content: SettingsDestination,
		route: '/settings',
		titleKey: 'destinations/settings',
		icon: PersonIcon,
		isVisible: () => false
	};

	export const Login: Destination = {
		content: LoginDestination,
		route: '/login',
		titleKey: 'destinations/login',
		parent: Settings,
		isVisible: () => true
	};

	export const Register: Destination = {
		content: RegisterDestination,
		route: '/register',
		titleKey: 'destinations/register',
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
