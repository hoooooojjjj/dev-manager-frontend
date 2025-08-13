// next.config.ts
import type { NextConfig } from 'next';
import { codeInspectorPlugin } from 'code-inspector-plugin';

const isDev = process.env.NODE_ENV !== 'production';

const nextConfig: NextConfig = {
  env: {
    NEXT_PUBLIC_API_BASE_URL: process.env.NEXT_PUBLIC_API_BASE_URL || '/api/v1',
  },
  serverExternalPackages: ['msw'],
  turbopack: {
    rules: isDev ? codeInspectorPlugin({ bundler: 'turbopack' }) : [],
  },
};

export default nextConfig;
