import { env } from '$env/dynamic/public';

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
  theme_color: 'coral',
  icons: [
    {
      src: '/icon.svg',
      type: 'image/svg+xml',
      sizes: 'any',
      purpose: 'any'
    },
    {
      src: '/icon-48x48.png',
      type: 'image/png',
      sizes: '48x48',
      purpose: 'any'
    },
    {
      src: '/icon-72x72.png',
      type: 'image/png',
      sizes: '72x72',
      purpose: 'any'
    },
    {
      src: '/icon-96x96.png',
      type: 'image/png',
      sizes: '96x96',
      purpose: 'any'
    },
    {
      src: '/icon-128x128.png',
      type: 'image/png',
      sizes: '128x128',
      purpose: 'any'
    },
    {
      src: '/icon-192x192.png',
      type: 'image/png',
      sizes: '192x192',
      purpose: 'any'
    },
    {
      src: '/icon-256x256.png',
      type: 'image/png',
      sizes: '256x256',
      purpose: 'any'
    },
    {
      src: '/icon-512x512.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'any'
    },
    {
      src: '/icon-maskable.svg',
      type: 'image/svg+xml',
      sizes: 'any',
      purpose: 'maskable'
    },
    {
      src: '/icon-maskable-48x48.png',
      type: 'image/png',
      sizes: '48x48',
      purpose: 'maskable'
    },
    {
      src: '/icon-maskable-72x72.png',
      type: 'image/png',
      sizes: '72x72',
      purpose: 'maskable'
    },
    {
      src: '/icon-maskable-96x96.png',
      type: 'image/png',
      sizes: '96x96',
      purpose: 'maskable'
    },
    {
      src: '/icon-maskable-128x128.png',
      type: 'image/png',
      sizes: '128x128',
      purpose: 'maskable'
    },
    {
      src: '/icon-maskable-192x192.png',
      type: 'image/png',
      sizes: '192x192',
      purpose: 'maskable'
    },
    {
      src: '/icon-maskable-256x256.png',
      type: 'image/png',
      sizes: '256x256',
      purpose: 'maskable'
    },
    {
      src: '/icon-maskable-512x512.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'maskable'
    },
    {
      src: '/icon-monochrome.svg',
      type: 'image/svg+xml',
      sizes: 'any',
      purpose: 'monochrome'
    },
    {
      src: '/icon-monochrome-48x48.png',
      type: 'image/png',
      sizes: '48x48',
      purpose: 'monochrome'
    },
    {
      src: '/icon-monochrome-72x72.png',
      type: 'image/png',
      sizes: '72x72',
      purpose: 'monochrome'
    },
    {
      src: '/icon-monochrome-96x96.png',
      type: 'image/png',
      sizes: '96x96',
      purpose: 'monochrome'
    },
    {
      src: '/icon-monochrome-128x128.png',
      type: 'image/png',
      sizes: '128x128',
      purpose: 'monochrome'
    },
    {
      src: '/icon-monochrome-192x192.png',
      type: 'image/png',
      sizes: '192x192',
      purpose: 'monochrome'
    },
    {
      src: '/icon-monochrome-256x256.png',
      type: 'image/png',
      sizes: '256x256',
      purpose: 'monochrome'
    },
    {
      src: '/icon-monochrome-512x512.png',
      type: 'image/png',
      sizes: '512x512',
      purpose: 'monochrome'
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
