import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';
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
    },
  },
  plugins: [tailwindMaskImage],
};
