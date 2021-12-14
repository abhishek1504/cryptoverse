module.exports = {
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
    'plugin:sonarjs/recommended',
    'prettier/prettier',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 12,
    sourceType: 'module',
  },
  plugins: ['react'],
  rules: {
    'react/jsx-filename-extension': [0],
    'object-curly-newline': [0],
    'react/jsx-one-expression-per-line': [0],
    'implicit-arrow-linebreak': [0],
    'function-paren-newline': [0],
    'operator-linebreak': [0],
    'react/no-string-refs': [0],
    'react/no-array-index-key': [0],
    'react/jsx-curly-newline': [0],
    'linebreak-style': [0]
  },
};
