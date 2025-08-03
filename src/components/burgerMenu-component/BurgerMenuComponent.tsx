import { Link } from "react-router-dom";
import {UserInfoComponent} from "@/components/userInfo-component/UserInfoComponent.tsx";
import type { IUser } from "@/models/IUser";
import type { FC } from "react";
import styles from "./BurgerMenuComponent.module.css";

type BurgerMenuProps = {
    isOpen: boolean;
    from: string;
    authenticated: boolean;
    user: IUser | null;
    onLogout: () => void;
    closeMenu: () => void;
    onDarkTheme: () => void;
    onLightTheme: () => void;
    theme: "dark" | "light";
}

export const BurgerMenuComponent: FC<BurgerMenuProps> = ({
                                                             isOpen,
                                                             from,
                                                             authenticated,
                                                             user,
                                                             onLogout,
                                                             closeMenu,
                                                             onDarkTheme,
                                                             onLightTheme,
                                                             theme,
                                                         }) => {
    if (!isOpen) return null;
    const themeClass = theme === "dark" ? styles.backgroundDark : styles.backgroundLight;
    return (
        <nav className={`${styles.burgerMenu} ${themeClass}`}>
            <button onClick={closeMenu} className={styles.closeBtn} aria-label="Close menu">×</button>
            {!authenticated ? (
                <>
                    <Link to="/login" state={{from}} onClick={closeMenu} className={styles.burgerLink}>Sign In</Link>
                    <Link to="/register" state={{from}} onClick={closeMenu} className={styles.burgerLink}>Sign Up</Link>
                </>
            ) : (
                user && (
                    <UserInfoComponent user={user} onLogout={onLogout} classNames={{
                        container: styles.burgerUserContainer,
                        avatar: styles.burgerUserAvatar,
                        info: styles.burgerUserInfo,
                        welcome: styles.burgerUserWelcome,
                        user: styles.burgerUserEmail,
                        logoutBtn: styles.burgerUserLogoutBtn,
                    }}/>
                )
            )}
            <div className={styles.themeSwitcherBurger}>
                <button
                    onClick={onDarkTheme}
                    title="Dark Theme"
                    className={`${styles.themeButton} ${styles.darkCircle}`}
                />
                <button
                    onClick={onLightTheme}
                    title="Light Theme"
                    className={`${styles.themeButton} ${styles.lightCircle}`}
                />
            </div>
        </nav>
    );
};
