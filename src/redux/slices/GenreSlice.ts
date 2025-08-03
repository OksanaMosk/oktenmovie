import type {IGenre} from "@/models/IGenre.ts";
import {createSlice} from "@reduxjs/toolkit";

type GenreSliceType={
    genres: IGenre[]
}
const initGenreSliceState:GenreSliceType={genres:[]}
export const genreSlice = createSlice({
    name: "genres",
    initialState: initGenreSliceState,
    reducers:{},

})
