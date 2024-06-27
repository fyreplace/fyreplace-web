import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

export const GET = (() =>
	json([
		{
			relation: ['delegate_permission/common.handle_all_urls'],
			target: {
				namespace: 'android_app',
				package_name: env.PUBLIC_ANDROID_APP_ID,
				sha256_cert_fingerprints: (env.PUBLIC_ANDROID_CERTS_SHA256 || '').split(',')
			}
		}
	])) satisfies RequestHandler;
