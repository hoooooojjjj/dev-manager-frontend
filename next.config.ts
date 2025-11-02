// next.config.ts
import type { NextConfig } from 'next';
import { codeInspectorPlugin } from 'code-inspector-plugin';
import { createVanillaExtractPlugin } from '@vanilla-extract/next-plugin';

const isDev = process.env.NODE_ENV !== 'production';
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig: NextConfig = {
  serverExternalPackages: ['msw'],
  ...(isDev && {
    webpack: (config, { dev, isServer }) => {
      config.plugins.push(codeInspectorPlugin({ bundler: 'webpack' }));
      return config;
    },
  }),
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '*',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default withVanillaExtract(nextConfig);
