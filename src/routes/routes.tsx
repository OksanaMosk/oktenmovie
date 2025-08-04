import {createHashRouter} from "react-router-dom";
import App from "../App.tsx";
import {MoviesPage} from "@/pages/movies-page/MoviesPage.tsx";
import {MovieDetailsPage} from "@/pages/movieDetails-page/MovieDetailsPage.tsx";
import {LoginPage} from "@/pages/login-page/LoginPage.tsx";
import {RegisterPage} from "@/pages/register-page/RegisterPage.tsx";

export const routes = createHashRouter([
    {
        path: '/', element: <App/>, children: [
            {path: 'movie', element: <MoviesPage/> },
            {path: ':id', element: <MovieDetailsPage/>},
            {path: 'login', element: <LoginPage/>},
            {path: 'register', element:<RegisterPage/>},
        ]
    }
]);
