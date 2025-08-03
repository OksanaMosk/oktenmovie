import type {IMovieResponse} from "@/models/IMovieResponse.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const allMovie = async (page: number): Promise<IMovieResponse> => {
    const response = await fetch(`${baseUrl}/discover/movie?api_key=${apiKey}&page=${page}`);
    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }
    return await response.json();
};

export const idMovie = async <T>(movieId: number): Promise<T> => {
    const response = await fetch(`${baseUrl}/movie/${movieId}?api_key=${apiKey}`);
    if (!response.ok) {
        throw new Error("Failed to fetch movie details");
    }
    const data = await response.json();
    return data as T;
};


export const searchMovies = async (query: string, page: number = 1): Promise<IMovieResponse> => {
    const url = `${baseUrl}/search/movie?api_key=${apiKey}&query=${query}&sort_by=popularity.desc,release_date.desc,vote_average.desc&page=${page}&include_adult=false`;
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error('Failed to fetch data');
    }
    return await response.json();
};

export const getFilteredMovies = async (
    sortBy: string,
    genreId: number | null,
    page: number = 1
): Promise<IMovieResponse> => {
    let url = `${baseUrl}/discover/movie?api_key=${apiKey}&sort_by=${sortBy}&page=${page}&include_adult=false`;
    if (genreId !== null && genreId !== undefined) {
        url += `&with_genres=${genreId}`;
    }
    const response = await fetch(url);
    if (!response.ok) {
        throw new Error("Failed to fetch movies");
    }
    return await response.json();
};


