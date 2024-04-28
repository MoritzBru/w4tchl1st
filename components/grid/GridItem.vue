<script setup lang="ts">
import type { Media } from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  item: Media;
}>();

const itemTitle = getItemTitle(props.item);
const type = getItemType(props.item);

const { defaultBadges } = useItemBadges(props.item);

const imgSrc = props.item.poster_path ? `${TMDB_IMAGE_BASE_THUMB}${props.item.poster_path}` : `/placeholder/${type}.svg`;
</script>

<template>
  <div
    class="w-64 flex flex-col items-center"
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
        class="rounded-lg shadow bg-gray-200 dark:bg-gray-800"
      />
    </NuxtLink>
    <div class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 pt-16 pb-4 -mt-12 rounded-lg">
      <h3 class="text-base truncate">
        {{ itemTitle }}
      </h3>
      <BadgeList
        :badges="defaultBadges"
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
