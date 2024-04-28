<script setup lang="ts">
import type { Badge } from '~/types';

const props = defineProps<{
  badges: Badge[];
}>();
</script>

<template>
  <div class="flex gap-2 text-sm font-mono">
    <UBadge
      v-for="(badge, index) in props.badges"
      :key="index"
      color="gray"
      variant="soft"
      :ui="{ rounded: 'rounded-full' }"
    >
      <UIcon
        v-if="badge.icon"
        :name="badge.icon"
        :class="['mr-1', badge?.iconClass]"
      />
      {{ badge.label }}
    </UBadge>
  </div>
</template>
