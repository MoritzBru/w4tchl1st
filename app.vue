<script setup lang="ts">

useHead({
  htmlAttrs: {
    lang: 'en',
  },
  titleTemplate: title => title ? `${title} · Watchlist` : 'Watchlist',
  meta: [
    { name: 'description', content: 'A Watchlist based on TMDB' },
  ],
});
</script>

<template>
  <div>
    <!-- <TheNav /> -->
    <main class="container p-4 mx-auto">
      <NuxtPage />
    </main>
    <!-- <TheFooter /> -->
  </div>
</template>
