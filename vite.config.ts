import { defineConfig, type UserConfig } from 'vite';
import { sveltekit } from '@sveltejs/kit/vite';

export default defineConfig({
  plugins: [sveltekit()],
  build: {
    assetsInlineLimit: 0,
    sourcemap: true
  }
} as Partial<UserConfig>);
