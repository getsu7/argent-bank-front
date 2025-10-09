import {createSlice} from "@reduxjs/toolkit";
import type {User} from "../models/UserTypes.ts";


export interface UserState {
    user: {
        user: User;
    };
}

const initialState = {
    user: {
        id: '',
        email: '',
        firstname: '',
        lastname: '',
    }
}

export const userSlice = createSlice({
    name: "user",
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        },
        clearUser: (state) => {
            state.user = initialState.user;
        }
    }
})

export const {setUser, clearUser} = userSlice.actions;

export default userSlice.reducer;