module.exports = {
  env: {
    'browser': true,
    'commonjs': true,
    'es2021': true,
    'node': true
  },
  extends: ['plugin:prettier/recommended'],
  plugins: ['prettier'],
  overrides: [
  ],
  parserOptions: {
    'ecmaVersion': 'latest'
  },
  rules: {
    'prettier/prettier': ['error', { endOfLine: 'auto' }],
    semi: ['error', 'never'],
  },
}
