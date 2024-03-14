<script setup lang="ts">
import type {
  Media, MediaType,
} from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  type: MediaType;
  item: Media;
}>();

const badgeList = computed(() => [
  {
    label: formatVote(props.item.vote_average),
    icon: 'i-ph-star-duotone',
  },
  ...conditionallyAddToArray(
    Boolean(props.item.release_date || props.item.first_air_date),
    {
      label: formatDate(new Date(props.item.release_date || props.item.first_air_date || '')),
      icon: 'i-ph-calendar-blank-duotone',
    },
  ),
]);

</script>

<template>
  <div class="flex items-center flex-col sm:items-end sm:odd:flex-row sm:even:flex-row-reverse group">
    <NuxtImg
      :src="`${TMDB_IMAGE_BASE_THUMB}${item.poster_path}`"
      :alt="item.title || item.name"
      :height="TMDB_THUMB_HEIGHT"
      :width="TMDB_THUMB_WIDTH"
      class="rounded-lg shadow sm:mb-6 bg-gray-200/50 dark:bg-gray-700/50 max-w-32 sm:max-w-full"
    />
    <div class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6 max-sm:pt-16 max-sm:-mt-8 -z-10 rounded-lg sm:group-even:-mr-8 sm:group-even:pr-16 sm:group-odd:pl-16 sm:group-odd:-ml-8">
      <div class="text-base">
        {{ item.title || item.name }}
      </div>
      <div class="text-sm font-thin max-w-prose line-clamp-2 sm:line-clamp-3 text-pretty">
        {{ item.overview }}
      </div>
      <div class="flex gap-2 justify-between items-start text-sm font-mono mt-3">
        <UBadge
          v-for="(badge, index) in badgeList"
          :key="index"
          color="gray"
          variant="soft"
        >
          <UIcon
            :name="badge.icon"
            class="text-secondary-500 mr-1"
          />
          {{ badge.label }}
        </UBadge>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 justify-between items-start mt-3">
        <!-- <UButton
          icon="i-ph-trash-duotone"
          size="xs"
          color="primary"
          variant="outline"
          label="Remove"
        /> -->
      </div>
    </div>
  </div>
</template>
