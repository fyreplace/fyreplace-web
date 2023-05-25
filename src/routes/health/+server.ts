import type { RequestHandler } from '@sveltejs/kit';

export const GET = (() => new Response()) satisfies RequestHandler;
