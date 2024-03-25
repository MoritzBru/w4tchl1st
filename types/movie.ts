import type {
  MediaBase, Collection, Genre, Company, Country, Language,
} from '.';

export interface Movie extends MediaBase {
  title: string;
  original_title: string;
  release_date: string;
  video: boolean;
}

export interface MovieDetails extends Movie {
  belongs_to_collection?: Collection;
  budget: number;
  genres: Genre[];
  homepage: string;
  imdb_id: string;
  production_companies: Company[];
  production_countries: Country[];
  revenue: number;
  runtime: number;
  spoken_languages: Language[];
  status: string;
  tagline: string;
}
