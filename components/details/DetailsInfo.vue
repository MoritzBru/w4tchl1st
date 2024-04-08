<script setup lang="ts">
import {
  TMDB_IMAGE_BASE_ORIGINAL, TMDB_THUMB_HEIGHT, TMDB_THUMB_WIDTH,
} from '~/constants/image';
import type { MediaDetails } from '~/types';

const props = defineProps<{
  item: MediaDetails;
}>();

const details = [
  {
    label: 'Genres',
    value: props.item.genres?.map((g) => g.name).join(', '),
  },
  ...conditionallyAddToArray(
    Boolean(props.item.runtime || props.item.episode_run_time?.[0]),
    {
      label: 'Runtime',
      value: formatTime(props.item.runtime || props.item.episode_run_time?.[0] || NaN),
    },
  ),
  {
    label: 'Release Date',
    value: formatDate(new Date(props.item.release_date || props.item.first_air_date || NaN)),
  },
  ...conditionallyAddToArray(
    Boolean(props.item.budget),
    {
      label: 'Budget',
      value: formatCurrency(props.item.budget || NaN),
    },
  ),
  ...conditionallyAddToArray(
    Boolean(props.item.revenue),
    {
      label: 'Revenue',
      value: formatCurrency(props.item.revenue || NaN),
    },
  ),
  ...conditionallyAddToArray(
    Boolean(props.item.number_of_seasons),
    {
      label: 'Number of seasons',
      value: props.item.number_of_seasons,
    },
  ),
  ...conditionallyAddToArray(
    Boolean(props.item.number_of_episodes),
    {
      label: 'Number of episodes',
      value: props.item.number_of_episodes,
    },
  ),
  {
    label: 'Languages',
    value: props.item.spoken_languages?.map((l) => l.name).join(', '),
  },
  {
    label: 'Production',
    value: props.item.production_companies?.map((p) => p.name).join(', '),
  },
];
</script>

<template>
  <UContainer class="flex flex-col sm:flex-row items-center sm:items-start gap-4">
    <NuxtImg
      :src="`${TMDB_IMAGE_BASE_ORIGINAL}${props.item.poster_path}`"
      :alt="getItemTitle($props.item)"
      :height="TMDB_THUMB_HEIGHT"
      :width="TMDB_THUMB_WIDTH"
      class="rounded-lg shadow bg-gray-200/50 dark:bg-gray-800/50 w-64"
    />

    <div class="text-gray-700 dark:text-gray-200 p-2">
      <p class="text-pretty">
        {{ props.item.overview }}
      </p>

      <dl class="mt-4 grid grid-cols-[max-content_1fr] gap-x-4 gap-y-2">
        <template
          v-for="(detail, index) in details"
          :key="index"
        >
          <dt class="font-medium">
            {{ detail.label }}
          </dt>
          <dd class="tabular-nums slashed-zero font-light">
            {{ detail.value }}
          </dd>
        </template>
      </dl>
      <DetailsExternals
        class="mt-4"
        :homepage="props.item.homepage"
        :external-ids="props.item.external_ids"
      />
    </div>
  </UContainer>
</template>
