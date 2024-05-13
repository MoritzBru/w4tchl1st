<script setup lang="ts">
const { $pwa } = useNuxtApp();

useHead({
  htmlAttrs: { lang: 'en' },
  link: [
    {
      rel: 'preconnect',
      href: 'https://image.tmdb.org',
      crossorigin: 'anonymous',
    },
    {
      rel: 'preconnect',
      href: 'https://api.themoviedb.org',
      crossorigin: 'anonymous',
    },
    {
      rel: 'icon',
      type: 'image/svg+xml',
      sizes: 'any',
      href: '/favicon.svg',
      tagPriority: 'low',
    },
    {
      rel: 'apple-touch-icon',
      sizes: '180x180',
      href: '/apple-touch-icon.png',
      tagPriority: 'low',
    },
    {
      rel: 'mask-icon',
      color: '#6366f1',
      href: '/mask-icon.svg',
      tagPriority: 'low',
    },
  ],
  meta: [
    { charset: 'utf-8' },
    { name: 'viewport', content: 'width=device-width, initial-scale=1' },
  ],
});

const runtimeConfig = useRuntimeConfig();

useSeoMeta({
  titleTemplate: (title) => title ? `${title} · w4tchl1st` : 'w4tchl1st',
  description: 'A w4tchl1st based on TMDB.',
  themeColor: '#6366f1',
  ogTitle: 'w4tchl1st',
  ogDescription: 'A w4tchl1st based on TMDB.',
  ogType: 'website',
  ogUrl: runtimeConfig.public.baseUrl,
  ogImage: new URL('/og.png', runtimeConfig.public.baseUrl).toString(),
  twitterCard: 'summary_large_image',
});

const toast = useToast();

onMounted(() => {
  if ($pwa?.showInstallPrompt && !$pwa?.offlineReady && !$pwa?.needRefresh) {
    toast.add({
      title: 'Install',
      description: 'App is ready to be installed as PWA.',
      actions: [
        { label: 'Install', click: $pwa.install, variant: 'solid', color: 'primary' },
        { label: 'Close', click: $pwa.cancelInstall, variant: 'outline', color: 'secondary' },
      ],
      timeout: 0,
    });
  }
});

watch(
  () => $pwa?.needRefresh,
  () => {
    if ($pwa?.needRefresh) {
      toast.add({
        title: 'Refresh',
        description: 'New content available, click on reload button to update.',
        actions: [
          { label: 'Reload', click: $pwa?.updateServiceWorker, variant: 'solid', color: 'primary' },
        ],
        timeout: 0,
      });
    }
  },
);
</script>

<template>
  <NuxtPwaAssets />
  <NuxtLoadingIndicator color="repeating-linear-gradient(to right, #6366f1, #c026d3)" />
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <UModals />
  <UNotifications />
</template>

<style>
html, body, #__nuxt {
  margin: 0;
  padding: 0;
}

body {
  overflow-y: scroll;
}
</style>
