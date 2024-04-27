<script setup lang="ts">
import type { Media, MediaType } from '~/types';

const props = defineProps<{
  type?: MediaType;
  items: Media[];
}>();
</script>

<template>
  <div class="flex flex-wrap justify-center gap-4">
    <template
      v-for="(item, index) in props.items"
      :key="index"
    >
      <GridItem :item="item" />
    </template>
  </div>
</template>
