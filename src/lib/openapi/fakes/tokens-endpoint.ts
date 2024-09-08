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
	static readonly badIdentifier = FakeUsersEndpointApi.badEmail;
	static readonly goodIdentifier = FakeUsersEndpointApi.goodEmail;
	static readonly badSecret = 'nopenope';
	static readonly goodSecret = 'abcd1234';
	static readonly badToken = 'bad-token';
	static readonly goodToken = 'good-token';

	async createNewToken(
		newTokenCreation: NewTokenCreation,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<void> {
		if (newTokenCreation.identifier !== FakeTokensEndpointApi.goodIdentifier) {
			fail(404);
		}
	}

	async createToken(
		tokenCreation: TokenCreation,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<string> {
		if (
			tokenCreation.identifier !== FakeTokensEndpointApi.goodIdentifier ||
			tokenCreation.secret !== FakeTokensEndpointApi.goodSecret
		) {
			fail(404);
		}

		return FakeTokensEndpointApi.goodToken;
	}

	async getNewToken(initOverrides?: RequestInit | InitOverrideFunction): Promise<string> {
		return FakeTokensEndpointApi.goodToken;
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
