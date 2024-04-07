<script setup lang="ts">
import type {
  Media, MediaType,
} from '~/types';
definePageMeta({
  key: (route) => route.fullPath,
  validate: ({ params }) => {
    return [
      'movie',
      'tv',
    ].includes(params.type as MediaType);
  },
  middleware: 'auth',
});

const route = useRoute();
const type = computed(() => route.params.type as MediaType || 'movie');

useHead({ title: type.value === 'movie' ? 'Movies' : 'TV Shows' });

const { getWatchlist } = useTmdb();

const watchlist = ref<Media[]>([]);
let page = 0;
let total_pages = Infinity;
const isLoading = ref(false);

async function loadNext() {
  if (page >= total_pages || isLoading.value) return;
  try {
    isLoading.value = true;
    page += 1;
    const newPage = await getWatchlist(type.value, { page });
    total_pages = newPage?.total_pages || 0;
    watchlist.value.push(...(newPage?.results ?? []));
  }
  finally {
    isLoading.value = false;
  }
}

// initial load
loadNext();

// TODO: useInfiteScroll
const { arrivedState } = useScroll(document);

watch(() => arrivedState.bottom, () => {
  if (arrivedState.bottom) {
    loadNext();
  }
});

</script>

<template>
  <main class="mt-24">
    <UContainer>
      <SectionHeading>
        Watchlist {{ type }}
      </SectionHeading>
      <ListBase
        :type="type"
        :items="watchlist"
      />
      <UIcon
        v-if="isLoading"
        name="i-ph-circle-notch-duotone"
        class="block mt-8 size-12 mx-auto animate-spin"
      />
    </UContainer>
  </main>
</template>
