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
    '@stylistic/array-bracket-newline': [
      'warn',
      {
        multiline: true,
        minItems: 2,
      },
    ],
    '@stylistic/array-element-newline': [
      'warn',
      {
        multiline: true,
        minItems: 2,
      },
    ],
    '@stylistic/object-curly-newline': [
      'warn',
      {
        multiline: true,
        minProperties: 2,
      },
    ],
    '@stylistic/object-property-newline': [
      'warn',
      { allowAllPropertiesOnSameLine: false },
    ],
  },
};
