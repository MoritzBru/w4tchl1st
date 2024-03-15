<script setup lang="ts">
import type {
  Media, MediaType,
} from '~/types';
import {
  TMDB_IMAGE_BASE_THUMB, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';

const props = defineProps<{
  type: MediaType;
  item: Media;
}>();

const toast = useToast();

const isLoading = ref(false);

const { addToWatchlist } = useTmdb();
async function add() {
  try {
    isLoading.value = true;
    const res = await addToWatchlist(props.type, props.item.id);
    if (res?.success) {
      toast.add({
        title: 'Successfully added to Watchlist',
        description: props.item.title || props.item.name,
        icon: 'i-ph-check-circle-duotone',
        color: 'green',
      });
    }
    else {
      toast.add({
        title: 'Could not add to Watchlist',
        description: res?.status_message,
        icon: 'i-ph-warning-duotone',
        color: 'red',
      });
    }
  }
  finally {
    isLoading.value = false;
  }
}

</script>

<template>
  <div class="w-64 flex flex-col items-center">
    <NuxtImg
      :src="`${TMDB_IMAGE_BASE_THUMB}${props.item.poster_path}`"
      :alt="props.item.title || props.item.name"
      :height="TMDB_THUMB_HEIGHT"
      :width="TMDB_THUMB_WIDTH"
      class="rounded-lg shadow bg-gray-200/50 dark:bg-gray-800/50 z-10"
    />
    <div class="w-full bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-white px-4 pt-16 pb-4 -mt-12 rounded-lg">
      <div class="text-base truncate">
        {{ props.item.title || props.item.name }}
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
          {{ formatVote(props.item.vote_average) }}
        </UBadge>
        <UBadge
          v-if="props.item.release_date || props.item.first_air_date"
          color="gray"
          variant="soft"
        >
          <UIcon
            name="i-ph-calendar-blank-duotone"
            class="text-secondary-500 mr-1"
          />
          {{ formatDate(new Date(props.item.release_date || props.item.first_air_date || '')) }}
        </UBadge>
      </div>
      <div class="flex flex-col sm:flex-row gap-2 justify-between items-start mt-3">
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
        />
      </div>
    </div>
  </div>
</template>
