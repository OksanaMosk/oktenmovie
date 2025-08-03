import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {idMovie} from "@/api_service/movie_services/movie_services.ts";
import type {IMovieDetails} from "@/models/IMovieDetails.ts";

type IdMovieState = {
    [movieId: number]: {
        item: IMovieDetails | null;
        isLoading: boolean;
        isLoaded: boolean;
    };
};

const initMovieDetailSliceState: IdMovieState = {}
const loadIdMovie = createAsyncThunk("idMovie", async (movieId: number, thunkAPI) => {
        try {
            const response = await idMovie<IMovieDetails>(movieId);
            return thunkAPI.fulfillWithValue({movieId, response})
        } catch (e) {
            console.error(e)
            return thunkAPI.rejectWithValue("Error load movie details")
        }
    }
)
export const idMovieSlice = createSlice({
    name: "movieDetails",
    initialState: initMovieDetailSliceState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addCase(loadIdMovie.pending, (state, action) => {
                const movieId = action.meta.arg;
                state[movieId] = {
                    item: null,
                    isLoading: true,
                    isLoaded: false
                };
            })
            .addCase(loadIdMovie.fulfilled, (state, action) => {
                const { movieId, response } = action.payload as { movieId: number; response: IMovieDetails };
                state[movieId] = {
                    item: response,
                    isLoading: false,
                    isLoaded: true
                };
            })
            .addCase(loadIdMovie.rejected, (state, action) => {
                const movieId = action.meta.arg;
                state[movieId] = {
                    item: null,
                    isLoading: false,
                    isLoaded: false
                };
            });
    }
});
 export const IdMovieActions = { idMovieSlice, loadIdMovie};
