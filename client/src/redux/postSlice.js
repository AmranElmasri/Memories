import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState: { posts: [], currentId: null },
    reducers: {
        getPostsAction: (state, action) => {
            state.posts = action.payload;
        },
        createPostAction: (state, action) => {
            state.posts = [...state.posts, action.payload]
        },
        createCurrentId: (state, action) => {
            state.currentId = action.payload;
        },
        updatePostAction: (state, action) =>{
            state.posts = state.posts.map((post) => post._id === state.currentId ? action.payload : post);
        },
        deletePostAction: (state, action) =>{
            state.posts = state.posts.filter((post) => post._d !== action.payload);
        },
        likePostAction: (state, action) =>{
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
        }
    }
});

export const { getPostsAction, createPostAction, createCurrentId, updatePostAction, deletePostAction, likePostAction } = postsSlice.actions;

export default postsSlice.reducer;
