import { useLocalStorage } from '@vueuse/core';
import type { MediaType } from '~/types';
import { MovieWebBaseModal } from '#components';

export function useMovieWeb() {
  const movieWebBase = useLocalStorage('wl-movieWebBase', '');

  const modal = useModal();

  function getMovieWebUrl(id: string, type: MediaType) {
    if (!movieWebBase.value || !id || !type) return;
    const url = new URL(`media/tmdb-${type}-${id}`, movieWebBase.value);
    return url.toString();
  }

  function changeMovieWebBase() {
    modal.open(MovieWebBaseModal);
  }

  return {
    movieWebBase,
    getMovieWebUrl,
    changeMovieWebBase,
  };
}
