import type { Destination } from '$lib/destinations';
import { navigateTo } from '$lib/stores/destinations';

function updateAnchor(a: HTMLAnchorElement, destination: Destination) {
	a.href = destination.route;
	a.onclick = (event) => {
		event.preventDefault();
		navigateTo(destination);
	};
}

export function fakeLink(a: HTMLAnchorElement, destination: Destination) {
	updateAnchor(a, destination);
	return {
		update: updateAnchor.bind(null, a)
	};
}
