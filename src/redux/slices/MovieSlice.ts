import {createAsyncThunk, createSlice, type PayloadAction} from "@reduxjs/toolkit";
import {allMovie, getFilteredMovies, searchMovies} from "@/api_service/movie_services/movie_services.ts";
import type {IMovieResponse} from "@/models/IMovieResponse.ts";
import type {IMovie} from "@/models/IMovie.ts";

type MovieSliceType = {
    movies: IMovie[];
    loading: boolean;
    error: string | null;
    totalPages: number;
};
const initMovieSliceState: MovieSliceType = {
    movies: [],
    loading: false,
    error: null,
    totalPages: 0,
};

interface LoadMovieParams {
    page: number;
}

export const loadMovie = createAsyncThunk<IMovieResponse, LoadMovieParams, { rejectValue: string }>(
    "movie/loadMovie",
    async ({page}, thunkAPI) => {
        try {
            return await allMovie(page);
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to load movies");
        }
    }
);

export const searchMoviesThunk = createAsyncThunk<
    IMovieResponse,
    { query: string; page: number },
    { rejectValue: string }
>(
    "searchMovies",
    async ({query, page}, thunkAPI) => {
        try {
            return await searchMovies(query, page);
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to search movies");
        }
    }
);

export const loadFilteredMoviesThunk = createAsyncThunk<
    IMovieResponse,
    { sort: string; genreId: number | null; page: number },
    { rejectValue: string }
>(
    "movies/loadFiltered",
    async ({sort, genreId, page}, thunkAPI) => {
        try {
            return await getFilteredMovies(sort, genreId, page);
        } catch (e) {
            return thunkAPI.rejectWithValue("Failed to load filtered movies");
        }
    }
);

export const movieSlice = createSlice({
    name: "movies",
    initialState: initMovieSliceState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(loadMovie.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadMovie.fulfilled, (state, action: PayloadAction<IMovieResponse>) => {
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(loadMovie.rejected, (state, action) => {
                state.loading = false;
                if (typeof action.payload === "string") {
                    state.error = action.payload;
                } else {
                    state.error = "Failed to load movies";
                }
            })

            .addCase(searchMoviesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(searchMoviesThunk.fulfilled, (state, action: PayloadAction<IMovieResponse>) => {
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(searchMoviesThunk.rejected, (state, action) => {
                state.loading = false;
                if (typeof action.payload === "string") {
                    state.error = action.payload;
                } else {
                    state.error = "Failed to search movies";
                }
            })
            .addCase(loadFilteredMoviesThunk.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(loadFilteredMoviesThunk.fulfilled, (state, action: PayloadAction<IMovieResponse>) => {
                state.movies = action.payload.results;
                state.totalPages = action.payload.total_pages;
                state.loading = false;
            })
            .addCase(loadFilteredMoviesThunk.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload ?? "Failed to load filtered movies";
            });
    },
});
export const MoviesActions = {
    movieSlice,
    loadMovie,
    searchMoviesThunk,
    loadFilteredMoviesThunk,
};
export default movieSlice.reducer;
