<script setup lang="ts">
import { TMDB_IMAGE_BASE_THUMB } from '~/constants/image';

const { accountId, isAuthenticated, deleteAccessToken } = useAuth();
const { getAccount } = useTmdb();
const account = await getAccount(accountId.value);

const { colorMode, switchColorMode } = useColormode();
const { changeWatchLink } = useWatchLink();

const img = useImage();

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
      label: 'Change Watch Link',
      icon: 'i-ph-play-pause-duotone',
      click: changeWatchLink,
    },
  ],
  [
    ...conditionallyAddToArray(
      isAuthenticated.value,
      {
        label: 'Sign out',
        icon: 'i-ph-sign-out-duotone',
        click: async () => {
          await deleteAccessToken();
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
        :src="img(`${TMDB_IMAGE_BASE_THUMB}${account?.avatar?.tmdb?.avatar_path}`)"
        :alt="account?.username"
      />
      <span class="sr-only">User Modal</span>
    </UButton>

    <template #colorMode="{ item }">
      <span :class="[item.icon, 'flex-shrink-0 size-5 text-gray-400 dark:text-gray-500']" />
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
