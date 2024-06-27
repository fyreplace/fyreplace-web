import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const GET = (() =>
	json({
		applinks: {
			apps: [],
			details: [
				{
					appIDs: [env.PUBLIC_APPLE_APP_ID],
					appID: env.PUBLIC_APPLE_APP_ID,
					components: [
						{
							'/': '/*',
							comment: 'Matches any URL'
						}
					],
					paths: ['*']
				}
			]
		},
		webcredentials: {
			apps: [env.PUBLIC_APPLE_APP_ID]
		},
		appclips: {
			apps: []
		}
	})) satisfies RequestHandler;
