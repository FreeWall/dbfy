import NextBundleAnalyzer from '@next/bundle-analyzer';

/**
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

const withBundleAnalyzer = NextBundleAnalyzer({
  enabled: process.env.ANALYZE === 'true',
  openAnalyzer: true,
});

export default function next(stage) {
  return withBundleAnalyzer(
    defineNextConfig({
      distDir: 'build',
      reactStrictMode: true,
      swcMinify: true,
      pageExtensions: ['page.tsx', 'page.ts'],
      webpack(config) {
        config.module.rules.push({
          test: /\.svg$/,
          use: ['@svgr/webpack'],
        });

        return config;
      },
    }),
  );
}
