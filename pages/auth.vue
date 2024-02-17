<script setup lang="ts">
useHead({
  title: 'Auth',
});

const authStore = useAuthStore();

const route = useRoute();

if (!authStore.isAuthenticated && !authStore.requestToken) {
  authStore.createRequestToken();
}

if (authStore.requestToken && Object.hasOwn(route.query, 'validated')) {
  authStore.createAccessToken();
}

watch(() => authStore.isAuthenticated, (isAuthenticated) => {
  if (isAuthenticated) {
    navigateTo('/');
  }
}, { immediate: true },
);

</script>

<template>
  <main class="container p-4 mx-auto">
    <h1>Authenticate</h1>
    <UButton
      :to="authStore.validationUrl"
    >
      Go to TMDb to authenticate
    </UButton>
  </main>
</template>
