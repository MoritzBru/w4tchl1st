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
    strategies: 'generateSW',
    registerType: 'autoUpdate',
    workbox: {
      globPatterns: ['**/*.{js,css,html,png,svg,ico}'],
      navigateFallback: '/',
      runtimeCaching: [
        {
          urlPattern: ({ url }) => url.href.includes('image.tmdb.org'),
          handler: 'CacheFirst',
          options: {
            cacheName: 'tmdb-images',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30,
            },
            cacheableResponse: {
              statuses: [0, 200],
            },
          },
        },
        {
          urlPattern: ({ url }) => url.href.includes('api.themoviedb.org'),
          handler: 'NetworkFirst',
          options: {
            cacheName: 'tmdb-api',
            expiration: {
              maxAgeSeconds: 60 * 60 * 24 * 30,
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
      start_url: '/',
      icons: [
        {
          src: '/pwa-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'any',
        },
        {
          src: '/pwa-maskable-192x192.png',
          sizes: '192x192',
          type: 'image/png',
          purpose: 'maskable',
        },
        {
          src: '/pwa-maskable-512x512.png',
          sizes: '512x512',
          type: 'image/png',
          purpose: 'maskable',
        },
      ],
      screenshots: [
        {
          src: 'screenshots/mobile-browse.png',
          sizes: '540x1201',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'Mobile Browse',
        },
        {
          src: 'screenshots/mobile-detail.png',
          sizes: '540x1201',
          type: 'image/png',
          form_factor: 'narrow',
          label: 'Mobile Detail',
        },
        {
          src: 'screenshots/desktop-browse.png',
          sizes: '1600x900',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Desktop Browse',
        },
        {
          src: 'screenshots/desktop-detail.png',
          sizes: '1600x900',
          type: 'image/png',
          form_factor: 'wide',
          label: 'Desktop Detail',
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
