import { makeId } from '$lib/utils';
import {
	Rank,
	type ApiResponse,
	type BlockUpdate,
	type CreateUserRequest,
	type GetUserRequest,
	type InitOverrideFunction,
	type ListBlockedUsersRequest,
	type Profile,
	type ReportUpdate,
	type RequestOpts,
	type SetCurrentUserAvatarRequest,
	type SetCurrentUserBioRequest,
	type SetUserBannedRequest,
	type SetUserBlockedRequest,
	type SetUserReportedRequest,
	type User,
	type UserCreation,
	type UsersEndpointApiInterface
} from '../generated';
import { fail } from './utils';

export default class FakeUsersEndpointApi implements UsersEndpointApiInterface {
	static readonly badUsername = 'used-username';
	static readonly reservedUsername = 'reserved-username';
	static readonly usedUsername = 'used-username';
	static readonly passwordUsername = 'password-username';
	static readonly goodUsername = 'good-username';

	static readonly badEmail = 'bad@email';
	static readonly usedEmail = 'used@email';
	static readonly goodEmail = 'good@email';

	static readonly notImageFile = new File(['Not'], 'not.txt', { type: 'image/png' });
	static readonly largeImageFile = new File(['Large'], 'large.png', { type: 'image/png' });
	static readonly normalImageFile = new File(['Normal'], 'normal.png', { type: 'image/png' });

	async countBlockedUsers(initOverrides?: RequestInit | InitOverrideFunction): Promise<number> {
		throw new Error('Method not implemented.');
	}

	async createUser(
		userCreation: UserCreation,
		customDeepLinks?: boolean,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<User> {
		if (userCreation.username === FakeUsersEndpointApi.badUsername) {
			fail(400, { violations: [{ field: 'createUser.input.username' }] });
		} else if (userCreation.username === FakeUsersEndpointApi.reservedUsername) {
			fail(403);
		} else if (
			[FakeUsersEndpointApi.usedUsername, FakeUsersEndpointApi.passwordUsername].includes(
				userCreation.username
			)
		) {
			fail(409, { reason: 'username_taken' });
		} else if (userCreation.email === FakeUsersEndpointApi.badEmail) {
			fail(400, { violations: [{ field: 'createUser.input.email' }] });
		} else if (userCreation.email === FakeUsersEndpointApi.usedEmail) {
			fail(409, { reason: 'email_taken' });
		} else {
			return this.makeUser(userCreation.username);
		}
	}

	async deleteCurrentUser(initOverrides?: RequestInit | InitOverrideFunction): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async deleteCurrentUserAvatar(
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<void> {}

	async getCurrentUser(initOverrides?: RequestInit | InitOverrideFunction): Promise<User> {
		return this.makeUser('random_user');
	}

	async getUser(id: string, initOverrides?: RequestInit | InitOverrideFunction): Promise<User> {
		throw new Error('Method not implemented.');
	}

	async listBlockedUsers(
		page?: number,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<Array<Profile>> {
		throw new Error('Method not implemented.');
	}

	async setCurrentUserAvatar(
		body: Blob,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<string> {
		switch (body) {
			case FakeUsersEndpointApi.normalImageFile:
				return FakeUsersEndpointApi.normalImageFile.name;

			case FakeUsersEndpointApi.largeImageFile:
				return fail(413);

			default:
				return fail(415);
		}
	}

	async setCurrentUserBio(
		body: string,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<string> {
		return body;
	}

	async setUserBanned(
		id: string,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async setUserBlocked(
		id: string,
		blockUpdate: BlockUpdate,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<void> {
		throw new Error('Method not implemented.');
	}

	async setUserReported(
		id: string,
		reportUpdate: ReportUpdate,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<void> {
		throw new Error('Method not implemented.');
	}

	private makeUser(username: string): User {
		return {
			id: makeId(),
			dateCreated: new Date(),
			username: username,
			rank: Rank.Citizen,
			avatar: '',
			bio: 'Hello there',
			banned: false,
			blocked: false,
			tint: { r: 0x7f, g: 0x7f, b: 0x7f }
		};
	}

	// Unimplemented side

	countBlockedUsersRaw(
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<number>> {
		throw new Error('Method not implemented.');
	}

	countBlockedUsersRequestOpts(): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	createUserRaw(
		requestParameters: CreateUserRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<User>> {
		throw new Error('Method not implemented.');
	}

	createUserRequestOpts(
		requestParameters: CreateUserRequest
	): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	deleteCurrentUserRaw(
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	deleteCurrentUserRequestOpts(): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	deleteCurrentUserAvatarRaw(
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	deleteCurrentUserAvatarRequestOpts(): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	getCurrentUserRaw(
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<User>> {
		throw new Error('Method not implemented.');
	}

	getCurrentUserRequestOpts(): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	getUserRaw(
		requestParameters: GetUserRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<User>> {
		throw new Error('Method not implemented.');
	}

	getUserRequestOpts(requestParameters: GetUserRequest): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	listBlockedUsersRaw(
		requestParameters: ListBlockedUsersRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<Array<Profile>>> {
		throw new Error('Method not implemented.');
	}

	listBlockedUsersRequestOpts(
		requestParameters: ListBlockedUsersRequest
	): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	setCurrentUserAvatarRaw(
		requestParameters: SetCurrentUserAvatarRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<string>> {
		throw new Error('Method not implemented.');
	}

	setCurrentUserAvatarRequestOpts(
		requestParameters: SetCurrentUserAvatarRequest
	): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	setCurrentUserBioRaw(
		requestParameters: SetCurrentUserBioRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<string>> {
		throw new Error('Method not implemented.');
	}

	setCurrentUserBioRequestOpts(
		requestParameters: SetCurrentUserBioRequest
	): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	setUserBannedRaw(
		requestParameters: SetUserBannedRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	setUserBannedRequestOpts(
		requestParameters: SetUserBannedRequest
	): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	setUserBlockedRaw(
		requestParameters: SetUserBlockedRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	setUserBlockedRequestOpts(
		requestParameters: SetUserBlockedRequest
	): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}

	setUserReportedRaw(
		requestParameters: SetUserReportedRequest,
		initOverrides?: RequestInit | InitOverrideFunction
	): Promise<ApiResponse<void>> {
		throw new Error('Method not implemented.');
	}

	setUserReportedRequestOpts(
		requestParameters: SetUserReportedRequest
	): Promise<RequestOpts> {
		throw new Error('Method not implemented.');
	}
}
