import eslintPlugin from '@typescript-eslint/eslint-plugin';
import parser from '@typescript-eslint/parser';

export default [
  {
    files: ['**/*.{ts,tsx,js,jsx,mjs}'],
    languageOptions: {
      parser: parser,
      parserOptions: {
        ecmaVersion: 'latest',
        sourceType: 'module',
      },
    },
  },
  {
    plugins: {
      '@typescript-eslint': eslintPlugin,
    },
  },
  {
    rules: {
      '@typescript-eslint/no-unused-vars': [
        'error',
        { argsIgnorePattern: '^_' },
      ],
      '@typescript-eslint/no-empty-interface': 'off',
      'no-console': 'error',
    },
  },
  {
    ignores: ['**/node_modules', '/dist/**', '/coverage/**'],
  },
];
