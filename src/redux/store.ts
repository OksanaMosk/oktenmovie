import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { genreSlice } from "./slices/GenreSlice";
import { videoSlice } from "./slices/VideoSlice";
import { movieSlice } from "./slices/MovieSlice";
import { idMovieSlice } from "./slices/IdMovieSlice";
import authReducer from "./slices/AuthSlice";

import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist';

const authPersistConfig = {
    key: "authStoreSlice",
    storage,
    whitelist: ["token", "userData", "authenticated"],
};

const persistedAuthReducer = persistReducer(authPersistConfig, authReducer);

export const store = configureStore({
    reducer: {
        genreStoreSlice: genreSlice.reducer,
        videoStoreSlice: videoSlice.reducer,
        movieStoreSlice: movieSlice.reducer,
        idMovieStoreSlice: idMovieSlice.reducer,
        authStoreSlice: persistedAuthReducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),

});
export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
