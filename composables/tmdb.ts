import type { NitroFetchOptions } from 'nitropack';
import type {
  Account, MediaType, PageResult, StatusResponse, PageParams, Media, MediaDetails, AccountStates, Search,
} from '~/types';

export function useTmdb() {
  const runtimeConfig = useRuntimeConfig();
  const authStore = useAuthStore();
  const token = authStore.accessToken;

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

  function getUpcoming(type: MediaType, query?: PageParams) {
    const queryLookup = {
      movie: 'primary_release_date.gte',
      tv: 'first_air_date.gte',
    };
    const payload: NitroFetchOptions<'GET'> = {
      query: {
        ...query,
        [queryLookup[type]]: new Date().toISOString(),
      },
    };
    return $tmdb<PageResult<Media> | null>(`3/discover/${type}`, payload);
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

  function getAccountStates(type: MediaType, id: string) {
    return $tmdb<AccountStates | null>(`3/${type}/${id}/account_states`);
  }

  function search(term: string, query?: PageParams) {
    const payload: NitroFetchOptions<'GET'> = {
      query: {
        query: term,
        ...query,
      },
    };
    return $tmdb<PageResult<Search> | null>(`3/search/multi`, payload);
  }

  return {
    $tmdb,
    getConfiguration,
    getAccount,
    getTrending,
    getUpcoming,
    getWatchlist,
    addToWatchlist,
    removeFromWatchlist,
    getDetails,
    getAccountStates,
    search,
  };
}
