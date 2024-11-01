import { eventBus, StorageChange } from './events';

export function getStoredItem<T>(key: string) {
	const value = localStorage.getItem(key);
	return value ? (JSON.parse(value) as T) : undefined;
}

export function setStoredItem<T>(key: string, value: T) {
	const stringValue = JSON.stringify(value);

	if (stringValue !== localStorage.getItem(key)) {
		localStorage.setItem(key, JSON.stringify(value));
		eventBus.publish(new StorageChange(key));
	}
}
