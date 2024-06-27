import { describe, it, expect } from 'vitest';
import { allDestinations, essentialDestinations } from '$lib/destinations';

describe('Destinations', () => {
	it('are unique', () => {
		for (const first of allDestinations) {
			for (const second of allDestinations) {
				if (first !== second) {
					expect(first.route).not.toBe(second.route);
					expect(first.title).not.toBe(second.title);
					expect(first.icon).not.toBe(second.icon);
				}
			}
		}
	});

	it('have fewer essentials than total', () => {
		expect(essentialDestinations.length).toBeLessThan(allDestinations.length);
	});

	it('do not loop', () => {
		for (const destination of allDestinations) {
			expect(destination.replacement).not.toBe(destination);
			expect(destination.replacement?.replacement).not.toBe(destination);
		}
	});
});
