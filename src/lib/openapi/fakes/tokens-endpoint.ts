import {
	type ApiResponse,
	type CreateNewTokenRequest,
	type CreateTokenRequest,
	type InitOverrideFunction,
	type NewTokenCreation,
	type TokenCreation,
	type TokensEndpointApiInterface
} from '../generated';
import { fail } from './utils';

export default class FakeTokensEndpointApi implements TokensEndpointApiInterface {
	static readonly badIdentifier = 'bad-identifier';
	static readonly goodIdentifier = 'good-identifier';
	static readonly badSecret = 'nopenope';
	static readonly goodSecret = 'abcd1234';
	static readonly badToken = 'bad-token';
	static readonly goodToken = 'good-token';

	createNewTokenRaw(
		requestParameters: CreateNewTokenRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	async createNewToken(
		newTokenCreation: NewTokenCreation,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<void> {
		if (newTokenCreation.identifier !== FakeTokensEndpointApi.goodIdentifier) {
			fail(404);
		}
	}

	createTokenRaw(
		requestParameters: CreateTokenRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<string>> {
		throw new Error('Method not implemented.');
	}

	async createToken(
		tokenCreation: TokenCreation,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<string> {
		return tokenCreation.identifier === FakeTokensEndpointApi.goodIdentifier &&
			tokenCreation.secret === FakeTokensEndpointApi.goodSecret
			? FakeTokensEndpointApi.goodToken
			: fail(404);
	}

	getNewTokenRaw(initOverrides?: RequestInit | InitOverrideFunction): Promise<ApiResponse<string>> {
		throw new Error('Method not implemented.');
	}

	async getNewToken(initOverrides?: RequestInit | InitOverrideFunction): Promise<string> {
		return FakeTokensEndpointApi.goodToken;
	}
}
