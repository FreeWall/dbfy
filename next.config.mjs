import './src/server/env/server.mjs';

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

/*const withAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});*/

export default function next(stage) {
  return defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    pageExtensions: ['page.tsx', 'page.ts'],
    async redirects() {
      return [
        {
          source: '/index',
          destination: '/',
          permanent: false,
        },
      ];
    },
  });
}
