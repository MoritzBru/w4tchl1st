<script setup lang="ts">
import type {
  Media, MediaType,
} from '~/types';

defineProps<{
  type: MediaType;
  items: Media[];
}>();
</script>

<template>
  <div class="flex flex-col gap-6">
    <ListItem
      v-for="(item, index) in items"
      :key="index"
      :item="item"
      :type="type"
    />
  </div>
</template>
