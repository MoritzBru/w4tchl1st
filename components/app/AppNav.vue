<script setup lang="ts">
import { typeToTitleLookup } from '~/constants/ui';

const links = [
  {
    label: 'Browse',
    icon: 'i-ph-house-duotone',
    iconActive: 'i-ph-house-fill',
    to: '/',
  },
  {
    label: typeToTitleLookup.movie,
    icon: 'i-ph-film-strip-duotone',
    iconActive: 'i-ph-film-strip-fill',
    to: '/movie',
  },
  {
    label: typeToTitleLookup.tv,
    icon: 'i-ph-television-duotone',
    iconActive: 'i-ph-television-fill',
    to: '/tv',
  },
  {
    label: 'Search',
    icon: 'i-ph-magnifying-glass-duotone',
    iconActive: 'i-ph-magnifying-glass-fill',
    to: '/search',
  },
];
</script>

<template>
  <UHorizontalNavigation
    :links="links"
    :ui="{
      container: 'w-full justify-between sm:justify-normal lg:gap-2',
      base: 'gap-0 sm:gap-1.5',
      label: 'sr-only sm:not-sr-only sm:relative',
      after: 'after:content-none',
    }"
  >
    <template #icon="{ link, isActive }">
      <span
        :class="[
          'flex-shrink-0 size-10 sm:size-8 transition-colors',
          isActive ? link.iconActive : link.icon,
          isActive ? 'bg-gradient-to-r from-primary-500 to-secondary-500 inline-block bg-clip-content' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200',
        ]"
      />
    </template>
  </UHorizontalNavigation>
</template>
