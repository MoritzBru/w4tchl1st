export interface StatusResponse {
  status_code: number;
  status_message: string;
  success: boolean;
}

// https://developer.themoviedb.org/v4/reference/auth-create-request-token
export interface RequestTokenV4 extends StatusResponse {
  request_token: string;
}

// https://developer.themoviedb.org/v4/reference/auth-create-access-token
export interface AccessTokenV4 extends StatusResponse {
  account_id: string;
  access_token: string;
}

// https://developer.themoviedb.org/reference/account-details
export interface Account {
  avatar: {
    gravatar: {
      hash: string;
    };
    tmdb: {
      avatar_path: string;
    };
  };
  id: number;
  iso_639_1: string;
  iso_3166_1: string;
  name: string;
  include_adult: boolean;
  username: string;
}

export type MediaType = 'movie' | 'tv';

export interface PageResult<T> {
  page: number;
  results: T[];
  total_pages: number;
  total_results: number;
}

export interface Media {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date?: string;
  first_air_date?: string;
  title: string;
  name?: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
  media_type?: MediaType;
  // details
  // homepage?: string;
  // runtime?: number;
  // budget?: number;
  // revenue?: number;
  // status?: string;
  // genres?: Genre[];
  // production_companies?: any[];
  // videos?: {
  //   results: Video[];
  // };
  // credits?: {
  //   cast: Person[];
  //   crew: Person[];
  // };
  // images?: {
  //   backdrops: Image[];
  //   posters: Image[];
  // };
  // external_ids?: ExternalIds;
  // // cast
  // character?: string;
}
