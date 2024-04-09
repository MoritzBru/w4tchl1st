<script setup lang="ts">
import type { Search, Media, Person, MediaType } from '~/types';

const props = defineProps<{
  type?: MediaType;
  items: Search[];
}>();
</script>

<template>
  <div class="flex flex-col gap-6">
    <template
      v-for="(item, index) in props.items"
      :key="index"
    >
      <ListItemPerson
        v-if="item.media_type === 'person'"
        :item="item as Person"
      />
      <ListItem
        v-else
        :item="item as Media"
        :type="props.type"
      />
    </template>
  </div>
</template>
