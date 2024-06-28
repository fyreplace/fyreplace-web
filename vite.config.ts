import { sveltekit } from '@sveltejs/kit/vite';
import { sentrySvelteKit } from '@sentry/sveltekit';
import { defineConfig } from 'vitest/config';
import pkg from './package.json';

export default defineConfig({
	plugins: [
		sentrySvelteKit({
			adapter: process.env.ADAPTER_NODE ? 'node' : 'auto',
			sourceMapsUploadOptions: {
				release: {
					name: `${pkg.name}@${process.env.PUBLIC_PACKAGE_VERSION}`
				}
			}
		}),
		sveltekit()
	],
	test: {
		include: ['src/**/*.{test,spec}.{js,ts}']
	}
});
