import autoAdapter from '@sveltejs/adapter-auto';
import nodeAdapter from '@sveltejs/adapter-node';
import { vitePreprocess } from '@sveltejs/vite-plugin-svelte';

/** @type {import('@sveltejs/kit').Config} */
const config = {
	preprocess: vitePreprocess(),

	kit: {
		adapter: process.env.ADAPTER_NODE ? nodeAdapter() : autoAdapter(),
		typescript: {
			config(config) {
				// The default globs in .svelte-kit/tsconfig.json ignore paths starting with a dot
				config.include.push('../src/routes/.well-known/**/*.ts');
				return config;
			}
		}
	}
};

export default config;
