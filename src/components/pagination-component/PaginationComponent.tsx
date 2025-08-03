import {useSearchParams} from "react-router-dom";
import {useState, useEffect, useCallback, type FC} from "react";
import styles from "./PaginationComponent.module.css"

type PaginationProps = {
    totalPages: number;
};

export const PaginationComponent:FC<PaginationProps> = ({totalPages}) => {
    const [query, setQuery] = useSearchParams({pg: "1"});
    const currentPage = query.get("pg") || "1";
    const [pageRange, setPageRange] = useState<number[]>([]);
    const computePageRange = useCallback(() => {
        const pages: number[] = [];
        const maxPagesToShow = 10;
        let current = Number(currentPage);
        let total = totalPages;
        const half = Math.floor(maxPagesToShow / 2);
        let startPage = current - half;
        let endPage = current + half;
        if (startPage < 1) {
            startPage = 1;
            endPage = Math.min(total, maxPagesToShow);
        }
        if (endPage > total) {
            endPage = total;
            startPage = Math.max(1, endPage - maxPagesToShow + 1);
        }
        for (let i = startPage; i <= endPage; i++) {
            pages.push(i);
        }
        setPageRange(pages);
    }, [currentPage, totalPages]);

    useEffect(() => {
        computePageRange();
    }, [computePageRange]);

    const handlePageChange = (page: string) => {
        const newQuery = new URLSearchParams(query.toString());
        newQuery.set("pg", page);
        setQuery(newQuery);
    };

    const handlePrevPage = () => {
        if (Number(currentPage) > 1) {
            const newQuery = new URLSearchParams(query.toString());
            newQuery.set("pg", (Number(currentPage) - 1).toString());
            setQuery(newQuery);
        }
    };

    const handleNextPage = () => {
        if (Number(currentPage) < totalPages) {
            const newQuery = new URLSearchParams(query.toString());
            newQuery.set("pg", (Number(currentPage) + 1).toString());
            setQuery(newQuery);
        }
    };

    return (
        <div className={styles.paginationContainer}>
            <button
                onClick={handlePrevPage}
                disabled={Number(currentPage) <= 1}
                className={`${styles.paginationNav} ${Number(currentPage) <= 1 ? "cursor-not-allowed" : ""}`}
                aria-label="Previous page"
            >&#8678;</button>
            {pageRange.map((page) => (
                <button
                    key={page}
                    onClick={() => handlePageChange(page.toString())}
                    className={`${styles.paginationButton} ${currentPage === page.toString() ? styles.paginationButtonActive : styles.paginationButtonInactive}`}
                    aria-current={currentPage === page.toString() ? "page" : undefined}
                    aria-label={`Page ${page}`}>
                    <span className={styles.paginationButtonText}>{page}</span>
                </button>
            ))}
            <button
                onClick={handleNextPage}
                disabled={Number(currentPage) >= totalPages}
                className={`${styles.paginationNav} ${Number(currentPage) >= totalPages ? "cursor-not-allowed" : ""}`}
                aria-label="Next page"
            >
                &#8680;
            </button>
        </div>
    );
}
