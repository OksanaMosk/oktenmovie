import { signOut } from "firebase/auth";
import { auth } from "../../../firebase.ts";
import type { IUser } from "@/models/IUser.ts";
import type { FC } from "react";

import styles from "./UserInfoComponent.module.css";

type UserInfoProps = {
    user: IUser;
    onLogout: () => void;
    classNames?: {
        container?: string;
        avatar?: string;
        info?: string;
        welcome?: string;
        user?: string;
        logoutBtn?: string;
    };
};

export const UserInfoComponent: FC<UserInfoProps> = ({ user, onLogout, classNames = {}}) => {
    const handleLogout = async () => {
        await signOut(auth);
        onLogout();
    };
    const avatarLetter = user.email ? user.email[0].toUpperCase() : "?";

    return (
        <div className={`${styles.container} ${classNames.container ?? ""}`}>
            <div className={`${styles.avatar} ${classNames.avatar ?? ""}`}>
                {avatarLetter}
            </div>
            <div className={`${styles.info} ${classNames.info ?? ""}`}>
                <p className={`${styles.welcome} ${classNames.welcome ?? ""}`}>Welcome,</p>
                <p className={`${styles.user} ${classNames.user ?? ""}`}>{user.email}</p>
                <button
                    onClick={handleLogout}
                    className={`${styles.logoutBtn} ${classNames.logoutBtn ?? ""}`}
                >
                    Sign out
                </button>
            </div>
        </div>
    );
};

