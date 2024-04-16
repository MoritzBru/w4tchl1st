// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@pinia/nuxt',
  ],
  eslint: {
    config: {
      stylistic: {
        indent: 2,
        quotes: 'single',
        semi: true,
        jsx: false,
        arrowParens: true,
      },
    },
  },
  alias: { pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs' },
  app: {
    head: {
      link: [
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'favicon.svg',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'apple-touch-icon.png',
        },
        {
          rel: 'mask-icon',
          color: '#6366f1',
          href: 'mask-icon.svg',
        },
        {
          rel: 'manifest',
          href: 'site.webmanifest',
        },
      ],
      meta: [
        {
          name: 'theme-color',
          content: '#6366f1',
        },
      ],
    },
  },
  ui: {
    icons: ['ph', 'bx'],
  },
  image: {
    domains: ['image.tmdb.org'],
  },
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000',
      tmdbBaseUrl: 'https://api.themoviedb.org',
      tmdbToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjJiOThjNWRiMzNhOWM3NmQ1NzZhNmYwMWE5ODQ4NCIsInN1YiI6IjY1Y2NjZTExZTI2M2JiMDE4NjY5NGYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2HTfb3dZWlTBQQq7vHuN3iWrkW3EcBZHIuurvPnht9k',
    },
  },

  $production: {
    image: {
      provider: 'netlify',
    },
    runtimeConfig: {
      public: {
        baseUrl: 'w4tchl1st.netlify.app',
      },
    },
  },
});
