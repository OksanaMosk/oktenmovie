import type {IGenre} from "@/models/IGenre.ts";

const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const getGenres = async (): Promise<IGenre[]> => {
    const response = await fetch(`${baseUrl}/genre/movie/list?api_key=${apiKey}`);
    if (!response.ok) {
        throw new Error("Failed to fetch genres");
    }
    const data = await response.json();
    return data.genres;
};
