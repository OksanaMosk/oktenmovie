export interface IGenres {
  id: number;
  name: string;
}

export interface IProduction_companies {
  id: number;
  logo_path: string;
  name: string;
  origin_country: string;
}

export interface IProduction_countries {
  iso_3166_1: string;
  name: string;
}

export interface ISpoken_language {
  english_name: string;
  iso_639_1: string;
  name: string;
}

export interface ICollection {
    id: number;
    name: string;
    poster_path: string | null;
    backdrop_path: string | null;
}

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection?: ICollection;
  budget: number;
  genres: IGenres[];
  homepage: string;
  id: number;
  imdb_id: string;
  origin_country: string[];
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: IProduction_companies[];
  production_countries: IProduction_countries[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: ISpoken_language[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}
