<script setup lang="ts">
const { getTrending } = useTmdb();
const trendingMovies = await getTrending('movie');
const trendingTV = await getTrending('tv');
</script>

<template>
  <main class="my-4">
    <SectionHeading class="px-10">
      Trending Movies
    </SectionHeading>
    <CarouselBase
      type="movie"
      :items="trendingMovies?.results || []"
    />
    <SectionHeading class="px-10 mt-6">
      Trending TV Shows
    </SectionHeading>
    <CarouselBase
      type="tv"
      :items="trendingTV?.results || []"
    />
  </main>
</template>
