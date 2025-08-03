import {createAsyncThunk, createSlice, isAnyOf} from "@reduxjs/toolkit";
import {allVideos} from "@/api_service/movie_services/video_service.ts";
import type {IResults} from "@/models/IVideo.ts";

type VideosState = {
    [movieId: number]: {
        items: IResults[] | null;
        isLoading: boolean;
        isLoaded: boolean;
    };
};
const initVideoSliceState: VideosState = {};
const loadVideos = createAsyncThunk(
    "loadVideos",
    async (movieId: number, thunkAPI) => {
        try {
            const response = await allVideos<{ id: number; results: IResults[] }>(movieId);
            return thunkAPI.fulfillWithValue({ movieId, items: response.results });
        } catch (e) {
            console.error(e);
            return thunkAPI.rejectWithValue("Error load videos");
        }
    }
);

export const videoSlice = createSlice({
    name: "videos",
    initialState: initVideoSliceState,
    reducers: {},
    extraReducers: builder => {
        builder
            .addMatcher(
                isAnyOf(loadVideos.pending, loadVideos.fulfilled, loadVideos.rejected),
                (state, action) => {
                    const movieId = action.meta.arg;

                    if (action.type === loadVideos.pending.toString()) {
                        state[movieId] = { items: null, isLoading: true, isLoaded: false };
                    } else if (action.type === loadVideos.fulfilled.toString()) {
                        const { movieId, items } = action.payload as { movieId: number; items: IResults[] };
                        state[movieId] = { items, isLoading: false, isLoaded: true };
                    } else if (action.type === loadVideos.rejected.toString()) {
                        state[movieId] = { items: null, isLoading: false, isLoaded: false };
                    }
                }
            );
    }
});
export const VideoActions = { videoSlice, loadVideos };

