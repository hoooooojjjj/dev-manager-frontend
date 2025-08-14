// next.config.ts
import type { NextConfig } from 'next';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const isDev = process.env.NODE_ENV !== 'production';
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',
  },
  serverExternalPackages: ['msw'],
  ...(isDev && {
    webpack: (config, { dev, isServer }) => {
      config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
      return config;
    },
  }),
};

export default withVanillaExtract(nextConfig);
