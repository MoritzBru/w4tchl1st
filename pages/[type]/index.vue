<script setup lang="ts">
import { typeToTitleLookup } from '~/constants/ui';
import type { Media, MediaType } from '~/types';
import { GridBase, ListBase } from '#components';

definePageMeta({
  key: (route) => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv'].includes(params.type as MediaType);
  },
  middleware: 'auth',
  isWatchlist: true,
});

const route = useRoute();
const type = computed(() => route.params.type as MediaType || 'movie');

useHead({ title: typeToTitleLookup[type.value] });

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

const viewModesOptions = [
  {
    componentName: 'gridBase',
    label: 'Grid',
    icon: 'i-ph-grid-four-duotone',
  },
  {
    componentName: 'listBase',
    label: 'List',
    icon: 'i-ph-list-duotone',
  },
];

const components = {
  gridBase: markRaw(GridBase),
  listBase: markRaw(ListBase),
};

const selectedViewMode = useState('viewMode', () => viewModesOptions[0]);
</script>

<template>
  <main class="sm:mt-24">
    <UContainer>
      <header class="flex justify-between items-center flex-wrap py-4 mt-12">
        <SectionHeading class="!py-0 !mt-0">
          Watchlist {{ typeToTitleLookup[type] }}
        </SectionHeading>

        <UFormGroup
          label="View mode"
        >
          <USelectMenu
            v-model="selectedViewMode"
            :options="viewModesOptions"
            aria-label="View mode"
          >
            <template #leading>
              <UIcon
                :name="selectedViewMode.icon"
                class="size-5"
              />
            </template>
          </USelectMenu>
        </UFormGroup>
      </header>

      <Component
        :is="components[selectedViewMode.componentName as keyof typeof components]"
        :type="type"
        :items="watchlist"
      />
      <LoadingThrobber
        v-if="isLoading"
        class="mt-8"
      />
    </UContainer>
  </main>
</template>
