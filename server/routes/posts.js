import express from 'express';
import getPosts from '../controller/posts/getPosts.js';
import createPost from '../controller/posts/createPost.js';
import updatePost from '../controller/posts/updatePost.js';
import likePost from '../controller/posts/likePost.js';
import deletePost from '../controller/posts/deletePost.js';
import getPostsBySearch from '../controller/posts/getPostsBySearch.js';
import getPost from '../controller/posts/getPost.js';
import commentPost from '../controller/posts/commentPost.js';


import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/', getPosts);
router.get('/search', getPostsBySearch);
router.get('/:id', getPost);

router.post('/', checkAuth, createPost);
router.patch('/:id', checkAuth, updatePost);
router.patch('/:id/like', checkAuth, likePost);
router.post('/:id/comments', checkAuth, commentPost);
router.delete('/:id', checkAuth, deletePost);


export default router;
