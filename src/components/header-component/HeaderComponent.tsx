import {useContext, useState} from "react";
import type { FC } from "react";
import { Link, useLocation } from "react-router-dom";
import { MyContext } from "../ThemeContextProvider.tsx";
import { UserInfoComponent } from "@/components/userInfo-component/UserInfoComponent.tsx";
import {BurgerMenuComponent} from "@/components/burgerMenu-component/BurgerMenuComponent.tsx";
import type { IUser } from "@/models/IUser.ts";
import styles from "./HeaderComponent.module.css";

type HeaderProps = {
    user: IUser | null;
    authenticated: boolean;
    onLogout: () => void;
}
export const HeaderComponent: FC<HeaderProps> = ({ user, authenticated, onLogout }) => {
    const location = useLocation();
    const {theme, changeTheme } = useContext(MyContext);
    const [isOpen, setIsOpen] = useState(false);
    const handlerDark = () => changeTheme("dark");
    const handlerLight = () => changeTheme("light");
    const from = location.pathname + location.search;
    const toggleMenu = () => setIsOpen(prev => !prev);
    const closeMenu = () => setIsOpen(false);

    return (
        <header className={styles.header}>
            <div className={styles.inner}>
                <div className={styles.logoBlock}>
                    <img src="/images/logo.png" alt="Logo" className="w-10 h-10" />
                    <div className={styles.logo}>
                        <h1 className={styles.logoTitle}>Not just movies...</h1>
                        <p className={styles.subtitle}>...new Dimensions</p>
                    </div>
                </div>

                <div className={styles.rightBlock}>
                    {!authenticated ? (
                        <div className={styles.authLinks}>
                            <Link to="/login" state={{ from }} className="hover:underline">Sign In</Link>
                            <Link to="/register" state={{ from }} className="hover:underline">Sign Up</Link>
                        </div>
                    ) : (
                        user && <UserInfoComponent user={user} onLogout={onLogout} />
                    )}

                    <div className={styles.themeSwitcher}>
                        <button
                            onClick={handlerDark}
                            title="Dark Theme"
                            className={`${styles.themeButton} ${styles.darkCircle}`}
                        />
                        <button
                            onClick={handlerLight}
                            title="Light Theme"
                            className={`${styles.themeButton} ${styles.lightCircle}`}
                        />
                    </div>
                </div>
                <div className={styles.burger}
                     onClick={toggleMenu}
                     role="button"
                     tabIndex={0}
                     onKeyDown={e => { if (e.key === "Enter" || e.key === " ") toggleMenu(); }}
                >
                    <div className={styles.burgerLine} />
                    <div className={styles.burgerLine} />
                    <div className={styles.burgerLine} />
                </div>

                <BurgerMenuComponent
                    isOpen={isOpen}
                    from={from}
                    authenticated={authenticated}
                    user={user}
                    onLogout={onLogout}
                    closeMenu={closeMenu}
                    onDarkTheme={handlerDark}
                    onLightTheme={handlerLight}
                    theme={theme}
                />
            </div>
        </header>
    );
};
