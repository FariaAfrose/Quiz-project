module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: 'airbnb',
  overrides: [
    {
      env: {
        node: true,
      },
      files: [
        '.eslintrc.{js,cjs}',
      ],
      parserOptions: {
        sourceType: 'script',
      },
    },
  ],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    indent: 'off',
    'linebreak-style': 'off',
    camelcase: 'off',
    // "no-var": "off",
    'prefer-const': 'off',
    'import/no-extraneous-dependencies': ['error', { devDependencies: true }]
,
  },
};
