import {Navigate, useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {LoginComponent} from "@/components/login-component/LoginComponent.tsx";
import {GoBackButtonComponent} from "@/components/goBackButton-component/GoBackButtonComponent.tsx";
import type {RootState} from "@/redux/store.ts";
import styles from "./LoginPage.module.css"

export const LoginPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    const authenticated = useSelector((state: RootState) => state.authStoreSlice.authenticated);
    const forbiddenPaths = ["/login", "/register"];
    let from = (location.state as { from?: string } | null)?.from || "/";
    if (forbiddenPaths.includes(from)) {
        from = "/";
    }
    if (authenticated) {
        return <Navigate to={from} replace/>;
    }
    const handleLogin = () => {
        navigate(from, {replace: true});
    };

    return (
            <div className={styles.container}>
            <GoBackButtonComponent/>
            <LoginComponent onLogin={handleLogin}/>
        </div>
    );
};

