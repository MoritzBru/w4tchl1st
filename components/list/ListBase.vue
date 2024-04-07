<script setup lang="ts">
import type { Media, MediaType } from '~/types';

const props = defineProps<{
  type: MediaType;
  items: Media[];
}>();
</script>

<template>
  <div class="flex flex-col gap-6">
    <ListItem
      v-for="(item, index) in props.items"
      :key="index"
      :item="item"
      :type="props.type"
    />
  </div>
</template>
