declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}

	interface SavedValueKeys {
		'connection.token': string;
		'account.identifier': string;
		'account.username': string;
		'account.email': string;
		'account.isWaitingForRandomCode': boolean;
	}
}

export {};
