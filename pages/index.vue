<script setup lang="ts">
definePageMeta({ middleware: 'auth' });
const { getTrending, getUpcoming } = useTmdb();
const trendingMovies = await getTrending('movie');
const trendingTV = await getTrending('tv');
const upcomingMovies = await getUpcoming('movie');
const upcomingTV = await getUpcoming('tv');
</script>

<template>
  <main class="sm:mt-24">
    <UContainer class="px-0">
      <SectionHeading class="max-sm:px-4">
        Trending Movies
      </SectionHeading>
      <CarouselBase :items="trendingMovies?.results || []" />

      <SectionHeading class="max-sm:px-4">
        Upcoming Movies
      </SectionHeading>
      <CarouselBase :items="upcomingMovies?.results || []" />

      <SectionHeading class="max-sm:px-4">
        Trending TV Shows
      </SectionHeading>
      <CarouselBase :items="trendingTV?.results || []" />

      <SectionHeading class="max-sm:px-4">
        Upcoming TV Shows
      </SectionHeading>
      <CarouselBase :items="upcomingTV?.results || []" />
    </UContainer>
  </main>
</template>
