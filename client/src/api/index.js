import axios from 'axios';
import { getPostsAction } from '../redux/postSlice';
import { createPostAction } from '../redux/postSlice';
import { useDispatch } from 'react-redux';

const url = 'http://localhost:4000/api/v1/posts';

export const fetchPosts = await axios.get(url);

export const createPost = async (post) => {
    const dispatch = useDispatch()
    try {
        const { data } = axios.post(url, post);
        dispatch(data)

    } catch (error) {
        console.log(error.message)

    }
}