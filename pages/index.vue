<script setup lang="ts">
const { getTrending } = useTmdb();
const trendingMovies = await getTrending('movie');
const trendingTV = await getTrending('tv');
</script>

<template>
  <main class="mt-24">
    <UContainer>
      <SectionHeading>
        Trending Movies
      </SectionHeading>
    </UContainer>
    <CarouselBase :items="trendingMovies?.results || []" />

    <UContainer>
      <SectionHeading>
        Trending TV Shows
      </SectionHeading>
    </UContainer>
    <CarouselBase :items="trendingTV?.results || []" />
  </main>
</template>
