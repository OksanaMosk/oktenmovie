import {useEffect, useState} from "react";
import {useLocation, useSearchParams} from "react-router-dom";
import {getGenres} from "@/api_service/movie_services/genre_service.ts";
import {SortComponent} from "@/components/sort-component/SortComponent.tsx";
import {GenreComponent} from "@/components/genre-component/GenreComponent.tsx";
import {MoviesListComponent} from "@/components/moviesList-component/MoviesListComponent.tsx";
import {SearchComponent} from "@/components/search-component/SearchComponent.tsx";
import {ScrollTopButtonComponent} from "@/components/scrollTopButton-component/ScrollTopButtonComponent.tsx";
import type {IGenre} from "@/models/IGenre.ts";
import styles from "./MoviesPage.module.css";

export const MoviesPage = () => {
    const [query, setQuery] = useSearchParams();
    const sort = query.get("sort") || "";
    const genre = query.get("genre");
    const genreId = genre ? Number(genre) : null;
    const location = useLocation();
    const [genres, setGenres] = useState<IGenre[]>([]);
    useEffect(() => {
        getGenres().then(setGenres).catch(console.error);
    }, []);

    useEffect(() => {
        const savedParams = localStorage.getItem("queryParams");
        if (savedParams && !location.search) {
            setQuery(new URLSearchParams(savedParams));
        }
    }, []);

    useEffect(() => {
        if (!location.state) return;
        const {sort: stateSort, genre: stateGenre, query: stateQuery} = location.state as Record<string, string>;
        const newQuery = new URLSearchParams(query.toString());
        if (stateSort) newQuery.set("sort", stateSort);
        if (stateGenre) newQuery.set("genre", stateGenre);
        if (stateQuery) newQuery.set("query", stateQuery);
        setQuery(newQuery);
        localStorage.setItem("queryParams", newQuery.toString());
    }, [location.state]);

    const handleSortChange = (sortValue: string) => {
        const newQuery = new URLSearchParams(query.toString());
        if (sortValue === "") {
            newQuery.delete("sort");
        } else {
            newQuery.set("sort", sortValue);
        }
        newQuery.set("pg", "1");
        setQuery(newQuery);
        localStorage.setItem("queryParams", newQuery.toString());
    };

    const handleGenreChange = (genreId: number | null) => {
        const newQuery = new URLSearchParams(query.toString());
        if (genreId !== null) {
            newQuery.set("genre", genreId.toString());
        } else {
            newQuery.delete("genre");
        }
        newQuery.set("pg", "1");
        setQuery(newQuery);
        localStorage.setItem("queryParams", newQuery.toString());
    };

    return (
        <div className={styles.container}>
            <div>
                <SearchComponent/>
            </div>
            {!query.get("query") && (
                <div className={styles.sortBar}>
                    <SortComponent value={sort} onChange={handleSortChange}/>
                    <GenreComponent value={genreId} onChange={handleGenreChange}/>
                </div>
            )}
            <MoviesListComponent genres={genres} selectedGenreId={genreId}/>
            <ScrollTopButtonComponent/>
        </div>
    );
};
