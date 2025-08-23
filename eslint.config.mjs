import { dirname } from 'path';
import { fileURLToPath } from 'url';
import { FlatCompat } from '@eslint/eslintrc';
import reactHooks from 'eslint-plugin-react-hooks';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const compat = new FlatCompat({
  baseDirectory: __dirname,
});

const eslintConfig = [
  ...compat.extends('next/core-web-vitals', 'next/typescript'),
  reactHooks.configs['recommended-latest'],
  {
    rules: {
      'react-hooks/exhaustive-deps': [
        'warn',
        {
          additionalHooks: '(useMyCustomHook|useAnotherHook)',
        },
      ],
    },
  },
];

export default eslintConfig;
