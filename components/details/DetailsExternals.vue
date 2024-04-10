<script setup lang="ts">
import type { ExternalIds } from '~/types';

const props = defineProps<{
  externalIds?: ExternalIds;
  homepage?: string;
}>();

const links = [
  ...conditionallyAddToArray(
    Boolean(props.homepage),
    {
      icon: 'i-ph-globe-duotone',
      label: 'Homepage',
      url: props.homepage,
    },
  ),
  // TOOD: add TMDB
  ...conditionallyAddToArray(
    Boolean(props.externalIds?.imdb_id),
    {
      icon: 'i-bx-bxl-imdb',
      label: 'IMDB',
      url: `https://www.imdb.com/${props.externalIds?.imdb_id?.startsWith('nm') ? 'name' : 'title'}/${props.externalIds?.imdb_id}`,
    },
  ),
  ...conditionallyAddToArray(
    Boolean(props.externalIds?.wikidata_id),
    {
      icon: 'i-bx-bxs-barcode',
      label: 'Wikidata',
      url: `https://www.wikidata.org/wiki/${props.externalIds?.wikidata_id}`,
    },
  ),
  ...conditionallyAddToArray(
    Boolean(props.externalIds?.twitter_id),
    {
      icon: 'i-bx-bxl-twitter',
      label: 'Twitter',
      url: `https://twitter.com/${props.externalIds?.twitter_id}`,
    },
  ),
  ...conditionallyAddToArray(
    Boolean(props.externalIds?.facebook_id),
    {
      icon: 'i-bx-bxl-facebook-square',
      label: 'Facebook',
      url: `https://www.facebook.com/${props.externalIds?.facebook_id}`,
    },
  ),
  ...conditionallyAddToArray(
    Boolean(props.externalIds?.instagram_id),
    {
      icon: 'i-bx-bxl-instagram',
      label: 'Instagram',
      url: `https://instagram.com/${props.externalIds?.instagram_id}`,
    },
  ),
];
</script>

<template>
  <div class="flex flex-wrap items-center gap-2">
    <UButton
      v-for="link in links"
      :key="link.url"
      :icon="link.icon"
      :to="link.url"
      :label="link.label"
      target="_blank"
      variant="ghost"
      color="gray"
      external
    />
  </div>
</template>
