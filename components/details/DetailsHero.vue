<script setup lang="ts">
import { YoutubeModal } from '#components';
import type {
  MediaDetails, Badge, MediaType,
} from '~/types';
import {
  TMDB_IMAGE_BASE_BACKDROP, TMDB_BACKDROP_WIDTH, TMDB_BACKDROP_HEIGHT,
} from '~/constants/image';

const props = defineProps<{
  item: MediaDetails;
  type: MediaType;
}>();

const modal = useModal();

const { getWatchUrl } = useWatchLink();

const trailer = props.item.videos?.results?.find((video) => video.type === 'Trailer' && video.site === 'YouTube');

function openTrailerModal() {
  if (!trailer) return;
  modal.open(YoutubeModal, { video: trailer });
}

const badges: Badge[] = [
  {
    label: formatVote(props.item.vote_average),
    icon: 'i-ph-star-duotone',
  },
  {
    label: `${formatVote(props.item.vote_count)} Votes`,
    icon: 'i-ph-users-duotone',
  },
];
</script>

<template>
  <div class="relative w-full aspect-[3/2] sm:aspect-[24/9]">
    <div class="absolute top-0 right-0 sm:left-1/3">
      <NuxtImg
        v-if="props.item.backdrop_path"
        :src="`${TMDB_IMAGE_BASE_BACKDROP}${props.item.backdrop_path}`"
        :height="TMDB_BACKDROP_HEIGHT"
        :width="TMDB_BACKDROP_WIDTH"
        alt=""
        class="bg-gray-200 dark:bg-gray-800 h-full w-full object-cover mask-linear mask-dir-to-t sm:mask-dir-to-r mask-from-0 mask-to-100"
      />
    </div>
    <div class="absolute left-0 top-0 p-8 sm:p-12 sm:w-2/3 w-full">
      <header class="flex flex-col gap-4 items-start w-full">
        <h1 class="text-3xl sm:text-4xl line-clamp-2 text-shadow shadow-white dark:shadow-black">
          {{ props.item.title || props.item.name }}
        </h1>
        <BadgeList :badges="badges" />
        <p
          v-if="props.item.tagline"
          class="text-xl font-light tracking-wide line-clamp-1"
        >
          {{ props.item?.tagline }}
        </p>
        <div class="flex flex-wrap gap-3">
          <WatchlistButton
            :item="props.item"
            size="md"
          />
          <UButton
            v-if="trailer"
            icon="i-ph-youtube-logo-duotone"
            label="Trailer"
            variant="soft"
            size="md"
            @click="openTrailerModal"
          />
          <UButton
            v-if="getWatchUrl(item, type)"
            icon="i-ph-play-duotone"
            label="Watch"
            variant="soft"
            color="secondary"
            size="md"
            :to="getWatchUrl(item, type)"
            external
            target="_blank"
          />
        </div>
      </header>
    </div>
  </div>
</template>
