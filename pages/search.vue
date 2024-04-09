<script setup lang="ts">
import type { Search } from '~/types';

definePageMeta({ middleware: 'auth' });

useHead({ title: 'Search' });

const term = ref('');

const results = ref<Search[]>([]);
let page = 0;
let total_pages = Infinity;
let total_results = 0;
const isLoading = ref(false);

function reset() {
  results.value = [];
  page = 0;
  total_pages = Infinity;
  total_results = 0;
  isLoading.value = false;
}

async function loadNext() {
  if (page >= total_pages || isLoading.value) return;
  try {
    isLoading.value = true;
    page += 1;
    const newPage = await search(term.value, { page });
    total_pages = newPage?.total_pages || 0;
    total_results = newPage?.total_results || 0;
    results.value.push(...(newPage?.results ?? []));
  }
  finally {
    isLoading.value = false;
  }
}
const debouncedLoad = useDebounceFn(loadNext, 300);

const { search } = useTmdb();

watch(
  () => term.value,
  () => {
    reset();
    debouncedLoad();
  },
);

// TODO: useInfiteScroll
const { arrivedState } = useScroll(document);

watch(() => arrivedState.bottom, () => {
  if (arrivedState.bottom && term.value) {
    loadNext();
  }
});
</script>

<template>
  <main class="mt-24">
    <UContainer>
      <UInput
        v-model="term"
        icon="i-ph-magnifying-glass-duotone"
        size="xl"
        color="white"
        :trailing="false"
        placeholder="Type to search..."
        autofocus
        autocomplete="off"
        :ui="{ icon: { trailing: { pointer: '' } } }"
        @keyup.enter="search"
      >
        <template #trailing>
          <UButton
            v-show="term !== ''"
            color="gray"
            variant="link"
            icon="i-ph-x"
            @click="term = ''"
          />
        </template>
      </UInput>
      <small
        v-show="term !== ''"
        class="mt-4 opacity-50"
      >
        {{ total_results }} results
      </small>
      <ListBase
        class="mt-12"
        :items="results"
      />
      <UIcon
        v-if="isLoading"
        name="i-ph-circle-notch-duotone"
        class="block mt-8 size-12 mx-auto animate-spin"
      />
    </UContainer>
  </main>
</template>
