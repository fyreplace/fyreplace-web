import { env } from '$env/dynamic/public';

const fingerprints = env.PUBLIC_ANDROID_CERTS_SHA256 || '';
const data = [
  {
    relation: ['delegate_permission/common.handle_all_urls'],
    target: {
      namespace: 'android_app',
      package_name: env.PUBLIC_ANDROID_PACKAGE_NAME,
      sha256_cert_fingerprints: fingerprints.split(',')
    }
  }
];

export function GET(): Response {
  return new Response(JSON.stringify(data), { headers: { 'Content-Type': 'application/json' } });
}
