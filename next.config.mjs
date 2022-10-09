import { fsync, readdirSync } from 'fs';
import { readdir } from 'fs/promises';
import { env } from './src/env/server.mjs';
/**
 * Don't be scared of the generics here.
 * All they do is to give us autocompletion when using this.
 *
 * @template {import('next').NextConfig} T
 * @param {T} config - A generic parameter that flows through to the return type
 * @constraint {{import('next').NextConfig}}
 */
function defineNextConfig(config) {
  return config;
}

export default function next(stage) {
  console.info(stage);

  return defineNextConfig({
    reactStrictMode: true,
    swcMinify: true,
    // Next.js i18n docs: https://nextjs.org/docs/advanced-features/i18n-routing
    i18n: {
      locales: ['en'],
      defaultLocale: 'en',
    },
  });
}
