<script setup lang="ts">

useHead({
  htmlAttrs: { lang: 'en' },
  titleTemplate: (title) => title ? `${title} · Watchlist` : 'Watchlist',
  meta: [
    {
      name: 'description',
      content: 'A Watchlist based on TMDB',
    },
  ],
});
</script>

<template>
  <NuxtLoadingIndicator />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UNotifications />
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
