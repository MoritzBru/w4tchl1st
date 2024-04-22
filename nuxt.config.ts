// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
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
          rel: 'preconnect',
          href: 'https://image.tmdb.org',
        },
        {
          rel: 'preconnect',
          href: 'https://api.themoviedb.org',
        },
        {
          rel: 'icon',
          type: 'image/svg+xml',
          href: 'favicon.svg',
          tagPriority: 'low',
        },
        {
          rel: 'apple-touch-icon',
          sizes: '180x180',
          href: 'apple-touch-icon.png',
          tagPriority: 'low',
        },
        {
          rel: 'mask-icon',
          color: '#6366f1',
          href: 'mask-icon.svg',
          tagPriority: 'low',
        },
        {
          rel: 'manifest',
          href: 'site.webmanifest',
          tagPriority: 'low',
        },
      ],
      meta: [
        {
          name: 'theme-color',
          content: '#6366f1',
          tagPriority: 'low',
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
        baseUrl: 'https://w4tchl1st.netlify.app',
      },
    },
  },
});
