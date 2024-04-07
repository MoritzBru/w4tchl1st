import { useLocalStorage } from '@vueuse/core';
import type { MediaType } from '~/types';

export function useMovieWeb() {
  const movieWebBase = useLocalStorage('wl-mwbase', '');

  function getMovieWebUrl(id: string, type: MediaType) {
    if (!movieWebBase.value || !id || !type) return;
    const url = new URL(`media/tmdb-${type}-${id}`, movieWebBase.value);
    return url.toString();
  }

  return {
    movieWebBase,
    getMovieWebUrl,
  };
}
