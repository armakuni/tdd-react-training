module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  settings: {
    'import/resolver': {
      node: {
        extensions: ['.js', '.jsx'],
      },
    },
  },
  ignorePatterns: ['build/', '.eslintrc.js', 'reportWebVitals.ts'],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.jsx', '.tsx'] }],
    'import/extensions': [
      'error',
      'ignorePackages',
      {
        js: 'never',
        jsx: 'never'
      },
    ],
  },
  overrides: [
    {
      files: [
        '**/*.test.js',
        '**/*.test.jsx',
      ],
      env: {
        jest: true,
      },
      rules: {
        'import/no-extraneous-dependencies': 0,
        "react/prop-types": "off",
      },
    },
  ],
};
