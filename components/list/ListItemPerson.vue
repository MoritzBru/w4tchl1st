<script setup lang="ts">
import type {
  Person,
} from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  item: Person;
}>();

const imgSrc = props.item.profile_path ? `${TMDB_IMAGE_BASE_THUMB}${props.item.profile_path}` : '/placeholder/person.svg';
</script>

<template>
  <div
    class="flex items-center flex-col sm:items-end sm:odd:flex-row sm:even:flex-row-reverse group"
  >
    <NuxtImg
      :src="imgSrc"
      :alt="item.name"
      :height="TMDB_THUMB_HEIGHT"
      :width="TMDB_THUMB_WIDTH"
      class="rounded-lg shadow sm:mb-6 bg-gray-200 dark:bg-gray-700 max-w-32 sm:max-w-full z-10"
    />
    <div class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6 w-full sm:w-auto max-sm:pt-16 max-sm:-mt-8 rounded-lg sm:group-even:-mr-8 sm:group-even:pr-16 sm:group-odd:pl-16 sm:group-odd:-ml-8">
      <h3 class="text-base flex items-center gap-2 justify-between">
        {{ item.name }}
        <UIcon
          name="i-ph-user-duotone"
          class="text-2xl opacity-50"
        />
      </h3>
      <p class="text-sm font-thin max-w-prose line-clamp-2 sm:line-clamp-3 text-pretty">
        {{ props.item.known_for_department }}
      </p>
      <div
        v-if="props.item.known_for?.length"
        class="flex flex-wrap gap-2 mt-2"
      >
        <UButton
          v-for="(knownFor) in props.item.known_for"
          :key="knownFor.id"
          :label="getItemTitle(knownFor)"
          :icon="getItemIcon(knownFor)"
          :to="getItemUrl(knownFor)"
          size="xs"
          variant="soft"
        />
      </div>
    </div>
  </div>
</template>
