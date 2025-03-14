export interface Movie {
  tconst: string;
  title: string;
  original_title: string;
  year: string;
  runtime: string | null;
  genre: string;
  average_rating: string | null;
  num_votes: string | null;
}

export interface Principal {
  id: number;
  category: string;
  job: string | null;
  characters: string | null;
  tconst: string;
  nconst: string;
}

export interface Name {
  nconst: string;
  name: string;
  birth_year: string;
  death_year: string | null;
  primary_professions: string;
  known_for_titles: string;
}
