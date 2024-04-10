import type { Movie, MovieDetails } from './movie';
import type { TV, TVDetails } from './tv';
import type { Images } from './image';
import type { Videos } from './video';
import type { Person, Credits } from './person';

export * from './request';
export * from './token';
export * from './account';
export * from './uiBadge';
export * from './movie';
export * from './tv';
export * from './image';
export * from './video';
export * from './person';

export interface StatusResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

export type MediaType = 'movie' | 'tv';

export interface PageResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface MediaBase {
  adult: boolean;
  backdrop_path: string;
  id: string;
  original_language: string;
  overview: string;
  poster_path: string;
  genre_ids: number[];
  popularity: number;
  vote_average: number;
  vote_count: number;
  media_type?: MediaType;
}

export type Media = MediaBase & Partial<Movie> & Partial<TV>;

export type MediaDetails = MediaBase & Partial<MovieDetails> & Partial<TVDetails> & {
  videos?: Videos;
  images?: Images;
  recommendations?: PageResult<Media>;
  account_states?: AccountStates;
  external_ids?: ExternalIds;
  credits?: Credits;
};

export interface Genre {
  id: number;
  name: string;
}

export interface Language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface Company {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface Country {
  iso_3166_1: string;
  name: string;
}

export interface Collection {
  id: number;
  name: string;
  poster_path: string;
  backdrop_path: string;
}

export interface AccountStates {
  favorite: boolean;
  rated: boolean;
  watchlist: boolean;
}

export interface ExternalIds {
  imdb_id?: string;
  facebook_id?: string;
  instagram_id?: string;
  twitter_id?: string;
  wikidata_id?: string;
}

export type Search = Media | Person;
