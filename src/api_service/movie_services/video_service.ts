const baseUrl = import.meta.env.VITE_API_BASE_URL;
const apiKey = import.meta.env.VITE_API_KEY;

export const allVideos = async <T>(movieId: number): Promise<T> => {
    const response = await fetch(`${baseUrl}/movie/${movieId}/videos?api_key=${apiKey}`);
    if (!response.ok) {
        throw new Error("Failed to fetch videos");
    }
    const data = await response.json();
    return data as T;
};

