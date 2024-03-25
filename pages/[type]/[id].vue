<script setup lang="ts">
import type {
  MediaDetails, MediaType,
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
const id = computed(() => route.params.id as string);

const { getDetails } = useTmdb();

const item = await getDetails(type.value, id.value) as MediaDetails;

if (!item) {
  showError({
    statusCode: 404,
    statusMessage: 'Item Not Found',
  });
}

useHead({
  title: item?.name || item?.title,
  meta: [
    {
      name: 'description',
      content: item?.overview,
    },
  ],
});
</script>

<template>
  <div>
    <DetailsHero :item="item" />
    <DetailsInfo
      :item="item"
      class="mt-8"
    />
    <template v-if="item?.credits?.cast.length">
      <SectionHeading class="px-10 mt-8">
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
      <SectionHeading class="px-10 mt-8">
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
      <SectionHeading class="px-10 mt-8">
        Recommendations
      </SectionHeading>
      <CarouselBase
        :items="item?.recommendations?.results || []"
      />
    </template>
  </div>
</template>
