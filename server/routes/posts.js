import express from 'express';
import getPosts from '../controller/getPosts.js';
import createPost from '../controller/createPost.js';
import updatePost from '../controller/updatePost.js';
import likePost from '../controller/likePost.js';
import deletePost from '../controller/deletePost.js';


const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);
router.patch('/:id/like', likePost);
router.delete('/:id', deletePost);


export default router;
