import express from 'express';
import getPosts from '../controller/getPosts.js';
import createPost from '../controller/createPost.js';
import updatePost from '../controller/updatePost.js';


const router = express.Router();

router.get('/', getPosts);
router.post('/', createPost);
router.patch('/:id', updatePost);


export default router;
