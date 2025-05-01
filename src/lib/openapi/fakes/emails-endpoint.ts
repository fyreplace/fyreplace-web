import { makeId } from '$lib/utils';
import type {
	ApiResponse,
	CreateEmailRequest,
	DeleteEmailRequest,
	Email,
	EmailCreation,
	EmailsEndpointApiInterface,
	EmailVerification,
	InitOverrideFunction,
	ListEmailsRequest,
	SetMainEmailRequest,
	VerifyEmailRequest
} from '../generated';

export default class FakeEmailsEndpointApi implements EmailsEndpointApiInterface {
	async countEmails(initOverrides?: RequestInit | InitOverrideFunction): Promise<number> {
		const emails = await this.listEmails();
		return emails.length;
	}

	createEmail(
		emailCreation: EmailCreation,
		customDeepLinks?: boolean,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<Email> {
		throw new Error('Method not implemented.');
	}

	deleteEmail(id: string, initOverrides?: RequestInit | InitOverrideFunction): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async listEmails(
		page?: number,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<Array<Email>> {
		switch (page) {
			case undefined:
			case 0:
				return [this.makeEmail(true), this.makeEmail(), this.makeEmail()];

			default:
				return [];
		}
	}

	setMainEmail(id: string, initOverrides?: RequestInit | InitOverrideFunction): Promise<void> {
		throw new Error('Method not implemented.');
	}

	verifyEmail(
		emailVerification: EmailVerification,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<void> {
		throw new Error('Method not implemented.');
	}

	private makeEmail(main = false, verified = true): Email {
		const id = makeId();
		return {
			id,
			email: `${id}@example.org`,
			main,
			verified
		};
	}

	// Unimplemented side

	countEmailsRaw(initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<number>> {
		throw new Error('Method not implemented.');
	}

	createEmailRaw(
		requestParameters: CreateEmailRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<Email>> {
		throw new Error('Method not implemented.');
	}

	deleteEmailRaw(
		requestParameters: DeleteEmailRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	listEmailsRaw(
		requestParameters: ListEmailsRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<Array<Email>>> {
		throw new Error('Method not implemented.');
	}

	setMainEmailRaw(
		requestParameters: SetMainEmailRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	verifyEmailRaw(
		requestParameters: VerifyEmailRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}
}
