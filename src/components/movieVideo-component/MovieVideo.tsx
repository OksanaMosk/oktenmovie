import * as React from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { useAppSelector } from "@/hooks/useAppSelector.ts";
import { useEffect } from "react";
import { VideoActions } from "@/redux/slices/VideoSlice.ts";
import { LoaderComponent } from "../loader-component/LoaderComponent.tsx";
import  styles from "./MovieVideo.module.css"

type MovieVideoProps = {
    movieId: number;
    onClose: () => void;
};

export const MovieVideo = React.memo(({ movieId, onClose }: MovieVideoProps) => {
    const dispatch = useAppDispatch();
    const videoData = useAppSelector((state) => state.videoStoreSlice[movieId]);
    const results = videoData?.items ?? [];
    const loading = videoData?.isLoading ?? false;
    const loaded = videoData?.isLoaded ?? false;

    useEffect(() => {
        if (!loading && !loaded) {
            dispatch(VideoActions.loadVideos(movieId));
        }
    }, [movieId, dispatch, loading, loaded]);

    const trailer = results.find(
        (v) => v.type === "Trailer" && v.site === "YouTube"
    );

    if (!trailer) {
        return loading ? (
            <div className={styles.loaderContainer}>
            <LoaderComponent />
            </div>
        ) : (
            <div className={styles.noTrailerContainer}>
                <img
                    src="/src/images/movie-placeholder.png"
                    alt="No trailer"
                    className={styles.noTrailerImage}
                /><span className={styles.noTrailerText}>No TRAILER available</span>
            </div>
        );
    }

    return (
        <div className={styles.trailerWrapper}>
            <iframe
                className={styles.iframeVideo}
                src={`https://www.youtube.com/embed/${trailer.key}?rel=0&modestbranding=1&disablekb=1`}
                title={trailer.name}
                allowFullScreen
            />
            <button
                onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    onClose();
                }}
                className={styles.hideButton}
            >
                Hide Trailer
            </button>
        </div>
    );
});
