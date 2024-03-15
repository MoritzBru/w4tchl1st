<script setup lang="ts">
import type {
  Media, MediaType,
} from '~/types';

const props = defineProps<{
  type: MediaType;
  items: Media[];
}>();
</script>

<template>
  <UCarousel
    v-slot="{ item }: { item: Media }"
    :items="props.items"
    :ui="{
      container: 'border-fade overscroll-x-contain gap-6 px-6 sm:px-12',
    }"
    :prev-button="{
      color: 'gray',
      icon: 'i-ph-caret-left-duotone',
      class: 'disabled:opacity-30',
    }"
    :next-button="{
      color: 'gray',
      icon: 'i-ph-caret-right-duotone',
      class: 'disabled:opacity-30',
    }"
    class="mx-auto overflow-hidden"
    arrows
  >
    <CarouselItem
      :item="item"
      :type="props.type"
      draggable="false"
    />
  </UCarousel>
</template>

<style>
.border-fade {
  mask-image: linear-gradient(to right, transparent, white 2rem calc(100% - 2rem), transparent);
}
</style>
