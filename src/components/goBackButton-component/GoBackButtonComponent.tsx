import {useNavigate, useLocation} from 'react-router-dom';
import styles from "./GoBackButtonComponent.module.css";

export const GoBackButtonComponent = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const handleGoBack = () => {
        const from = location.state?.from;
        if (typeof from === "string") {
            navigate(from);
        } else {
            navigate("/");
        }
    };

    return (
        <button className={styles.button} onClick={handleGoBack}
        >
            Go back
        </button>
    );
};
