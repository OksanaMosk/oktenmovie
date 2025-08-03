import {useParams} from "react-router-dom";
import {MovieInfoComponent} from "@/components/movieInfo-component/MovieInfoComponent.tsx";
import {ScrollTopButtonComponent} from "@/components/scrollTopButton-component/ScrollTopButtonComponent.tsx";
import {GoBackButtonComponent} from "@/components/goBackButton-component/GoBackButtonComponent.tsx";
import styles from "./MovieDetailsPage.module.css";

export const MovieDetailsPage = () => {
    const {id} = useParams();
    const movieId = Number(id);

    return (
        <div className={styles.container}>
            <GoBackButtonComponent/>
            <MovieInfoComponent movieId={movieId}/>
            <ScrollTopButtonComponent/>
        </div>
    );
};
