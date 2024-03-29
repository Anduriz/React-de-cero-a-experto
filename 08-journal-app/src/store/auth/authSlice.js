import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    status: 'checking',
    // 'not-authenticated, 'authenticated'
    uid: null,
    email: null,
    displayName: null,
    photoURL: null,
    errorMessage: null,
}

export const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        login: (state, {payload}) => {
            state.status = 'authenticated';
            // 'not-authenticated, 'authenticated'
            state.uid = payload.uid;
            state.email = payload.email;
            state.displayName = payload.dispatch;
            state.photoURL = payload.photoURL;
            state.errorMessage = null;
        },
        logout: (state, {payload}) => {
            state.status = 'non-authenticated';
            // 'not-authenticated, 'authenticated'
            state.uid = null;
            state.email = null;
            state.displayName = null;
            state.photoURL = null;
            state.errorMessage = payload?.errorMessage;
        },
        chekingCredentials: (state) => {
            state.status = 'checking'
        }
    },
})

export const { login, logout, chekingCredentials } = authSlice.actions;