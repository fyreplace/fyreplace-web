import { eventBus, StorageChange } from './events';

export function getStoredItem<T>(key: string) {
	return JSON.parse(localStorage.getItem(key) ?? 'null') as T | null;
}

export function setStoredItem<T>(key: string, value: T) {
	localStorage.setItem(key, JSON.stringify(value));
	eventBus.publish(new StorageChange(key));
}
