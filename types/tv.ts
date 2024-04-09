import type {
  Genre, MediaBase, Company, Country, Language,
} from '.';

export interface CreatedBy {
  id: number;
  credit_id: string;
  name: string;
  gender: number;
  profile_path: string;
}

export interface Network {
  name: string;
  id: number;
  logo_path: string;
  origin_country: string;
}

export interface Season {
  air_date: string;
  episode_count: number;
  id: number;
  name: string;
  overview: string;
  poster_path: string;
  season_number: number;
}

export interface Episode {
  id: number;
  name: string;
  overview: string;
  vote_average: number;
  vote_count: number;
  air_date: string;
  episode_number: number;
  production_code: string;
  runtime: number;
  season_number: number;
  show_id: number;
  still_path: string;
}

export interface TV extends MediaBase {
  name: string;
  original_name: string;
  first_air_date: string;
  origin_country: string[];
}

export interface TVDetails extends TV {
  created_by: CreatedBy[];
  episode_run_time: number[];
  genres: Genre[];
  homepage: string;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air: Episode;
  next_episode_to_air?: Episode;
  networks: Network[];
  number_of_episodes: number;
  number_of_seasons: number;
  production_companies: Company[];
  production_countries: Country[];
  seasons: Season[];
  spoken_languages: Language[];
  status: string;
  tagline: string;
  type: string;
}
