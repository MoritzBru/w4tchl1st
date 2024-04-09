import type { Media } from '.';

export interface Person {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
  known_for?: Media[];
  media_type?: 'person';
}

export interface Cast extends Person {
  cast_id: number;
  character: string;
  order: number;
}

export interface Crew extends Person {
  department: string;
  job: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export type CreditDetails = Person & Partial<Cast> & Partial<Crew>;
