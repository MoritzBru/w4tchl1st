import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
import plugin from 'tailwindcss/plugin';

// @ts-expect-error: no declaration from commonjs exported lib
import tailwindMaskImage from '@pyncz/tailwind-mask-image';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        // primary & gray are set by nuxt/ui
        primary: colors.indigo,
        gray: colors.zinc,
        secondary: colors.fuchsia,
      },
      textShadow: {
        sm: '0 1px 2px var(--tw-shadow-color)',
        DEFAULT: '0 2px 4px var(--tw-shadow-color)',
        lg: '0 8px 16px var(--tw-shadow-color)',
      },
    },
  },
  plugins: [
    tailwindMaskImage,
    plugin(function ({ matchUtilities, theme }) {
      matchUtilities(
        { 'text-shadow': (value) => ({ textShadow: value }) },
        { values: theme('textShadow') },
      );
    }),
  ],
};
