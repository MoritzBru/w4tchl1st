<template>
  <div class="app-grid grid grid-rows-[auto_1fr] h-full">
    <AppHeader class="order-last sm:order-none" />
    <div class="app-page overflow-x-hidden overflow-y-auto relative">
      <NuxtPage />
      <AppFooter />
    </div>
  </div>
</template>
