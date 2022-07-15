import { createSlice } from "@reduxjs/toolkit";

export const postsSlice = createSlice({
    name: 'posts',
    initialState: { posts: [], currentId: null, updateChange: false, isLoading: false, post: null },
    reducers: {
        getPostsByPageAction: (state, action) => {
            state.posts = action.payload.posts;
            state.totalPages = action.payload.totalPages;
            state.currentPage = action.payload.currentPage;
        },
        getPostAction: (state, action) => {
            state.post = action.payload;
        },
        getPostBySearchAction: (state, action) => {
            state.posts = action.payload;
        },
        createPostAction: (state, action) => {
            state.posts = [...state.posts, action.payload];
        },
        createCurrentId: (state, action) => {
            state.currentId = action.payload;
        },
        updatePostAction: (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
        },
        deletePostAction: (state, action) => {
            state.posts = state.posts.filter((post) => post._id !== action.payload);
        },
        likePostAction: (state, action) => {
            state.posts = state.posts.map((post) => post._id === action.payload._id ? action.payload : post);
        },
        updateChangeAction: (state, action) => {
            state.updateChange = action.payload;
        },
        isLoadingAction: (state, action) => {
            state.isLoading = action.payload;
        },
    }
});

export const { getPostsByPageAction, createPostAction, createCurrentId, updatePostAction, deletePostAction, likePostAction, updateChangeAction, getPostBySearchAction, isLoadingAction, getPostAction } = postsSlice.actions;

export default postsSlice.reducer;
