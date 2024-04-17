<script setup lang="ts">
import type {
  Media, MediaType, Badge,
} from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  type?: MediaType;
  item: Media;
}>();

const itemTitle = getItemTitle(props.item);
const itemReleaseDate = new Date(props.item.release_date || props.item.first_air_date || NaN);
const type = getItemType(props.item);

const badges = computed<Badge[]>(() => [
  {
    label: formatVote(props.item.vote_average),
    icon: 'i-ph-star-duotone',
  },
  {
    label: isNaN(Number(itemReleaseDate)) ? 'unknown' : formatDate(itemReleaseDate),
    icon: 'i-ph-calendar-blank-duotone',
  },
]);

const imgSrc = props.item.poster_path ? `${TMDB_IMAGE_BASE_THUMB}${props.item.poster_path}` : `/placeholder/${type}.svg`;
</script>

<template>
  <div
    class="flex items-center flex-col sm:items-end sm:odd:flex-row sm:even:flex-row-reverse group"
  >
    <NuxtImg
      :src="imgSrc"
      :alt="itemTitle"
      :height="TMDB_THUMB_HEIGHT"
      :width="TMDB_THUMB_WIDTH"
      class="rounded-lg shadow sm:mb-6 bg-gray-200 dark:bg-gray-700 max-w-32 sm:max-w-full z-10"
    />
    <div class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6 w-full sm:w-auto max-sm:pt-16 max-sm:-mt-8 rounded-lg sm:group-even:-mr-8 sm:group-even:pr-16 sm:group-odd:pl-16 sm:group-odd:-ml-8">
      <h3 class="text-base flex items-center gap-2 justify-between">
        {{ itemTitle }}
        <UIcon
          :name="getItemIcon(props.item)"
          class="text-2xl opacity-50"
        />
      </h3>
      <p class="mt-3 text-sm font-thin max-w-prose line-clamp-2 sm:line-clamp-3 text-pretty">
        {{ props.item.overview }}
      </p>
      <BadgeList
        :badges="badges"
        class="mt-3 justify-between"
      />
      <div class="flex gap-2 justify-between items-start mt-3">
        <WatchlistButton
          :item="item"
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
