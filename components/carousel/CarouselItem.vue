<script setup lang="ts">
import type { Media, Badge } from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  item: Media;
}>();

const itemTitle = getItemTitle(props.item);
const itemReleaseDate = new Date(props.item.release_date || props.item.first_air_date || NaN);
const type = getItemType(props.item);

const badges: Badge[] = [
  {
    label: formatVote(props.item.vote_average),
    icon: 'i-ph-star-duotone',
  },
  {
    label: isNaN(Number(itemReleaseDate)) ? 'unknown' : formatDate(itemReleaseDate),
    icon: 'i-ph-calendar-blank-duotone',
  },
];

const imgSrc = props.item.poster_path ? `${TMDB_IMAGE_BASE_THUMB}${props.item.poster_path}` : `/placeholder/${type}.svg`;
</script>

<template>
  <div
    class="w-64 flex flex-col items-center"
    draggable="false"
  >
    <NuxtImg
      :src="imgSrc"
      :alt="itemTitle"
      :height="TMDB_THUMB_HEIGHT"
      :width="TMDB_THUMB_WIDTH"
      class="rounded-lg shadow bg-gray-200 dark:bg-gray-800 z-10"
    />
    <div class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 pt-16 pb-4 -mt-12 rounded-lg">
      <h3 class="text-base truncate">
        {{ itemTitle }}
      </h3>
      <BadgeList
        :badges="badges"
        class="mt-3 justify-between"
      />
      <div class="flex gap-2 justify-between items-start mt-3">
        <WatchlistButton
          :item="props.item"
          size="xs"
        />
        <UButton
          icon="i-ph-info-duotone"
          size="xs"
          color="primary"
          variant="soft"
          label="Details"
          :to="getItemUrl(props.item)"
        />
      </div>
    </div>
  </div>
</template>
