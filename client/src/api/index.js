import axios from 'axios';

const url = 'http://localhost:4000/api/v1/posts';

export const fetchPosts = axios.get(url);