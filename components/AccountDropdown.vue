<script setup lang="ts">
import { TMDB_IMAGE_BASE_ORIGINAL } from '~/constants/image';

const authStore = useAuthStore();
const { getAccount } = useTmdb();
const account = await getAccount(authStore.accountId);

// TODO extract to settings modal ===>
const colorMode = useColorMode();
const toast = useToast();

const colorModeOptions = [
  {
    preference: 'system',
    icon: 'i-ph-monitor-duotone',
  },
  {
    preference: 'dark',
    icon: 'i-ph-moon-duotone',
  },
  {
    preference: 'light',
    icon: 'i-ph-sun-duotone',
  },
];

const currentColorModeIdx = computed(() => colorModeOptions.findIndex((option) => option.preference === colorMode.preference));
const nextColorModeIdx = computed(() => (currentColorModeIdx.value + 1) % colorModeOptions.length);

function switchColorMode() {
  colorMode.preference = colorModeOptions[nextColorModeIdx.value].preference;
  toast.add({
    title: 'Colormode changed',
    description: colorMode.preference,
    icon: colorModeOptions[currentColorModeIdx.value].icon,
  });
}

// <===

const items = [
  [
    {
      label: account?.username || 'Guest',
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
      label: 'Change language',
      icon: 'i-ph-translate-duotone',
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
      item: { disabled: 'cursor-text select-text' }
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
        :src="`${TMDB_IMAGE_BASE_ORIGINAL}${account?.avatar?.tmdb?.avatar_path}`"
      />
    </UButton>

    <template #colorMode="{ item }">
      <span :class="[item.icon, 'flex-shrink-0 w-5 h-5 text-gray-400 dark:text-gray-500']" />
      <span class="truncate">{{ item.label }}</span>
      <UBadge
        color="primary"
        variant="soft"
        class="ml-auto"
      >
        {{ $colorMode.preference }}
      </UBadge>
    </template>
  </UDropdown>
</template>
