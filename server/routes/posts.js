import express from 'express';
import getPosts from '../controller/getPosts.js';
import createPost from '../controller/createPost.js';

const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);


export default router;
