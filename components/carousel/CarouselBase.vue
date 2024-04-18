<script setup lang="ts" generic="T">
const props = defineProps<{
  items: T[];
}>();

defineSlots<{
  default(props: { item: T }): unknown;
}>();
</script>

<template>
  <UCarousel
    :items="props.items"
    :ui="{
      container: 'overscroll-x-contain gap-6 px-6 sm:px-12 mask-linear mask-dir-to-r mask-from-0 mask-via-100 mask-to-0 mask-point-via-[3rem_calc(100%-3rem)] sm:mask-point-via-[5rem_calc(100%-5rem)]',
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
    <template #default="{ item }">
      <slot v-bind="{ item }">
        <CarouselItem :item="item" />
      </slot>
    </template>

    <template #prev="{ onClick, disabled }">
      <div class="absolute left-0 top-0 h-full w-12 sm:w-16 backdrop-blur mask-linear mask-dir-to-r mask-from-100 mask-to-0 z-10" />
      <UButton
        :disabled="disabled"
        color="gray"
        size="md"
        icon="i-ph-caret-left-duotone"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 rounded-full disabled:opacity-30 z-10"
        aria-label="Prev"
        @click="onClick"
      />
    </template>

    <template #next="{ onClick, disabled }">
      <div class="absolute right-0 top-0 h-full w-12 sm:w-16 backdrop-blur mask-linear mask-dir-to-r mask-from-0 mask-to-100 z-10" />
      <UButton
        :disabled="disabled"
        color="gray"
        size="md"
        icon="i-ph-caret-right-duotone"
        class="absolute right-4 top-1/2 transform -translate-y-1/2 rounded-full disabled:opacity-30 z-10"
        aria-label="Next"
        @click="onClick"
      />
    </template>
  </UCarousel>
</template>
