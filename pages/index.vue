<script setup lang="ts">
const trendingMovies = getTrending('movie');
const trendingTV = getTrending('tv');
</script>

<template>
  <main class="my-4">
    <h2 class="text-xl py-3 px-10">
      Trending Movies
    </h2>
    <CarouselBase
      type="movie"
      :items="trendingMovies.data.value?.results || []"
    />
    <h2 class="text-xl py-3 px-10 mt-12">
      Trending TV Shows
    </h2>
    <CarouselBase
      type="tv"
      :items="trendingTV.data.value?.results || []"
    />
  </main>
</template>
