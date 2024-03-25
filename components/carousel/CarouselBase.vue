<script setup lang="ts" generic="T">
const props = defineProps<{
  items: T[];
}>();

defineSlots<{
  default(props: { item: T }): any;
}>();
</script>

<template>
  <UCarousel
    v-slot="{ item }"
    :items="props.items"
    :ui="{
      container: 'overscroll-x-contain gap-6 px-6 sm:px-12 mask-linear mask-dir-to-r mask-from-0 mask-via-100 mask-to-0  mask-point-via-[2rem_calc(100%-2rem)]',
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
    <slot v-bind="{ item }">
      <CarouselItem :item="item" />
    </slot>
  </UCarousel>
</template>
