// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  ssr: false,
  devtools: { enabled: true },
  // typescript: {
  //   typeCheck: true,
  // },
  modules: ['@nuxt/ui', '@vueuse/nuxt', '@pinia/nuxt'],
  alias: {
    pinia: '/node_modules/@pinia/nuxt/node_modules/pinia/dist/pinia.mjs',
  },
  runtimeConfig: {
    public: {
      baseUrl: 'http://localhost:3000',
      tmdbBaseUrl: 'https://api.themoviedb.org',
      tmdbToken: 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiJmMjJiOThjNWRiMzNhOWM3NmQ1NzZhNmYwMWE5ODQ4NCIsInN1YiI6IjY1Y2NjZTExZTI2M2JiMDE4NjY5NGYxMyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.2HTfb3dZWlTBQQq7vHuN3iWrkW3EcBZHIuurvPnht9k',
    },
  },
});
