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
	RequestOpts,
	SetMainEmailRequest,
	VerifyEmailRequest
} from '../generated';
import FakeTokensEndpointApi from './tokens-endpoint';
import FakeUsersEndpointApi from './users-endpoint';
import { fail } from './utils';

export default class FakeEmailsEndpointApi implements EmailsEndpointApiInterface {
	async countEmails(initOverrides?: RequestInit | InitOverrideFunction): Promise<number> {
		const emails = await this.listEmails();
		return emails.length;
	}

	async createEmail(
		emailCreation: EmailCreation,
		customDeepLinks?: boolean,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<Email> {
		switch (emailCreation.email) {
			case FakeUsersEndpointApi.badEmail:
				return fail(400);

			case FakeUsersEndpointApi.usedEmail:
				return fail(409);

			default:
				return {
					id: makeId(),
					email: emailCreation.email,
					main: false,
					verified: false
				};
		}
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
				return [
					this.makeEmail(true, true),
					this.makeEmail(false, true),
					this.makeEmail(false, false)
				];

			default:
				return [];
		}
	}

	setMainEmail(id: string, initOverrides?: RequestInit | InitOverrideFunction): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async verifyEmail(
		emailVerification: EmailVerification,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<void> {
		switch (emailVerification.code) {
			case FakeTokensEndpointApi.goodSecret:
				return;

			default:
				return fail(404);
		}
	}

	private makeEmail(main: boolean, verified: boolean): Email {
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

	countEmailsRequestOpts(): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	createEmailRaw(
		requestParameters: CreateEmailRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<Email>> {
		throw new Error('Method not implemented.');
	}

	createEmailRequestOpts(requestParameters: CreateEmailRequest): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	deleteEmailRaw(
		requestParameters: DeleteEmailRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	deleteEmailRequestOpts(requestParameters: DeleteEmailRequest): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	listEmailsRaw(
		requestParameters: ListEmailsRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<Array<Email>>> {
		throw new Error('Method not implemented.');
	}

	listEmailsRequestOpts(requestParameters: ListEmailsRequest): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	setMainEmailRaw(
		requestParameters: SetMainEmailRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	setMainEmailRequestOpts(requestParameters: SetMainEmailRequest): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	verifyEmailRaw(
		requestParameters: VerifyEmailRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	verifyEmailRequestOpts(requestParameters: VerifyEmailRequest): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}
}
