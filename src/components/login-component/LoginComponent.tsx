import {type FC, useState} from "react";
import {useAppDispatch} from "@/hooks/useAppDispatch.ts";
import {loginThunk} from "@/redux/slices/AuthSlice.ts";
import {Link, useLocation} from "react-router-dom";
import {LoaderComponent} from "../loader-component/LoaderComponent.tsx";
import {useForm, Controller} from "react-hook-form";
import {joiResolver} from "@hookform/resolvers/joi";
import {UserLoginValidator} from "@/components/validators/UserLoginValidator.ts";
import userImg from "@/images/user.png";
import eye from "@/images/eye.png";
import noEye from "@/images/noeye.png";
import styles from "./LoginComponent.module.css";


type FormData = {
    email: string;
    password: string;
};
type LoginProps = {
    onLogin: () => void;
};

export const LoginComponent: FC<LoginProps> = ({onLogin}) => {
    const dispatch = useAppDispatch();
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const {control, handleSubmit, formState: {errors}} = useForm<FormData>({
        resolver: joiResolver(UserLoginValidator),
        defaultValues: {
            email: '',
            password: ''
        },
    });

    const handleLogin = async (data: { email: string; password: string }) => {
        setError(null);
        setLoading(true);
        try {
            await dispatch(loginThunk({email: data.email, password: data.password})).unwrap();
            onLogin();
        } catch (err: any) {
            if (err?.message) {
                if (err.message.includes("INVALID_PASSWORD")) {
                    setError("The password or email you entered is incorrect.");
                } else {
                    setError(err.message || "Unknown error");
                }
            } else {
                setError("The password or email you entered is incorrect.");
            }
        } finally {
            setLoading(false);
        }
    };

    const location = useLocation();
    let from = (location.state as { from?: string })?.from || "/";

    return (
        <form onSubmit={handleSubmit(handleLogin)} className={styles.form}>
            <h2 className={styles.title}>Sign In</h2>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className="sr-only">Email</label>
                <Controller
                    control={control}
                    name="email"
                    render={({field}) => (
                        <input
                            id="email"
                            type="email"
                            placeholder="Email"
                            {...field}
                            className={styles.input}
                        />
                    )}
                />
                {errors.email && <p className={styles.error}>{errors.email.message}</p>}
                <div className={styles.icon}>
                    <img src={userImg} alt="user icon" className="w-full h-full"/>
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className="sr-only">Password</label>
                <Controller
                    control={control}
                    name="password"
                    render={({field}) => (
                        <input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            placeholder="Password"
                            {...field}
                            className={styles.input}
                        />
                    )}
                />
                {errors.password && <p className={styles.error}>{errors.password.message}</p>}
                <div
                    className={styles.icon}
                    onClick={() => setShowPassword(!showPassword)}
                >
                    <img src={showPassword ? noEye : eye} alt="toggle password" className="w-full h-full"/>
                </div>
            </div>
            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? (
                    <div className={styles.loaderWrapper}>
                        <LoaderComponent/>
                    </div>
                ) : ("Sign in")}
            </button>
            <div className={styles.bottomContainer}>
                {error && <p className={styles.error}>{error}</p>}
                <p className={styles.registerText}>
                    Don't have an account?{" "}
                    <Link to="/register" state={{from}} className={styles.link}>
                        Sign up
                    </Link>
                </p>
            </div>
        </form>
    );
};
