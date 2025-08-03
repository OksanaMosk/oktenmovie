import { useSearchParams } from 'react-router-dom';
import { useEffect } from 'react';
import { MoviesActions } from '@/redux/slices/MovieSlice';
import {useAppDispatch} from "@/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/hooks/useAppSelector.ts";

export const useMovies = () => {
    const [query, setQuery] = useSearchParams();
    const dispatch = useAppDispatch();
    const movies = useAppSelector(state => state.movieStoreSlice.movies);
    const loading = useAppSelector(state => state.movieStoreSlice.loading);
    const error = useAppSelector(state => state.movieStoreSlice.error);
    const totalPages = useAppSelector(state => state.movieStoreSlice.totalPages);
    const currentPage = query.get("pg") || "1";
    const searchQuery = query.get("query") || "";
    const sort = query.get("sort") || "popularity.desc";
    const genreParam = query.get("genre");
    const genreId = genreParam ? Number(genreParam) : null;

    useEffect(() => {
        if (searchQuery) {
            dispatch(MoviesActions.searchMoviesThunk({ query: searchQuery, page: Number(currentPage) }));
        } else {
            dispatch(MoviesActions.loadFilteredMoviesThunk({ sort, genreId, page: Number(currentPage) }));
        }
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }, [currentPage, searchQuery, sort, genreId, dispatch]);

    return {
        movies,
        loading,
        error,
        totalPages,
        searchQuery,
        genreId,
        query,
        setQuery
    };
};
