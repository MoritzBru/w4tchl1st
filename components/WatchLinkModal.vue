<script setup lang="ts">
const isOpen = defineModel<boolean>();

const { watchLink, watchLinkReplacements } = useWatchLink();
</script>

<template>
  <UModal
    v-model="isOpen"
    :ui="{ container: 'items-center', width: 'sm:max-w-3xl' }"
  >
    <UCard :ui="{ ring: '' }">
      <template #header>
        <div class="flex items-center">
          <h3
            class="text-base font-semibold leading-6 text-gray-900 dark:text-white flex items-center"
          >
            Configure Watch Link
          </h3>
          <UPopover>
            <UButton
              color="gray"
              :ui="{ rounded: 'rounded-full' }"
              variant="link"
              square
              icon="i-ph-info-duotone"
            />
            <template #panel>
              <div class="p-4">
                <h4 class="font-semibold">
                  Watchlink replacements
                </h4>
                <ul class="font-mono">
                  <li
                    v-for="(item, idx) in watchLinkReplacements"
                    :key="idx"
                  >
                    {{ item }}
                  </li>
                </ul>
              </div>
            </template>
          </UPopover>
          <UButton
            class="ml-auto"
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
