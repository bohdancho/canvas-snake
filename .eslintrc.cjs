/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  extends: ['eslint:recommended', 'plugin:@typescript-eslint/recommended'],
  parser: '@typescript-eslint/parser',
  rules: {
    '@typescript-eslint/no-use-before-define': ['error', { functions: false }],
    '@typescript-eslint/no-unused-vars': 'warn',
    '@typescript-eslint/no-unused-expressions': 'warn',
    '@typescript-eslint/explicit-function-return-type': [
      'warn',
      { allowTypedFunctionExpressions: true },
    ],
  },
}
