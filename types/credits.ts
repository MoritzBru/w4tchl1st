interface CreditsBase {
  adult: boolean;
  gender: number;
  id: number;
  known_for_department: string;
  name: string;
  original_name: string;
  popularity: number;
  profile_path: string;
  credit_id: string;
}

export interface Cast extends CreditsBase {
  cast_id: number;
  character: string;
  order: number;
}

export interface Crew extends CreditsBase {
  department: string;
  job: string;
}

export interface Credits {
  cast: Cast[];
  crew: Crew[];
}

export type CreditDetails = CreditsBase & Partial<Cast> & Partial<Crew>;
