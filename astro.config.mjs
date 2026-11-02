// @ts-check
import { defineConfig } from 'astro/config';
import { loadEnv } from 'vite';
import react from '@astrojs/react';
import sanity from '@sanity/astro';

// Project ID and dataset are public values; they can be overridden with env vars (see .env.example).
const env = loadEnv(process.env.NODE_ENV ?? 'development', process.cwd(), '');
const projectId = env.PUBLIC_SANITY_PROJECT_ID || 'jmz64r1s';
const dataset = env.PUBLIC_SANITY_DATASET || 'production';

// https://docs.astro.build/en/reference/configuration-reference/
export default defineConfig({
  site: 'https://www.aayera.com',
  integrations: [
    sanity({
      projectId,
      dataset,
      apiVersion: '2026-11-01',
      useCdn: false, // static build: always read fresh content at build time
      studioBasePath: '/studio',
    }),
    react(),
  ],
});
