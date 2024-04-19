<script setup lang="ts">
import type { NuxtError } from '#app';

const props = defineProps<{
  error: NuxtError;
}>();

// Waiting for https://github.com/nuxt/ui/pull/1695
// const toast = useToast();
// toast.clear();

const handleError = () => clearError({ redirect: '/' });
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center py-8 min-h-dvh w-full">
    <IconW4tchl1st class="size-8" />
    <h1 class="text-8xl font-extrabold tracking-tight mt-12 bg-clip-text text-transparent bg-gradient-to-r from-primary-500 to-secondary-500">
      {{ props.error.statusCode }}
    </h1>
    <p class="text-3xl font-light mt-4">
      {{ props.error.statusMessage }}
    </p>
    <UButton
      class="mt-16"
      size="xl"
      color="primary"
      variant="soft"
      @click="handleError"
    >
      Start over on the home page
    </UButton>
  </UContainer>
</template>
