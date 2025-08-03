import { createAsyncThunk, createSlice, isAnyOf, type PayloadAction } from "@reduxjs/toolkit";
import type { IUser } from "@/models/IUser.ts";
import { registerUser } from "@/api_service/auth_services/register_service.ts";
import { loginUser } from "@/api_service/auth_services/login_service.ts";
import { logoutUser} from "@/api_service/auth_services/logoutUser_service.ts";
import { auth } from "../../../firebase";

type AuthState = {
    authenticated: boolean;
    token: string | null;
    userData: IUser | null;
    error: string | null;
    isLoadingAuth: boolean;
};

const loadAuthFromStorage = (): AuthState => {
    const stored = localStorage.getItem("auth");
    if (stored) {
        try {
            const parsed = JSON.parse(stored);
            return {
                authenticated: parsed.authenticated ?? false,
                token: parsed.token ?? null,
                userData: parsed.email
                    ? {
                        email: parsed.email,
                        uid: parsed.uid ?? "",
                        token: parsed.token,
                    }
                    : null,
                error: null,
                isLoadingAuth: false,
            };
        } catch {
            return {
                authenticated: false,
                token: null,
                userData: null,
                error: null,
                isLoadingAuth: false,
            };
        }
    }
    return {
        authenticated: false,
        token: null,
        userData: null,
        error: null,
        isLoadingAuth: false,
    };
};
const initAuthSliceState: AuthState = loadAuthFromStorage();

export const registerThunk = createAsyncThunk<
    IUser,
    { email: string; password: string },
    { rejectValue: string }
>("auth/register", async ({ email, password }, thunkAPI) => {
    try {
        const user = await registerUser(email, password);
        return user;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message || "Registration failed");
    }
});

export const loginThunk = createAsyncThunk<
    IUser,
    { email: string; password: string },
    { rejectValue: string }
>("auth/login", async ({ email, password }, thunkAPI) => {
    try {
        const user = await loginUser(email, password);
        return user;
    } catch (err: any) {
        return thunkAPI.rejectWithValue(err.message || "Login failed");
    }
});
export const refreshThunk = createAsyncThunk<IUser | null, void, { rejectValue: string }>(
    "auth/refresh",
    async (_, thunkAPI) => {
        try {
            const user = auth.currentUser;
            if (!user) {
                return null;
            }
            const token = await user.getIdToken(true);
            return {
                uid: user.uid,
                email: user.email || "",
                token,
            };
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || "Refresh failed");
        }
    }
);

export const logoutThunk = createAsyncThunk<boolean, void, { rejectValue: string }>(
    "auth/logout",
    async (_, thunkAPI) => {
        try {
            await logoutUser();
            return true;
        } catch (err: any) {
            return thunkAPI.rejectWithValue(err.message || "Logout failed");
        }
    }
);

export const authSlice = createSlice({
    name: "authStoreSlice",
    initialState: initAuthSliceState,
    reducers: {
        setAuthState(state, action: PayloadAction<AuthState>) {
            state.authenticated = action.payload.authenticated;
            state.token = action.payload.token;
            state.userData = action.payload.userData;
            state.error = null;
            state.isLoadingAuth = false
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(registerThunk.fulfilled, (state, { payload }) => {
                state.authenticated = true;
                state.token = payload.token ?? null;
                state.userData = payload;
                state.isLoadingAuth = false;
                state.error = null;
                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        authenticated: true,
                        email: payload.email,
                        uid: payload.uid,
                        token: payload.token,
                    })
                );
            })
            .addCase(loginThunk.fulfilled, (state, { payload }) => {
                state.authenticated = true;
                state.token = payload.token ?? null;
                state.userData = payload;
                state.isLoadingAuth = false;
                state.error = null;
                localStorage.setItem(
                    "auth",
                    JSON.stringify({
                        authenticated: true,
                        email: payload.email,
                        uid: payload.uid,
                        token: payload.token,
                    })
                );
            })
            .addCase(refreshThunk.fulfilled, (state, { payload }) => {
                if (payload) {
                    state.authenticated = true;
                    state.token = payload.token ?? null;
                    state.userData = payload;
                    localStorage.setItem(
                        "auth",
                        JSON.stringify({
                            authenticated: true,
                            email: payload.email,
                            uid: payload.uid,
                            token: payload.token,
                        })
                    );
                } else {
                    state.authenticated = false;
                    state.token = null;
                    state.userData = null;
                    localStorage.removeItem("auth");
                }
                state.isLoadingAuth = false;
                state.error = null;
            })
            .addCase(logoutThunk.fulfilled, (state) => {
                state.authenticated = false;
                state.token = null;
                state.userData = null;
                state.isLoadingAuth = false;
                state.error = null;
                localStorage.removeItem("auth");
            })
            .addMatcher(
                isAnyOf(registerThunk.pending, loginThunk.pending, refreshThunk.pending, logoutThunk.pending),
                (state) => {
                    state.isLoadingAuth = true;
                    state.error = null;
                }
            )
            .addMatcher(
                isAnyOf(registerThunk.rejected, loginThunk.rejected, refreshThunk.rejected, logoutThunk.rejected),
                (state, action: PayloadAction<any>) => {
                    state.isLoadingAuth = false;
                    state.error = typeof action.payload === "string" ? action.payload : "Auth error";
                }
            );
    },
});

export default authSlice.reducer;






