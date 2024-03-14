import type {
  Account, MediaType, Media, PageResult,
} from '~/types';

export function useTmdb() {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();
  const token = authStore.accessToken || runtimeConfig.public.tmdbToken;

  if (token === runtimeConfig.public.tmdbToken) {
    console.warn('Using app token for tmdb request');
  }

  const $tmdb = $fetch.create({
    baseURL: runtimeConfig.public.tmdbBaseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
  });

  function getConfiguration() {
    return $tmdb(`3/configuration`);
  }

  function getAccount(id: string) {
    return $tmdb<Account | null>(`3/account/${id}`);
  }

  function getWatchlist(accountId: string, type: MediaType, query: { page?: number; language?: string }) {
    return $tmdb<PageResult<Media> | null>(`4/account/${accountId}/${type}/watchlist`, { query });
  }

  function getTrending(media: MediaType, timeWindow = 'week', query?: { page?: number; language?: string }) {
    return $tmdb<PageResult<Media> | null>(`3/trending/${media}/${timeWindow}`, { query });
  }

  return {
    $tmdb,
    getConfiguration,
    getAccount,
    getWatchlist,
    getTrending,
  };
}

// export function getLists(accountId: string) {
//   return fetchTmdb<PageResult<any>>(`4/account/${accountId}/lists`);
// }
