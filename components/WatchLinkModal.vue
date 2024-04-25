<script setup lang="ts">
const isOpen = defineModel<boolean>();

const { watchLink } = useWatchLink();
</script>

<template>
  <UModal
    v-model="isOpen"
    :ui="{ container: 'items-center', width: 'sm:max-w-3xl' }"
  >
    <UCard :ui="{ ring: '' }">
      <template #header>
        <div class="flex items-center justify-between">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white flex items-center"
          >
            Configure Watch Link
          </h3>
          <UButton
            color="gray"
            variant="ghost"
            icon="i-ph-x"
            @click="isOpen = false"
          />
        </div>
      </template>

      <UInput v-model="watchLink" />
    </UCard>
  </UModal>
</template>
