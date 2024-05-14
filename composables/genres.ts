import type { Genre, MediaType } from '~/types';

export function useGenres() {
  const { getGenres: fetchGenres } = useTmdb();

  const genres = useState<Record<MediaType, Genre[]>>('genres', () => ({
    movie: [],
    tv: [],
  }));

  async function getGenres() {
    genres.value.movie = (await fetchGenres('movie'))?.genres ?? [];
    genres.value.tv = (await fetchGenres('tv'))?.genres ?? [];
  }

  callOnce(getGenres);

  function getMappedGenres(ids: Genre['id'][], type: MediaType) {
    return computed(() => ids.map((id) => genres.value[type].find((genre) => genre.id === id)).filter(isDefined));
  }

  return {
    getMappedGenres,
    getGenres,
  };
}
