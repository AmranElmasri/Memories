import axios from 'axios';
import { getPostsAction, createPostAction, updatePostAction } from '../redux/postSlice';
import { useDispatch, useSelector } from 'react-redux';

export const Api = () => {
    const url = 'http://localhost:4000/api/v1/posts';
    const dispatch = useDispatch();
    const { currentId } = useSelector((state => state.posts));

    return {
        getPosts: async function(){
            try {
                const { data } = await axios.get(url);
                console.log(data, 88);
                dispatch(getPostsAction(data));
            } catch (error) {
                console.log(error.message);
            }
        },
        createPost: async (newPost) => {
            try {
                const { data } = await axios.post(url, newPost);
                dispatch(createPostAction(data));
            } catch (error) {
                console.log(error.message);
            }
        },
        updatePost: async (newPost) => {
            try {
                const { data } = await axios.patch(`http://localhost:4000/api/v1/posts/${currentId}`, newPost);
                dispatch(updatePostAction(data));
            } catch (error) {
                console.log(error.message);
            }
        }
    }

}

export const { getPosts,createPost, updatePost } = Api;
