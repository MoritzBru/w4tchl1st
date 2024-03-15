import type {
  Account, MediaType, Media, PageResult, StatusResponse,
} from '~/types';
import type { NitroFetchOptions } from 'nitropack';

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

  function getTrending(media: MediaType, timeWindow = 'week', query?: { page?: number; language?: string }) {
    const payload = { query };
    return $tmdb<PageResult<Media> | null>(`3/trending/${media}/${timeWindow}`, payload);
  }

  function getWatchlist(type: MediaType, query: { page?: number; language?: string }) {
    const payload = { query };
    return $tmdb<PageResult<Media> | null>(`4/account/${authStore.accountId}/${type}/watchlist`, payload);
  }

  function addToWatchlist(type: MediaType, id: string) {
    const payload: NitroFetchOptions<'POST'> = {
      method: 'POST',
      body: {
        media_type: type,
        media_id: id,
        watchlist: true,
      },
    };
    return $tmdb<StatusResponse | null>(`3/account/${authStore.accountId}/watchlist`, payload);
  }
  function removeFromWatchlist(type: MediaType, id: string) {
    const payload: NitroFetchOptions<'POST'> = {
      method: 'POST',
      body: {
        media_type: type,
        media_id: id,
        watchlist: false,
      },
    };
    return $tmdb<StatusResponse | null>(`3/account/${authStore.accountId}/watchlist`, payload);
  }

  return {
    $tmdb,
    getConfiguration,
    getAccount,
    getTrending,
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
  };
}
