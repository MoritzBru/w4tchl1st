<script setup lang="ts">
import type {
  Media, MediaType,
} from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  type?: MediaType;
  item: Media;
}>();

const itemTitle = getItemTitle(props.item);
const type = getItemType(props.item);

const { defaultBadges } = useItemBadges(props.item);

const { getMappedGenres } = useGenres();
const genres = getMappedGenres(props.item.genre_ids, type);

const imgSrc = props.item.poster_path ? `${TMDB_IMAGE_BASE_THUMB}${props.item.poster_path}` : `/placeholder/${type}.svg`;
</script>

<template>
  <div
    class="flex items-center flex-col sm:items-end sm:odd:flex-row sm:even:flex-row-reverse group"
  >
    <NuxtLink
      :to="getItemUrl($props.item)"
      class="z-10 hover:scale-95 transition-transform"
    >
      <NuxtImg
        :src="imgSrc"
        :alt="itemTitle"
        :height="TMDB_THUMB_HEIGHT"
        :width="TMDB_THUMB_WIDTH"
        class="rounded-lg shadow sm:mb-6 bg-gray-200 dark:bg-gray-700 max-w-32 sm:max-w-full"
      />
    </NuxtLink>
    <div class="bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white p-6 w-full sm:w-auto max-sm:pt-16 max-sm:-mt-8 rounded-lg sm:group-even:-mr-8 sm:group-even:pr-16 sm:group-odd:pl-16 sm:group-odd:-ml-8">
      <h3 class="text-base flex items-center gap-2 justify-between">
        {{ itemTitle }}
        <UIcon
          :name="getItemIcon(props.item)"
          class="text-3xl opacity-50"
        />
      </h3>
      <p class="text-xs truncate opacity-75 mt-2">
        {{ genres.map(({ name }) => name).join(', ') }}
      </p>
      <p class="mt-3 text-sm font-thin max-w-prose line-clamp-2 sm:line-clamp-3 text-pretty">
        {{ props.item.overview }}
      </p>
      <BadgeList
        :badges="defaultBadges"
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
