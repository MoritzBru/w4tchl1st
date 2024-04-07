<script setup lang="ts">
import type { Video } from '~/types';
import { YT_VIDEO_BASE, YT_VIDEO_PARAMS } from '~/constants/video';

const props = defineProps<{
  video: Video;
}>();

const isOpen = defineModel<boolean>();
</script>

<template>
  <UModal
    v-model="isOpen"
    :ui="{container: 'items-center', width: 'sm:max-w-3xl'}"
  >
    <UCard :ui="{ ring: '',body: { padding: 'p-0 sm:p-0' }, rounded: 'overflow-hidden' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            v-if="props.video.name"
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white"
          >
            {{ props.video.name }}
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-ph-x"
            @click="isOpen = false"
          />
        </div>
      </template>

      <iframe
        allow="autoplay; encrypted-media"
        allowfullscreen
        :src="`${YT_VIDEO_BASE}/${video.key}?${YT_VIDEO_PARAMS}`"
        class="w-full aspect-[16/9] object-cover"
      />
    </UCard>
  </UModal>
</template>
