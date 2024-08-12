import { t } from 'i18next';

export type Class<T> = new (...args: any[]) => T;

export type Listener<T, E = CustomEvent<T>> = (event: E) => void;

export type EventName = keyof WindowEventMap;

export interface EventBus {
	addListener<T>(cls: Class<T>, listener: Listener<T>): void;

	removeListener<T>(cls: Class<T>, listener: Listener<T>): void;

	publish<T extends Object>(detail: T): void;
}

export class WindowEventBus implements EventBus {
	addListener<T>(cls: Class<T>, listener: Listener<T>) {
		window.addEventListener(cls.name, listener);
	}

	removeListener<T>(cls: Class<T>, listener: Listener<T>) {
		window.removeEventListener(cls.name, listener);
	}

	publish<T extends Object>(detail: T) {
		window.dispatchEvent(new CustomEvent(detail.constructor.name, { detail }));
	}
}

export class StoringEventBus extends WindowEventBus {
	events: any[] = [];

	publish<T extends Object>(detail: T): void {
		super.publish(detail);
		this.events.push(detail);
	}
}

export let eventBus: EventBus = new WindowEventBus();

export function useNewStoringEventBus() {
	eventBus = new StoringEventBus();
}

export class DisplayableError extends Error {
	readonly title: string;

	constructor(key: string) {
		super(t(key + '.message'));
		this.title = t(key + '.title');
	}
}

declare global {
	interface WindowEventMap {
		[key: string]: CustomEvent<any>;
	}
}
