<script setup lang="ts">
import type { CreditDetails } from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  item: CreditDetails;
}>();
</script>

<template>
  <div
    class="w-64 flex flex-col items-center"
    draggable="false"
  >
    <NuxtImg
      v-if="props.item.profile_path"
      :src="`${TMDB_IMAGE_BASE_THUMB}${props.item.profile_path}`"
      :alt="props.item.name"
      :height="TMDB_THUMB_HEIGHT"
      :width="TMDB_THUMB_WIDTH"
      class="rounded-full aspect-[1/1] object-cover object-[center_25%] shadow bg-gray-200/50 dark:bg-gray-800/50 z-10"
      :class="{'saturate-50': !props.item.profile_path}"
    />
    <UAvatar
      v-else
      :alt="props.item.name"
      icon="i-ph-user-duotone"
      class="shadow"
      size="3xl"
      :ui="{
        background: 'bg-gray-200 dark:bg-gray-700',
        size: {
          '3xl': 'size-44'
        },
        icon: {
          size: {
            '3xl': 'size-28',
          },
        },
      }"
    />
    <div class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 pt-16 pb-4 -mt-12 rounded-lg">
      <p class="text-base font-bold truncate">
        {{ props.item.name }}
      </p>
      <p class="text-sm truncate">
        {{ props.item.character || props.item.job }}
      </p>
    </div>
  </div>
</template>
