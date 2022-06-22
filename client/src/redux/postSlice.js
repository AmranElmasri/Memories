import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState: { posts: [] },
    reducers: {
        getPostsAction: (state, action) => {
            state.posts = action.payload;
        },
        createPostAction: (state, action) => {
            state.posts = [...state.posts, action.payload]
        }
    }
});

export const { getPostsAction, createPostAction } = postsSlice.actions;

export default postsSlice.reducer;
