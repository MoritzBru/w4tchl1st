<script setup lang="ts">
import type { Media, MediaDetails } from '~/types';

const props = defineProps<{
  item: Media | MediaDetails;
  size?: '2xs' | 'xs' | 'sm' | 'md' | 'lg' | 'xl'; // ButtonSize: https://ui.nuxt.com/components/button#props
}>();

const { isLoading, isOnWatchlist, remove, add } = useWatchlistItem(props.item);
</script>

<template>
  <div>
    <UButton
      v-if="isOnWatchlist"
      icon="i-ph-trash-duotone"
      label="Remove"
      variant="soft"
      color="orange"
      :size="props.size"
      :loading="isLoading"
      @click="remove"
    />
    <UButton
      v-else
      icon="i-ph-list-plus-duotone"
      label="Add"
      variant="soft"
      color="emerald"
      :size="props.size"
      :loading="isLoading"
      @click="add"
    />
  </div>
</template>
