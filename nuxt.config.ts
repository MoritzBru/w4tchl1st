// @ts-expect-error: no declaration exported lib
import tailwindMaskImage from '@pyncz/tailwind-mask-image';

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  modules: [
    '@nuxt/eslint',
    '@nuxt/image',
    '@nuxt/ui',
    '@vueuse/nuxt',
    '@vite-pwa/nuxt',
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
  tailwindcss: {
    config: {
      plugins: [
        tailwindMaskImage,
      ],
    },
  },
  ui: {
    icons: ['ph', 'bx'],
  },
  image: {
    domains: ['image.tmdb.org'],
  },
  pwa: {
    registerType: 'autoUpdate',
    strategies: 'generateSW',
    workbox: {
      runtimeCaching: [
        {
          urlPattern: /^https:\/\/image\.tmdb\.org\/.*/i,
          handler: 'CacheFirst',
          options: {
            cacheName: 'tmdb-images',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 365, // 365 days
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
      ],
    },
    manifest: {
      name: 'w4tchl1st',
      short_name: 'w4tchl1st',
      description: 'A Watchlist based on TMDB.',
      theme_color: '#6366f1',
      background_color: '#09090b',
      display: 'standalone',
      icons: [
        {
          src: '/android-chrome-192x192.png',
          sizes: '192x192',
          type: 'image/png',
        },
        {
          src: '/android-chrome-512x512.png',
          sizes: '512x512',
          type: 'image/png',
        },
      ],
    },
    client: {
      installPrompt: true,
    },
    devOptions: {
      // enabled: true,
      type: 'module',
    },
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
