import { expect, test } from 'vitest';
import { allDestinations, essentialDestinations } from './destinations';

test('Destinations are unique', () => {
	for (const first of allDestinations) {
		for (const second of allDestinations) {
			if (first !== second) {
				expect(first.route).not.toBe(second.route);
				expect(first.titleKey).not.toBe(second.titleKey);

				if (first.icon) {
					expect(first.icon).not.toBe(second.icon);
				}
			}
		}
	}
});

test('Destinations have fewer essentials than total', () => {
	expect(essentialDestinations.length).toBeLessThan(allDestinations.length);
});

test('Destinations do not loop', () => {
	for (const destination of allDestinations) {
		expect(destination.parent).not.toBe(destination);
		expect(destination.parent?.parent).not.toBe(destination);
	}
});
