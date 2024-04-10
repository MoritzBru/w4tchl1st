<script setup lang="ts">
useHead({
  htmlAttrs: { lang: 'en' },
  titleTemplate: (title) => title ? `${title} · w4tchl1st` : 'w4tchl1st',
  meta: [
    {
      name: 'description',
      content: 'A w4tchl1st based on TMDB',
    },
  ],
});
</script>

<template>
  <NuxtLoadingIndicator color="repeating-linear-gradient(to right, #6366f1 ,#c026d3)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UModals />
  <UNotifications />
</template>

<style>
html, body , #__nuxt{
  height: 100vh;
  margin: 0;
  padding: 0;
}
</style>
