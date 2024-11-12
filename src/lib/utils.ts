export function sleep(ms: number): Promise<void> {
	return new Promise((resolve) => setTimeout(resolve, ms));
}

export function makeId(): string {
	return Math.random().toString(36).substring(2);
}
