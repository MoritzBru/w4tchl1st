<script setup lang="ts">
import type { MediaDetails, MediaType } from '~/types';

definePageMeta({
  key: (route) => route.fullPath,
  validate: ({ params }) => {
    return ['movie', 'tv'].includes(params.type as MediaType);
  },
  middleware: 'auth',
});

const route = useRoute();
const type = computed(() => route.params.type as MediaType || 'movie');
const id = computed(() => route.params.id as string);

const { getDetails } = useTmdb();

let item: MediaDetails;

try {
  item = await getDetails(type.value, id.value) as MediaDetails;

  useHead({
    title: getItemTitle(item),
    meta: [
      {
        name: 'description',
        content: item?.overview,
      },
    ],
  });
}
catch {
  throw createError({
    statusCode: 404,
    statusMessage: 'Item Not Found',
    fatal: true,
  });
}
</script>

<template>
  <article>
    <DetailsHero
      :item="item"
      :type="type"
    />

    <DetailsInfo
      :item="item"
      class="mt-8"
    />

    <UContainer class="px-0">
      <template v-if="item?.credits?.cast.length">
        <SectionHeading class="max-sm:px-4">
          Cast
        </SectionHeading>
        <CarouselBase
          v-slot="carouselProps"
          :items="item?.credits?.cast || []"
        >
          <CarouselPerson :item="carouselProps.item" />
        </CarouselBase>
      </template>

      <template v-if="item?.credits?.crew">
        <SectionHeading class="max-sm:px-4">
          Crew
        </SectionHeading>
        <CarouselBase
          v-slot="carouselProps"
          :items="item?.credits?.crew || []"
        >
          <CarouselPerson :item="carouselProps.item" />
        </CarouselBase>
      </template>

      <template v-if="item?.recommendations?.results">
        <SectionHeading class="max-sm:px-4">
          Recommendations
        </SectionHeading>
        <CarouselBase
          :items="item?.recommendations?.results || []"
        />
      </template>
    </UContainer>
  </article>
</template>
