<script setup lang="ts">
definePageMeta({ layout: 'plain' });

useHead({ title: 'Login' });

const authStore = useAuthStore();

const route = useRoute();

if (!authStore.isAuthenticated && !('validated' in route.query)) {
  authStore.createRequestToken();
}

if (authStore.requestToken && ('validated' in route.query)) {
  authStore.createAccessToken();
}

watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    navigateTo('/', { replace: true });
  }
},
);
</script>

<template>
  <UContainer class="flex flex-col items-center justify-center py-8 min-h-dvh w-full">
    <IconW4tchl1st class="size-10" />
    <p class="text-base font-semibold text-gray-900 dark:text-white mt-2">
      w4tchl1st
    </p>
    <h1 class="text-3xl font-bold tracking-tight text-primary sm:text-5xl mt-4">
      Login
    </h1>
    <p class="mt-6 text-base/7 text-gray-500 dark:text-gray-400 text-center">
      Please Login/Register on TMDB and authorize the w4tchl1st app.
    </p>
    <div class="mt-10 flex items-center justify-center gap-x-6">
      <UButton
        size="xl"
        color="white"
        :to="authStore.validationUrl"
        external
      >
        <IconTmdbShort class="h-2 w-auto" />
        <span>
          Log in with TMDB
        </span>
      </UButton>
    </div>
  </UContainer>
</template>
