<script setup lang="ts">
import type { MediaType } from '~/types';

definePageMeta({
  key: route => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv'].includes(params.type as MediaType);
  },
  middleware: 'auth',
});

const route = useRoute();
const type = computed(() => route.params.type || 'movie');

useHead({
  title: type.value === 'movie' ? 'Movies' : 'TV Shows',
});

</script>

<template>
  <h1>{{ type }}</h1>
</template>
