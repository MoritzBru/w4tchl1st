<script setup lang="ts">
const {
  getTrending, getUpcoming,
} = useTmdb();
const trendingMovies = await getTrending('movie');
const trendingTV = await getTrending('tv');
const upcomingMovies = await getUpcoming('movie');
const upcomingTV = await getUpcoming('tv');
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
        Upcoming Movies
      </SectionHeading>
    </UContainer>
    <CarouselBase :items="upcomingMovies?.results || []" />

    <UContainer>
      <SectionHeading>
        Trending TV Shows
      </SectionHeading>
    </UContainer>
    <CarouselBase :items="trendingTV?.results || []" />

    <UContainer>
      <SectionHeading>
        Upcoming TV Shows
      </SectionHeading>
    </UContainer>
    <CarouselBase :items="upcomingTV?.results || []" />
  </main>
</template>
