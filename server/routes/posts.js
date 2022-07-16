import express from 'express';
import getPosts from '../controller/posts/getPosts.js';
import createPost from '../controller/posts/createPost.js';
import updatePost from '../controller/posts/updatePost.js';
import likePost from '../controller/posts/likePost.js';
import deletePost from '../controller/posts/deletePost.js';

import checkAuth from '../middleware/checkAuth.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', checkAuth, createPost);
router.patch('/:id', checkAuth, updatePost);
router.patch('/:id/like', checkAuth, likePost);
router.delete('/:id', checkAuth, deletePost);
 

export default router;
