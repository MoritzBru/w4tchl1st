const stylistic = require('@stylistic/eslint-plugin');

const customized = stylistic.configs.customize({
  semi: true,
  jsx: false,
  arrowParens: true,
});

module.exports = {
  root: true,
  extends: ['@nuxt/eslint-config'],
  plugins: ['@stylistic'],
  rules: {
    ...customized.rules,
  },
};
