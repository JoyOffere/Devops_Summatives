import js from '@eslint/js';

export default [
  js.configs.recommended,
  {
    files: ['**/*.js'],
    languageOptions: {
      ecmaVersion: 2021,
      sourceType: 'module',
      globals: {
        require: 'readonly',
        process: 'readonly',
        console: 'readonly',
        module: 'readonly',
        __dirname: 'readonly',
        __filename: 'readonly',
      },
    },
    rules: {
      semi: ['error', 'always'],
      quotes: ['error', 'single'],
      'no-unused-vars': ['warn'],
      'no-console': 'off',
    },
  },
];