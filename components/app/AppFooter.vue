<template>
  <footer class="px-8 py-16">
    <div class="container mx-auto flex flex-col items-center gap-3">
      <p class="text-xl flex items-center gap-4">
        <IconW4tchl1st class="size-6" />
        <span class="font-semibold">w4tchl1st</span>
      </p>
      <p class="flex items-center gap-4">
        Open Source on
        <UButton
          icon="i-ph-github-logo-duotone"
          color="white"
          variant="link"
          to="https://github.com/MoritzBru/w4tchl1st"
          target="_blank"
          external
        >
          GitHub
        </UButton>
      </p>
      <p class="flex items-center gap-4">
        Data provided by
        <UButton
          color="white"
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
