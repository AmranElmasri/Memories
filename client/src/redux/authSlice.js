import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'auth',
    initialState: { authData: null },
    reducers: {
        authAction: (state, action) => {
            state.authData = action.payload;
        }
    }
});

export const { authAction } = postsSlice.actions;

export default postsSlice.reducer;
