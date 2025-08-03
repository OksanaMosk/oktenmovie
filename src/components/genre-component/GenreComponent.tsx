import * as React from "react";
import {type FC, useEffect, useState} from "react";
import {getGenres} from "@/api_service/movie_services/genre_service.ts";
import type { IGenre } from "@/models/IGenre.ts";
import styles from "./GenreComponent.module.css"

type GenreProps = {
    onChange: (genreId: number | null) => void;
    value?: number | null;
}

export const GenreComponent:FC<GenreProps> = ({ onChange, value }) => {
    const [genres, setGenres] = useState<IGenre[]>([]);
    useEffect(() => {
        getGenres().then(setGenres).catch(console.error);
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const val = e.target.value;
        onChange(val ? Number(val) : null);
    };

    return (
        <div className={styles.container}>
            <label
                htmlFor="genreSelect"
                className={styles.label}
            >
                Choose genre
            </label>
            <select
                id="genreSelect"
                value={value ?? ""}
                onChange={handleChange}
                className={styles.select}
            >
                <option value="">All genres</option>
                {genres.map((genre) => (
                    <option  key={genre.id} value={genre.id}>
                        {genre.name}
                    </option>
                ))}
            </select>
            </div>
    );
};
