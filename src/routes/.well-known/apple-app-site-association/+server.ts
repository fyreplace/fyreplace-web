import { json, type RequestHandler } from '@sveltejs/kit';
import { env } from '$env/dynamic/public';

const data = {
  applinks: {
    apps: [],
    details: [
      {
        appIDs: [env.PUBLIC_IOS_APP_ID],
        appID: env.PUBLIC_IOS_APP_ID,
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
    apps: [env.PUBLIC_IOS_APP_ID]
  },
  appclips: {
    apps: []
  }
};

export const GET = (() => json(data)) satisfies RequestHandler;
