import * as React from "react";
import {useState} from "react";
import {useSearchParams} from "react-router-dom";
import styles from "./SearchComponent.module.css"

export const SearchComponent = () => {
    const [query, setQuery] = useSearchParams();
    const [searchText, setSearchText] = useState(query.get("query") || "");

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchText.trim()) {
            setQuery({query: searchText, pg: "1"});
        } else {
            setQuery({pg: "1"});
        }
    };

    return (
        <div className={styles.container}>
            <label
                htmlFor="movieSearch"
                className={styles.label}
            >
                Search for movies
            </label>
            <form
                onSubmit={handleSearch}
                className={styles.form}
            >
                <input
                    id="movieSearch"
                    type="text"
                    value={searchText}
                    onChange={(e) => setSearchText(e.target.value)}
                    placeholder="Find..."
                    className={styles.input}
                />

                <button
                    type="submit"
                    className={styles.button}
                >
                    🔍︎
                </button>
            </form>
        </div>
    );
};
