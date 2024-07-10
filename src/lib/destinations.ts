import FeedDestination from '$lib/components/destinations/feed.svelte';
import NotificationsDestination from '$lib/components/destinations/notifications.svelte';
import ArchiveDestination from '$lib/components/destinations/archive.svelte';
import DraftsDestination from '$lib/components/destinations/drafts.svelte';
import PublishedDestination from '$lib/components/destinations/published.svelte';
import SettingsDestination from '$lib/components/destinations/settings.svelte';
import BellIcon from '$lib/components/icons/bell.svelte';
import DocumentIcon from '$lib/components/icons/document.svelte';
import HistoryIcon from '$lib/components/icons/history.svelte';
import HomeIcon from '$lib/components/icons/home.svelte';
import InventoryIcon from '$lib/components/icons/inventory.svelte';
import PersonIcon from '$lib/components/icons/person.svelte';

export interface Destination {
	content: any;
	route: string;
	title: string;
	icon: any;
	parent?: Destination;
}

export namespace Destination {
	export const Feed: Destination = {
		content: FeedDestination,
		route: '/feed',
		title: 'Feed',
		icon: HomeIcon
	};

	export const Notifications: Destination = {
		content: NotificationsDestination,
		route: '/notifications',
		title: 'Notifications',
		icon: BellIcon
	};

	export const Archive: Destination = {
		content: ArchiveDestination,
		route: '/archive',
		title: 'Archive',
		icon: HistoryIcon,
		parent: Notifications
	};

	export const Drafts: Destination = {
		content: DraftsDestination,
		route: '/drafts',
		title: 'Drafts',
		icon: DocumentIcon
	};

	export const Published: Destination = {
		content: PublishedDestination,
		route: '/published',
		title: 'Published',
		icon: InventoryIcon,
		parent: Drafts
	};

	export const Settings: Destination = {
		content: SettingsDestination,
		route: '/settings',
		title: 'Settings',
		icon: PersonIcon
	};
}

export const allDestinations = Object.values(Destination);

export const essentialDestinations = allDestinations.filter((destination) => !destination.parent);

export function findDestinationByRoute(route: string | null) {
	return allDestinations.find((d) => d.route === route) ?? Destination.Feed;
}
