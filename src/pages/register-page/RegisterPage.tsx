import {useLocation, useNavigate, Navigate} from "react-router-dom";
import {useSelector} from "react-redux";
import {RegisterComponent} from "@/components/register-component/RegisterComponent.tsx";
import {GoBackButtonComponent} from "@/components/goBackButton-component/GoBackButtonComponent.tsx";
import type {RootState} from "@/redux/store.ts";
import styles from "./RegisterPage.module.css";

export const RegisterPage = () => {
    const location = useLocation();
    const navigate = useNavigate();
    let from = (location.state as { from?: string } | null)?.from || "/";
    const authenticated = useSelector((state: RootState) => state.authStoreSlice.authenticated);
    const forbiddenPaths = ["/login", "/register"];
    if (forbiddenPaths.includes(from)) {from = "/";
    }
    if (authenticated) {
        return <Navigate to={from} replace/>;
    }
    const handleSuccess = () => {
        navigate(from, {replace: true});
    };

    return (
        <div  className={styles.container}>
            <GoBackButtonComponent/>
            <RegisterComponent onSuccess={handleSuccess}/>
        </div>
    );
};
