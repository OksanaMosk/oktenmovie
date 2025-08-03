import {MovieVideo} from "../movieVideo-component/MovieVideo.tsx";
import {type FC, useState} from "react";
import {useNavigate} from "react-router-dom";
import {VoteAverageComponent} from "../voteAverage-component/VoteAverageComponent.tsx";
import type {IMovie} from "@/models/IMovie.ts";
import type {IGenre} from "@/models/IGenre.ts";
import styles from "./MovieListCardComponent.module.css";

type MoviesCardProps = {
    movie: IMovie;
    genres: IGenre[];
    onGenreClick?: (genreId: number) => void;
    disableGenreFilter?: boolean;
    // спеціально добавляємо блокування жанрів, коли є пошук по слову, бо нема такого запиту, щоб і то, і то
};
export const MovieListCardComponent: FC<MoviesCardProps> = ({movie, genres, onGenreClick, disableGenreFilter}) => {
    const [show, setShow] = useState(false);
    const [hovered, setHovered] = useState(false);
    const navigate = useNavigate();
    const genreNames = movie.genre_ids
        ?.map((id) => genres.find((g) => g.id === id)?.name)
        .filter(Boolean) as string[];
    const handleClick = () => {
        if (!show) {
            navigate(`/movie/${movie.id}`, {
                state: {from: location.pathname + location.search},
            });
        }
    };
    const formatDate = (d: string) => {
        const date = new Date(d);
        const day = date.getDate().toString().padStart(2, "0");
        const month = (date.getMonth() + 1).toString().padStart(2, "0");
        const year = date.getFullYear().toString().slice(-2);
        return `${day}-${month}-${year}`;
    };
    return (
        <div
            className={styles.movieCardWrapper}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => {
                setHovered(false);
                setShow(false);
            }}
        >
            <div
                onClick={handleClick}
                className={styles.movieItem}>
                {movie.poster_path ? (
                    <img
                        src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
                        alt={movie.original_title}
                        loading="lazy"
                        className={styles.moviePoster}
                    />
                ) : (
                    <div className={styles.moviePosterPlaceholder}>
                        <img
                            src="/images/movie-placeholder.png"
                            alt="No poster"
                            className={styles.noImage}
                        />
                        <span className={styles.noImageText}>No POSTER available</span>
                    </div>
                )}
                {hovered && !show && (
                    <button
                        onClick={(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            setShow(true);
                        }}
                        className={styles.playButton}
                    >
                        <span className={styles.playButtonIcon}>▷</span>
                    </button>
                )}
                {show && (
                    <div className={styles.movieVideoOverlay}>
                        <MovieVideo movieId={movie.id} onClose={() => setShow(false)}/>
                    </div>
                )}
            </div>
            <div className={styles.movieInfoWrapper}>
                <div className={styles.movieInfo}>
                    <h1 className={styles.movieTitle}>{movie.original_title}</h1>
                    <div className="flex gap-2">
                        {movie.release_date ? (
                            <p><strong>Release: </strong> {formatDate(movie.release_date)}</p>
                        ) : <p><strong>Release: </strong>No date</p>}
                        <p><strong>Popularity: </strong> {Math.round(movie.popularity)}</p>
                    </div>
                    <div className={styles.movieGenres}>
                        {genreNames && genreNames.length > 0 ? (
                            genreNames.map((genreName, i) => {
                                const matchedGenre = genres.find((g) => g.name === genreName.trim());
                                return (
                                    <span key={i}
                                        className={`${styles.tag} ${disableGenreFilter ? styles.disabled : styles.enabled}`}
                                        title={disableGenreFilter
                                            ? "Clear the search"
                                            : ""}
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            if (matchedGenre && onGenreClick && !disableGenreFilter) {
                                                onGenreClick(matchedGenre.id);
                                            }
                                        }}>{genreName.trim()}</span>
                                );
                            })
                        ) : (
                            <span className="text-blue-200">No genres</span>
                        )}
                    </div>
                </div>
                <VoteAverageComponent vote_average={movie.vote_average}/>
            </div>
        </div>
    );
};
