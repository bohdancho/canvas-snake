/** @type {import('eslint').Linter.Config} */
module.exports = {
  root: true,
  env: { browser: true, node: true, es2020: true },
  extends: ['eslint:recommended'],
  parserOptions: {
    sourceType: 'module',
  },
}
