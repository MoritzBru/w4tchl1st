<script setup lang="ts">
import type { CreditDetails } from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  item: CreditDetails;
}>();

const imgSrc = props.item.profile_path ? `${TMDB_IMAGE_BASE_THUMB}${props.item.profile_path}` : '/placeholder/person.svg';
</script>

<template>
  <div
    class="w-64 flex flex-col items-center"
    draggable="false"
  >
    <NuxtImg
      :src="imgSrc"
      :alt="props.item.name"
      :height="TMDB_THUMB_HEIGHT"
      :width="TMDB_THUMB_WIDTH"
      class="rounded-full aspect-[1/1] object-cover object-[center_25%] shadow bg-gray-200 dark:bg-gray-700 z-10"
    />
    <div class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 pt-16 pb-4 -mt-12 rounded-lg">
      <h3 class="text-base font-bold truncate">
        {{ props.item.name }}
      </h3>
      <p class="text-sm truncate">
        {{ props.item.character || props.item.job || '&NonBreakingSpace;' }}
      </p>
    </div>
  </div>
</template>
