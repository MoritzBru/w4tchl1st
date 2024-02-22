export interface AuthResponseV4 {
  status_code: number;
  status_message: string;
  success: boolean;
}

// https://developer.themoviedb.org/v4/reference/auth-create-request-token
export interface RequestTokenV4 extends AuthResponseV4 {
  request_token: string;
}

// https://developer.themoviedb.org/v4/reference/auth-create-access-token
export interface AccessTokenV4 extends AuthResponseV4 {
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
