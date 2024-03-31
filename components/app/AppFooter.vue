<template>
  <footer class="px-8 py-16">
    <div class="container mx-auto flex flex-col items-center gap-3">
      <p class="text-xl flex items-center gap-4">
        <IconWatchlist class="size-6" />
        <span class="font-semibold">Watchlist</span>
      </p>
      <p class="flex items-center gap-4">
        Made by
        <UButton
          icon="i-ph-github-logo-duotone"
          color="gray"
          variant="link"
          to="https://github.com/MoritzBru/watchlist"
          target="_blank"
          external
        >
          Moritz Brunnengräber
        </UButton>
      </p>
      <p class="flex items-center gap-4">
        Data provided by
        <UButton
          color="gray"
          variant="link"
          to="https://www.themoviedb.org/"
          title="The Movie Database"
          target="_blank"
          external
        >
          <IconTmdbShort class="h-4 w-auto" />
        </UButton>
      </p>
    </div>
  </footer>
</template>
