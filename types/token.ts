import type { StatusResponse } from '.';

// https://developer.themoviedb.org/v4/reference/auth-create-request-token
export interface RequestTokenV4 extends StatusResponse {
  request_token: string;
}

// https://developer.themoviedb.org/v4/reference/auth-create-access-token
export interface AccessTokenV4 extends StatusResponse {
  account_id: string;
  access_token: string;
}
