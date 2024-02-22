import type { Account } from '~/types';

export function fetchTmdb<T>(url: string, options: Record<string, string | number | boolean | undefined> = {}) {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();

  const token = authStore.accessToken || runtimeConfig.public.tmdbToken;

  if (token === runtimeConfig.public.tmdbToken) {
    console.warn('Using app token for tmdb request');
  }

  const defaultOptions = {
    baseURL: runtimeConfig.public.tmdbBaseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  };

  const opts = {
    ...defaultOptions,
    ...options,
  };

  return $fetch<T>(url, opts);
}

// export function getConfiguration() {
//   return fetchTmdb(`3/configuration`);
// }

export function getAccount(id: string) {
  return fetchTmdb<Account>(`3/account/${id}`);
}
