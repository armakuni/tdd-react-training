module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'airbnb-base',
    'plugin:@typescript-eslint/recommended',
    'plugin:@typescript-eslint/recommended-requiring-type-checking',
  ],
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    '@typescript-eslint',
  ],
  rules: {
  },
  ignorePatterns: ['dist/*', 'coverage/*', '.eslintrc.js', 'jest.config.ts'],
  overrides: [
    {
      files: [
        '**/*.test.ts',
      ],
      env: {
        jest: true,
      },
    },
  ],
};
