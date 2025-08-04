import {HeaderComponent} from "./components/header-component/HeaderComponent.tsx";
import {Link, Outlet} from "react-router-dom";
import {MyContext} from "./components/ThemeContextProvider.tsx";
import {useEffect, useState} from "react";
import {refreshThunk, logoutThunk, authSlice} from "./redux/slices/AuthSlice.ts";
import {useAppDispatch} from "@/hooks/useAppDispatch.ts";
import {useAppSelector} from "@/hooks/useAppSelector.ts";
import style from "./App.module.css";
import "./index.css";

type Theme = "dark" | "light";

function App() {
    const dispatch = useAppDispatch();
    const user = useAppSelector(state => state.authStoreSlice.userData);
    const authenticated = useAppSelector(state => state.authStoreSlice.authenticated);
    const [themeColor, setThemeColor] = useState<Theme>("dark");

    useEffect(() => {
        const savedAuth = localStorage.getItem("auth");
        if (savedAuth) {
            const authData = JSON.parse(savedAuth);
            if (authData.token) {
                dispatch(authSlice.actions.setAuthState({
                    authenticated: true,
                    token: authData.token,
                    userData: {email: authData.email, uid: authData.uid, token: authData.token},
                    error: null,
                    isLoadingAuth: false,
                }));
                return;
            }
        }
        dispatch(refreshThunk());
    }, [dispatch]);

    const handleLogout = () => {
        dispatch(logoutThunk());
    };

    useEffect(() => {
        const savedTheme = localStorage.getItem("theme");
        if (savedTheme) {
            setThemeColor(savedTheme as Theme);
        } else {
            setThemeColor("dark");
        }
    }, []);

    useEffect(() => {
        localStorage.setItem("theme", themeColor);
        document.body.classList.remove("dark", "light");
        document.body.classList.add(themeColor);
    }, [themeColor]);

    return (
        <MyContext.Provider
            value={{
                theme: themeColor,
                changeTheme: (themeValue: Theme) => setThemeColor(themeValue),
            }}
        >
            <div className={`${style.container}, ${themeColor}`}>
                <HeaderComponent user={user} authenticated={authenticated} onLogout={handleLogout}/>
                <Link to="movie/">Перейти до фільмів</Link>
                <main  className={style.outlet}>
                    <Outlet/>
                </main>
            </div>
        </MyContext.Provider>
    )
}
export default App;
