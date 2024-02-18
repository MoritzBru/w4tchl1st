<script setup lang="ts">

</script>

<template>
  <footer class="p-8">
    <div class="container mx-auto flex flex-col gap-3">
      <p class="text-2xl flex items-center gap-4">
        <IconWatchlist class="size-6" />
        Watchlist
      </p>
      <p class="flex items-center gap-4">
        Made by
        <UButton
          icon="i-ph-github-logo-duotone"
          color="gray"
          variant="ghost"
          to="https://github.com/MoritzBru/watchlist"
          target="_blank"
          rel="noopener"
        >
          Moritz Brunnengräber
        </UButton>
      </p>
      <p class="flex items-center gap-4">
        Data provided by
        <a
          href="https://www.themoviedb.org/"
          title="The Movie Database"
          target="_blank"
          rel="noopener"
        >
          <IconTmdbShort class="h-4 w-auto" />
        </a>
      </p>
    </div>
  </footer>
</template>
