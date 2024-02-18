<script setup lang="ts">

const links = [
  {
    label: 'Home',
    icon: 'i-ph-house-duotone',
    iconActive: 'i-ph-house-fill',
    to: '/',
  },
  {
    label: 'Movie',
    icon: 'i-ph-film-strip-duotone',
    iconActive: 'i-ph-film-strip-fill',
    to: '/movie',
  },
  {
    label: 'TV',
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
  <header class="px-3 py-2 flex justify-between items-center">
    <UHorizontalNavigation
      :links="links"
      :ui="{
        label: 'sr-only sm:not-sr-only sm:relative',
        after: 'after:content-none',
      }"
    >
      <template #icon="{ link, isActive }">
        <span
          :class="[
            'flex-shrink-0 size-8',
            isActive ? link.iconActive : link.icon,
            isActive ? 'bg-gradient-to-r from-primary-500 to-fuchsia-500 inline-block bg-clip-content' : 'text-gray-400 dark:text-gray-500 group-hover:text-gray-700 dark:group-hover:text-gray-200'
          ]"
        />
      </template>
    </UHorizontalNavigation>

    <UDropdown
      :items="[]"
      :ui="{ item: { disabled: 'cursor-text select-text' } }"
      :popper="{ placement: 'bottom-end' }"
    >
      <UAvatar
        icon="i-ph-user-duotone"
        size="lg"
      />
    </UDropdown>
  </header>
</template>
