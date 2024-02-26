<script setup lang="ts">
import type {
  Media, MediaType,
} from '~/types';
import { TMDB_IMAGE_BASE_ORIGINAL } from '~/constants/image';

defineProps<{
  type: MediaType;
  item: Media;
}>();
</script>

<template>
  <div class="w-64 flex flex-col items-center">
    <NuxtImg
      :src="`${TMDB_IMAGE_BASE_ORIGINAL}${item.poster_path}`"
      :alt="item.title || item.name"
      height="256"
      class="h-64 rounded-lg shadow"
    />
    <div class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 pt-16 pb-4 -mt-12 rounded-lg -z-10">
      <div class="text-base truncate">
        {{ item.title || item.name }}
      </div>
      <div class="flex justify-between text-sm font-mono mt-3">
        <UBadge
          color="gray"
          variant="soft"
        >
          <UIcon
            name="i-ph-star-duotone"
            class="text-secondary-500 mr-1"
          />
          {{ formatVote(item.vote_average) }}
        </UBadge>
        <UBadge
          v-if="item.release_date || item.first_air_date"
          color="gray"
          variant="soft"
        >
          <UIcon
            name="i-ph-calendar-blank-duotone"
            class="text-secondary-500 mr-1"
          />
          {{ formatDate(new Date(item.release_date || item.first_air_date || '')) }}
        </UBadge>
      </div>
    </div>
  </div>
</template>
