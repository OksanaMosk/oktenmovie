import { type FC } from "react";
import * as React from "react";
import { useAppDispatch } from "@/hooks/useAppDispatch.ts";
import { registerThunk } from "@/redux/slices/AuthSlice.ts";
import { useNavigate, useLocation, Navigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "@/redux/store.ts";
import { LoaderComponent } from "@/components/loader-component/LoaderComponent.tsx";
import { useForm, Controller } from "react-hook-form";
import { joiResolver } from "@hookform/resolvers/joi";
import { UserRegisterValidator } from "@/components/validators/UserRegisterValidator.ts";
import type { IUser } from "@/models/IUser.ts";
import userImg from "/images/user.png";
import eye from "/images/eye.png";
import noEye from "/images/noeye.png";
import styles from "./RegisterComponent.module.css";

type RegisterProps = {
    onSuccess: (user: IUser) => void;
};

export const RegisterComponent: FC<RegisterProps> = ({ onSuccess }) => {
    const [showPassword, setShowPassword] = React.useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
    const [loading, setLoading] = React.useState(false);
    const [error, setError] = React.useState<string | null>(null);
    const dispatch = useAppDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const authenticated = useSelector((state: RootState) => state.authStoreSlice.authenticated);
    const forbiddenPaths = ["/login", "/register"];
    let from = (location.state as { from?: string } | null)?.from || "/";
    if (forbiddenPaths.includes(from)) {
        from = "/";
    }
    if (authenticated) {
        return <Navigate to={from} replace />;
    }

    const { control, handleSubmit, formState: { errors } } = useForm({
        resolver: joiResolver(UserRegisterValidator),
        defaultValues: {
            email: '',
            password: '',
            confirmPassword: ''
        },
    });

    const handleRegister = async (data: { email: string; password: string }) => {
        setError(null);
        setLoading(true);
        try {
            const resultAction = await dispatch(registerThunk({ email: data.email, password: data.password }));
            if (registerThunk.fulfilled.match(resultAction)) {
                onSuccess(resultAction.payload);
                navigate(from, { replace: true });
            } else {
                setError(resultAction.payload || "Error registering");
            }
        } catch {
            setError("Unknown error");
        } finally {
            setLoading(false);
        }
    };

    return (
        <form onSubmit={handleSubmit(handleRegister)} className={styles.form}>
            <h2 className={styles.title}>Sign Up</h2>
            <div className={styles.inputGroup}>
                <label htmlFor="email" className="sr-only">Email</label>
                <Controller
                    control={control}
                    name="email"
                    render={({ field }) => (
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
                    <img src={userImg} alt="user icon" className="w-6 h-6" />
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="password" className="sr-only">Password</label>
                <Controller
                    control={control}
                    name="password"
                    render={({ field }) => (
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
                    <img src={showPassword ? noEye : eye} alt="toggle password" className="w-6 h-6" />
                </div>
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="confirmPassword" className="sr-only">Confirm Password</label>
                <Controller
                    control={control}
                    name="confirmPassword"
                    render={({ field }) => (
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirm Password"
                            {...field}
                            className={styles.input}
                        />
                    )}
                />
                {errors.confirmPassword && <p className={styles.error}>{errors.confirmPassword.message}</p>}
                <div
                    className={styles.icon}
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                    <img src={showConfirmPassword ? noEye : eye} alt="toggle confirm password" className="w-6 h-6" />
                </div>
            </div>
            <button type="submit" className={styles.button} disabled={loading}>
                {loading ? (
                    <div className={styles.loaderWrapper}>
                        <LoaderComponent />
                    </div>
                ) : ("Sign up")}
            </button>
            <div className={styles.bottomContainer}>
                {error && <p className={styles.error}>{error}</p>}
                <p className={styles.registerText}>
                    Already have an account?{" "}
                    <Link to="/login" state={{from}} className={styles.link}>
                        Sign in
                    </Link>
                </p>
            </div>
        </form>
    );
};
