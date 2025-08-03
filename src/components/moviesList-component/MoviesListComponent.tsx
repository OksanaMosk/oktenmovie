import {useMovies} from '../../hooks/useMovies.tsx';
import {LoaderComponent} from '../loader-component/LoaderComponent.tsx';
import {MovieListCardComponent} from '../movieListCard-сomponent/MovieListCardComponent.tsx';
import {PaginationComponent} from '../pagination-component/PaginationComponent.tsx';
import type {IGenre} from '@/models/IGenre.ts';
import type {FC} from "react";

import styles from "./MoviesListComponent.module.css"

type MoviesListProps= {
    genres: IGenre[];
    selectedGenreId: number | null;
}

export const MoviesListComponent:FC<MoviesListProps> = ({genres}) => {
    const {
        movies,
        loading,
        error,
        totalPages,
        searchQuery,
        genreId,
        query,
        setQuery
    } = useMovies();

    const handleGenreClick = (genreId: number) => {
        const newQuery = new URLSearchParams(query.toString());
        newQuery.set("genre", genreId.toString());
        newQuery.set("pg", "1");
        setQuery(newQuery);
        localStorage.setItem("queryParams", newQuery.toString());
    };

    const filteredMovies = genreId
        ? movies.filter(movie => movie.genre_ids.includes(genreId))
        : movies;

    if (loading) return <LoaderComponent/>;
    if (error) return <div className="text-center text-indigo-500">{error}</div>;
    if (!loading && searchQuery && movies.length === 0) {
        return (
            <p className={styles.noResults}>
                No results found.
            </p>
        );
    }

    const getOffsetClass = (i: number) => {
        if (i % 4 === 1 || i % 4 === 3) return 'xl:mt-20';
        return 'xl:mt-0';
    };

    return (
        <>
            <div className={styles.movieListContainer}>
                {searchQuery && (
                    <div className={styles.searchQueryText}>
                        Showing results for: <strong className={styles.queryText}>{searchQuery}</strong>
                    </div>
                )}
                <ul className={styles.list}>
                    {filteredMovies.map((movie, i) => (
                        <li key={movie.id} className={getOffsetClass(i)}>
                            <MovieListCardComponent
                                movie={movie}
                                genres={genres}
                                onGenreClick={handleGenreClick}
                                disableGenreFilter={!!searchQuery}/>
                        </li>
                    ))}
                </ul>
            </div>
            <PaginationComponent totalPages={totalPages}/>
        </>
    );
};
