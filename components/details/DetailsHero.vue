<script setup lang="ts">
import { YoutubeModal } from '#components';
import type {
  MediaDetails, Badge,
} from '~/types';
import {
  TMDB_IMAGE_BASE_BACKDROP, TMDB_BACKDROP_WIDTH, TMDB_BACKDROP_HEIGHT,
} from '~/constants/image';

const props = defineProps<{
  item: MediaDetails;
}>();

const modal = useModal();

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
        :src="`${TMDB_IMAGE_BASE_BACKDROP}${props.item.backdrop_path}`"
        :height="TMDB_BACKDROP_HEIGHT"
        :width="TMDB_BACKDROP_WIDTH"
        alt=""
        class="bg-gray-200/50 dark:bg-gray-800/50 h-full w-full object-cover mask-linear mask-dir-to-t sm:mask-dir-to-r mask-from-0 mask-to-100"
      />
    </div>
    <div class="absolute left-0 bottom-0 sm:top-0 p-8 sm:p-12 sm:w-2/3 w-full">
      <div class="flex flex-col gap-4 items-start w-full">
        <h1 class="text-3xl sm:text-4xl line-clamp-2">
          {{ props.item.title || props.item.name }}
        </h1>
        <BadgeList :badges="badges" />
        <p
          v-if="props.item.tagline"
          class="text-xl font-light tracking-wide line-clamp-1"
        >
          {{ props.item?.tagline }}
        </p>
        <UButton
          v-if="trailer"
          icon="i-ph-play-duotone"
          variant="soft"
          size="md"
          @click="openTrailerModal"
        >
          Trailer
        </UButton>
      </div>
    </div>
  </div>
</template>
