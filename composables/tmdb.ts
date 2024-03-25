import type {
  Account, MediaType, PageResult, StatusResponse, PageParams, Media, MediaDetails,
} from '~/types';
import type { NitroFetchOptions } from 'nitropack';

export function useTmdb() {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();
  const token = authStore.accessToken || runtimeConfig.public.tmdbToken;

  if (token === runtimeConfig.public.tmdbToken) {
    console.warn('Using app token for tmdb request');
  }

  const toast = useToast();

  const $tmdb = $fetch.create({
    baseURL: runtimeConfig.public.tmdbBaseUrl,
    headers: {
      Authorization: `Bearer ${token}`,
      Accept: 'application/json',
    },
    async onResponseError({ response }) {
      toast.add({
        title: 'Error',
        description: response?._data?.status_message,
        icon: 'i-ph-warning-duotone',
        color: 'red',
      });
    },
  });

  function getConfiguration() {
    return $tmdb(`3/configuration`);
  }

  function getAccount(id: string) {
    return $tmdb<Account | null>(`3/account/${id}`);
  }

  function getTrending(type: MediaType, timeWindow = 'week', query?: PageParams) {
    const payload: NitroFetchOptions<'GET'> = { query };
    return $tmdb<PageResult<Media> | null>(`3/trending/${type}/${timeWindow}`, payload);
  }

  function getWatchlist(type: MediaType, query: PageParams) {
    const payload: NitroFetchOptions<'GET'> = {
      query: {
        sort_by: 'created_at.desc',
        ...query,
      },
    };
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

  function getDetails(type: MediaType, id: string) {
    const payload: NitroFetchOptions<'GET'> = { query: { append_to_response: 'account_states,videos,recommendations,external_ids,credits' } };
    return $tmdb<MediaDetails | null>(`3/${type}/${id}`, payload);
  }

  return {
    $tmdb,
    getConfiguration,
    getAccount,
    getTrending,
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    getDetails,
  };
}
