<script setup lang="ts">
import { TMDB_IMAGE_BASE_THUMB } from '~/constants/image';

const authStore = useAuthStore();
const { getAccount } = useTmdb();
const account = await getAccount(authStore.accountId);

const { colorMode, switchColorMode } = useColormode();
const { changeMovieWebBase } = useMovieWeb();

const items = [
  [
    {
      label: account?.username,
      disabled: true,
    },
  ],
  [
    {
      label: 'Toggle color mode',
      icon: 'i-ph-moon-stars-duotone',
      slot: 'colorMode',
      click: switchColorMode,
    },
    {
      label: 'Change Movie Web',
      icon: 'i-ph-film-strip-fill',
      click: changeMovieWebBase,
    },
  ],
  [
    ...conditionallyAddToArray(
      authStore.isAuthenticated,
      {
        label: 'Sign out',
        icon: 'i-ph-sign-out-duotone',
        click: async () => {
          await authStore.deleteAccessToken();
          navigateTo('/login');
        },
      },
      {
        label: 'Sign in',
        icon: 'i-ph-sign-in-duotone',
        click: () => {
          navigateTo('/login');
        },
      },
    ),
  ],
];
</script>

<template>
  <UDropdown
    :items="items"
    :ui="{
      trigger: 'items-center',
      width: 'w-64',
      item: { disabled: 'cursor-text select-text' },
    }"
    :popper="{ placement: 'bottom-end' }"
  >
    <UButton
      :padded="false"
      :ui="{ rounded: 'rounded-full' }"
    >
      <UAvatar
        icon="i-ph-user-duotone"
        size="md"
        :src="`${TMDB_IMAGE_BASE_THUMB}${account?.avatar?.tmdb?.avatar_path}`"
        :alt="account?.username"
      />
      <span class="sr-only">User Modal</span>
    </UButton>

    <template #colorMode="{ item }">
      <span :class="[item.icon, 'flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500']" />
      <span class="truncate">{{ item.label }}</span>
      <UBadge
        color="primary"
        variant="soft"
        class="ml-auto"
      >
        {{ colorMode.preference }}
      </UBadge>
    </template>
  </UDropdown>
</template>
