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
  <UCarousel
    v-slot="{ item }: { item: Media }"
    :items="items"
    :ui="{
      container: 'border-fade overscroll-contain gap-6 px-6 sm:px-12',
    }"
    :prev-button="{
      color: 'gray',
      icon: 'i-ph-caret-left-duotone',
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-ph-caret-right-duotone',
    }"
    class="mx-auto overflow-hidden"
    arrows
  >
    <CarouselItem
      :item="item"
      :type="type"
      draggable="false"
    />
  </UCarousel>
</template>

<style>
.border-fade {
  mask-image: linear-gradient(to right, transparent, white 10% 90%, transparent);
}
</style>
