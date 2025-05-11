import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const GET = (() =>
	json([
		{
			packageFamilyName: env.PUBLIC_WINDOWS_APP_FAMILY_NAME,
			paths: ['*'],
			excludePaths: []
		}
	])) satisfies RequestHandler;
