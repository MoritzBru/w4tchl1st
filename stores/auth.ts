import { useLocalStorage } from '@vueuse/core';
import type { RequestTokenV4, AccessTokenV4 } from '~/types';
import { TMDB_AUTH_ACCESS_URL } from '~/constants/auth';

export const useAuthStore = defineStore('auth', () => {
  const requestToken = useLocalStorage('wl-requestToken', '');
  const accessToken = useLocalStorage('wl-accessToken', '');
  const accountId = useLocalStorage('wl-accountId', '');

  const validationUrl = computed(() => {
    if (!requestToken.value) {
      return '';
    }
    return `${TMDB_AUTH_ACCESS_URL}${requestToken.value}`;
  });

  const isAuthenticated = computed(() => Boolean(accessToken.value && accountId.value));

  const runtimeConfig = useRuntimeConfig();

  const defaultParams = {
    baseURL: runtimeConfig.public.tmdbBaseUrl,
    headers: { Authorization: `Bearer ${runtimeConfig.public.tmdbToken}` },
    method: 'POST' as const,
  };

  async function createRequestToken() {
    const params = {
      ...defaultParams,
      body: { redirect_to: `${runtimeConfig.public.baseUrl}/login?validated` },
    };
    const response = await $fetch<RequestTokenV4>('/4/auth/request_token', params);
    if (response?.success) {
      requestToken.value = response.request_token;
    }
    return response;
  }

  async function createAccessToken() {
    const params = {
      ...defaultParams,
      body: { request_token: requestToken.value },
    };
    const response = await $fetch<AccessTokenV4>('/4/auth/access_token', params);
    if (response?.success) {
      requestToken.value = '';
      accessToken.value = response.access_token;
      accountId.value = response.account_id;
      navigateTo('/login');
    }
  }

  async function deleteAccessToken() {
    const params = {
      ...defaultParams,
      method: 'DELETE' as const,
      body: { access_token: accessToken.value },
    };
    const response = await $fetch<AccessTokenV4>('/4/auth/access_token', params);
    if (response?.success) {
      requestToken.value = '';
      accessToken.value = '';
      accountId.value = '';
    }
  }

  return {
    requestToken,
    accessToken,
    accountId,
    validationUrl,
    isAuthenticated,
    createRequestToken,
    createAccessToken,
    deleteAccessToken,
  };
});
