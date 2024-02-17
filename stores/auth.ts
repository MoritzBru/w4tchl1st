import { useLocalStorage } from '@vueuse/core';

export const useAuthStore = defineStore('auth', () => {
  const requestToken = useLocalStorage('wl-requestToken', '');
  const accessToken = useLocalStorage('wl-accessToken', '');
  const accountId = useLocalStorage('wl-accountId', '');

  const validationUrl = computed(() => {
    if (!requestToken.value) {
      return '';
    }
    return `https://www.themoviedb.org/auth/access?request_token=${requestToken.value}`;
  });

  const isAuthenticated = computed(() => Boolean(accessToken.value && accessToken.value));

  const runtimeConfig = useRuntimeConfig();

  const route = useRoute();

  const defaultParams = {
    baseURL: runtimeConfig.public.tmdbBaseUrl,
    headers: { Authorization: `Bearer ${runtimeConfig.public.tmdbToken}` },
    method: 'POST',
  };

  async function createRequestToken(): Promise<any> {
    const params = {
      ...defaultParams,
      body: {
        redirect_to: `${runtimeConfig.public.baseUrl}${route.path}?validated`,
      },
    };
    const response = await $fetch('/4/auth/request_token', params);
    if (response?.success) {
      console.log('🟣 ~ createRequestToken ~ response?.success:', response?.success);
      requestToken.value = response.request_token;
    }
  }

  async function createAccessToken(): Promise<any> {
    const params = {
      ...defaultParams,
      body: {
        request_token: requestToken.value,
      },
    };
    const response = await $fetch('/4/auth/access_token', params);
    if (response?.success) {
      requestToken.value = '';
      accessToken.value = response.access_token;
      accountId.value = response.account_id;
    }
  }

  return { requestToken, accessToken, accountId, validationUrl, isAuthenticated, createRequestToken, createAccessToken };
});
