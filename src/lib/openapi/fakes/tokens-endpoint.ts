import {
	type ApiResponse,
	type CreateNewTokenRequest,
	type CreateTokenRequest,
	type InitOverrideFunction,
	type NewTokenCreation,
	type TokenCreation,
	type TokensEndpointApiInterface
} from '../generated';
import FakeUsersEndpointApi from './users-endpoint';
import { fail } from './utils';

export default class FakeTokensEndpointApi implements TokensEndpointApiInterface {
	static readonly goodIdentifiers = [
		FakeUsersEndpointApi.goodUsername,
		FakeUsersEndpointApi.goodEmail
	];
	static readonly badSecret = 'nopenope';
	static readonly goodSecret = 'abcd1234';
	static readonly token = 'token';

	async createNewToken(
		newTokenCreation: NewTokenCreation,
		customDeepLinks?: boolean,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<void> {
		if (newTokenCreation.identifier === FakeUsersEndpointApi.passwordUsername) {
			fail(403);
		} else if (!FakeTokensEndpointApi.goodIdentifiers.includes(newTokenCreation.identifier)) {
			fail(404);
		}
	}

	async createToken(
		tokenCreation: TokenCreation,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<string> {
		if (
			!FakeTokensEndpointApi.goodIdentifiers.includes(tokenCreation.identifier) ||
			tokenCreation.secret !== FakeTokensEndpointApi.goodSecret
		) {
			fail(404);
		}

		return FakeTokensEndpointApi.token;
	}

	async getNewToken(initOverrides?: RequestInit | InitOverrideFunction): Promise<string> {
		return FakeTokensEndpointApi.token;
	}

	// Unimplemented side

	createNewTokenRaw(
		requestParameters: CreateNewTokenRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	createTokenRaw(
		requestParameters: CreateTokenRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<string>> {
		throw new Error('Method not implemented.');
	}

	getNewTokenRaw(initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<string>> {
		throw new Error('Method not implemented.');
	}
}
