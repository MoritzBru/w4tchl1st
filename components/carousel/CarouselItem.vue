<script setup lang="ts">
import type { Media, Badge } from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  item: Media;
}>();

const type = props.item.media_type || 'movie';
const itemTitle = props.item.title || props.item.name;
const itemReleaseDate = new Date(props.item.release_date || props.item.first_air_date || NaN);

const toast = useToast();

const isLoading = ref(false);

const { addToWatchlist } = useTmdb();
async function add() {
  try {
    isLoading.value = true;
    await addToWatchlist(type, props.item.id);
    toast.add({
      title: 'Successfully added to Watchlist',
      description: itemTitle,
      icon: 'i-ph-check-circle-duotone',
      color: 'green',
    });
  }
  catch (err) {
    toast.add({
      title: 'Could not add to Watchlist',
      description: itemTitle,
      icon: 'i-ph-warning-duotone',
      color: 'red',
    });
  }
  finally {
    isLoading.value = false;
  }
}

const badges: Badge[] = [
  {
    label: formatVote(props.item.vote_average),
    icon: 'i-ph-star-duotone',
  },
  {
    label: formatDate(itemReleaseDate),
    icon: 'i-ph-calendar-blank-duotone',
  },
];

</script>

<template>
  <div
    class="w-64 flex flex-col items-center"
    draggable="false"
  >
    <NuxtImg
      :src="`${TMDB_IMAGE_BASE_THUMB}${props.item.poster_path}`"
      :alt="itemTitle"
      :height="TMDB_THUMB_HEIGHT"
      :width="TMDB_THUMB_WIDTH"
      class="rounded-lg shadow bg-gray-200/50 dark:bg-gray-800/50 z-10"
    />
    <div class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 pt-16 pb-4 -mt-12 rounded-lg">
      <div class="text-base truncate">
        {{ itemTitle }}
      </div>
      <BadgeList
        :badges="badges"
        class="mt-3 justify-between"
      />
      <div class="flex gap-2 justify-between items-start mt-3">
        <UButton
          icon="i-ph-list-plus-duotone"
          size="xs"
          color="primary"
          variant="outline"
          label="Add"
          :loading="isLoading"
          @click="add"
        />
        <UButton
          icon="i-ph-eye-duotone"
          size="xs"
          color="primary"
          variant="outline"
          label="Details"
          :to="`/${type}/${props.item.id}`"
        />
      </div>
    </div>
  </div>
</template>
