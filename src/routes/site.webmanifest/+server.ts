import i18next from 'i18next';
import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

function makeIcons(suffix: string, purpose: string) {
	return ['any', 48, 72, 96, 128, 192, 256, 512].map((size) => ({
		src: size === 'any' ? `/icon${suffix}.svg` : `/icon${suffix}-${size}x${size}.png`,
		type: size === 'any' ? 'image/svg+xml' : 'image/png',
		sizes: size === 'any' ? 'any' : `${size}x${size}`,
		purpose
	}));
}

export const GET = (() =>
	json(
		{
			name: i18next.t('app-name'),
			short_name: i18next.t('app-name'),
			description: i18next.t('app-description'),
			categories: ['social'],
			related_applications: [
				{
					platform: 'itunes',
					url: env.PUBLIC_APPLE_STORE_URL
				},
				{
					platform: 'play',
					url: env.PUBLIC_ANDROID_STORE_URL
				},
				{
					platform: 'windows',
					url: env.PUBLIC_WINDOWS_STORE_URL
				}
			].filter((app) => app.url),
			prefer_related_applications: true,
			display: 'standalone',
			id: '/feed',
			start_url: '/feed',
			theme_color: '#FF8243',
			icons: [
				{
					src: '/icon.svg',
					type: 'image/svg+xml',
					sizes: 'any',
					purpose: 'any monochrome'
				},
				{
					src: '/icon-maskable.svg',
					type: 'image/svg+xml',
					sizes: 'any',
					purpose: 'maskable'
				}
			]
				.concat(makeIcons('', 'any monochrome'))
				.concat(makeIcons('-maskable', 'maskable'))
		},
		{
			headers: {
				'Content-Type': 'application/manifest+json'
			}
		}
	)) satisfies RequestHandler;
