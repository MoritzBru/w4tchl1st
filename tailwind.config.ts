import type { Config } from 'tailwindcss';
import colors from 'tailwindcss/colors';

export default <Partial<Config>>{
  theme: {
    extend: {
      colors: {
        // primary & gray are set by nuxt/ui
        secondary: colors.fuchsia,
      },
    },
  },
};
