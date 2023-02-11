import { vitePreprocess } from '@sveltejs/kit/vite';
import autoAdapter from '@sveltejs/adapter-auto';
import nodeAdapter from '@sveltejs/adapter-node';

/** @type {import('@sveltejs/kit').Config} */
export default {
  preprocess: vitePreprocess(),
  kit: {
    adapter: process.env.DOCKER ? nodeAdapter({ precompress: true }) : autoAdapter(),
    typescript: {
      config(config) {
        // The default globs in .svelte-kit/tsconfig.json ignore paths starting with a dot
        config.include.push('../src/routes/.well-known/**/*.ts');
        return config;
      }
    }
  }
};
