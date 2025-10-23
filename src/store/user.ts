import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import type {PayloadAction} from "@reduxjs/toolkit";
import {UserService, type UpdateProfileData} from "../services/UserService";
import type {User, UserCredentials} from "../models/UserTypes";

export interface UserState {
    user: {
        user: User | null;
        token: string | null;
        status: 'idle' | 'loading' | 'success' | 'error';
        error: string | null;
    };
}

const initialState: Omit<UserState['user'], never> = {
    user: null,
    token: null,
    status: 'idle',
    error: null,
};

// Thunk pour le login
export const userLogin = createAsyncThunk<string, UserCredentials, { rejectValue: string }>(
    "user/login",
    async (credentials, {rejectWithValue}) => {
        try {
            const token = await UserService().login(credentials);
            return token;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Erreur lors de la connexion");
        }
    }
);

// Thunk pour récupérer le profil
export const fetchUserProfile = createAsyncThunk<User, string, { rejectValue: string }>(
    "user/fetchProfile",
    async (token, {rejectWithValue}) => {
        try {
            const user = await UserService().searchProfile(token);
            return user;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Erreur lors de la récupération du profil");
        }
    }
);

// Thunk combiné pour login + récupération du profil
export const loginAndFetchProfile = createAsyncThunk<
    { user: User; token: string },
    UserCredentials,
    { rejectValue: string }
>(
    "user/loginAndFetchProfile",
    async (credentials, {rejectWithValue}) => {
        try {
            const token = await UserService().login(credentials);
            const user = await UserService().searchProfile(token);
            return {user, token};
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Erreur lors de la connexion");
        }
    }
);

// Thunk pour mettre à jour le profil
export const updateUserProfileAsync = createAsyncThunk<
    User,
    { token: string; data: UpdateProfileData },
    { rejectValue: string }
>(
    "user/updateProfile",
    async ({token, data}, {rejectWithValue}) => {
        try {
            const updatedUser = await UserService().updateProfile(token, data);
            return updatedUser;
        } catch (error) {
            return rejectWithValue(error instanceof Error ? error.message : "Erreur lors de la mise à jour du profil");
        }
    }
);

const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setToken(state, action: PayloadAction<string>) {
            state.token = action.payload;
            state.status = "success";
        },
        setUser(state, action: PayloadAction<User>) {
            state.user = action.payload;
        },
        clearUser(state) {
            state.user = null;
            state.token = null;
            state.status = 'idle';
            state.error = null;
        },
        updateUserProfile(state, action: PayloadAction<Partial<User>>) {
            if (state.user) {
                state.user = {...state.user, ...action.payload};
            }
        },
    },
    extraReducers: (builder) => {
        builder
            // userLogin
            .addCase(userLogin.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(userLogin.fulfilled, (state, action: PayloadAction<string>) => {
                state.status = "success";
                state.token = action.payload;
            })
            .addCase(userLogin.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload || "Erreur inconnue";
            })
            // fetchUserProfile
            .addCase(fetchUserProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = "success";
                state.user = action.payload;
            })
            .addCase(fetchUserProfile.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload || "Erreur inconnue";
            })
            // loginAndFetchProfile
            .addCase(loginAndFetchProfile.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(loginAndFetchProfile.fulfilled, (state, action: PayloadAction<{ user: User; token: string }>) => {
                state.status = "success";
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(loginAndFetchProfile.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload || "Erreur inconnue";
            })
            // updateUserProfileAsync
            .addCase(updateUserProfileAsync.pending, (state) => {
                state.status = "loading";
                state.error = null;
            })
            .addCase(updateUserProfileAsync.fulfilled, (state, action: PayloadAction<User>) => {
                state.status = "success";
                if (state.user) {
                    state.user = {...state.user, ...action.payload};
                }
            })
            .addCase(updateUserProfileAsync.rejected, (state, action) => {
                state.status = "error";
                state.error = action.payload || "Erreur inconnue";
            });
    },
});

export const {setToken, setUser, clearUser, updateUserProfile} = userSlice.actions;
export default userSlice.reducer;

export type {User, UserCredentials};
