import { env } from '$env/dynamic/public';
import iconAt48x48 from '$lib/assets/icon-48x48.png';
import iconAt72x72 from '$lib/assets/icon-72x72.png';
import iconAt96x96 from '$lib/assets/icon-96x96.png';
import iconAt128x128 from '$lib/assets/icon-128x128.png';
import iconAt192x192 from '$lib/assets/icon-192x192.png';
import iconAt256x256 from '$lib/assets/icon-256x256.png';
import iconAt512x512 from '$lib/assets/icon-512x512.png';
import iconMaskableAt48x48 from '$lib/assets/icon-maskable-48x48.png';
import iconMaskableAt72x72 from '$lib/assets/icon-maskable-72x72.png';
import iconMaskableAt96x96 from '$lib/assets/icon-maskable-96x96.png';
import iconMaskableAt128x128 from '$lib/assets/icon-maskable-128x128.png';
import iconMaskableAt192x192 from '$lib/assets/icon-maskable-192x192.png';
import iconMaskableAt256x256 from '$lib/assets/icon-maskable-256x256.png';
import iconMaskableAt512x512 from '$lib/assets/icon-maskable-512x512.png';

interface RelatedApplication {
  platform: string;
  url: string;
}

const manifest = {
  name: 'Fyreplace',
  short_name: 'Fyreplace',
  description: 'Fyreplace social media web app',
  categories: ['social'],
  related_applications: [] as RelatedApplication[],
  display: 'standalone',
  id: '/feed',
  start_url: '/feed',
  icons: [
    {
      src: iconAt48x48,
      type: 'image/png',
      sizes: '48x48'
    },
    {
      src: iconAt72x72,
      type: 'image/png',
      sizes: '72x72'
    },
    {
      src: iconAt96x96,
      type: 'image/png',
      sizes: '96x96'
    },
    {
      src: iconAt128x128,
      type: 'image/png',
      sizes: '128x128'
    },
    {
      src: iconAt192x192,
      type: 'image/png',
      sizes: '192x192'
    },
    {
      src: iconAt256x256,
      type: 'image/png',
      sizes: '256x256'
    },
    {
      src: iconAt512x512,
      type: 'image/png',
      sizes: '512x512'
    },
    {
      src: iconMaskableAt48x48,
      type: 'image/png',
      sizes: '48x48',
      purpose: 'maskable'
    },
    {
      src: iconMaskableAt72x72,
      type: 'image/png',
      sizes: '72x72',
      purpose: 'maskable'
    },
    {
      src: iconMaskableAt96x96,
      type: 'image/png',
      sizes: '96x96',
      purpose: 'maskable'
    },
    {
      src: iconMaskableAt128x128,
      type: 'image/png',
      sizes: '128x128',
      purpose: 'maskable'
    },
    {
      src: iconMaskableAt192x192,
      type: 'image/png',
      sizes: '192x192',
      purpose: 'maskable'
    },
    {
      src: iconMaskableAt256x256,
      type: 'image/png',
      sizes: '256x256',
      purpose: 'maskable'
    },
    {
      src: iconMaskableAt512x512,
      type: 'image/png',
      sizes: '512x512',
      purpose: 'maskable'
    }
  ]
};

if (env.PUBLIC_APPLE_APP_STORE_URL) {
  manifest.related_applications.push({
    platform: 'itunes',
    url: env.PUBLIC_APPLE_APP_STORE_URL
  });
}

if (env.PUBLIC_GOOGLE_PLAY_STORE_URL) {
  manifest.related_applications.push({
    platform: 'play',
    url: env.PUBLIC_GOOGLE_PLAY_STORE_URL
  });
}

export function GET(): Response {
  return new Response(JSON.stringify(manifest), {
    headers: { 'Content-Type': 'application/manifest+json' }
  });
}
