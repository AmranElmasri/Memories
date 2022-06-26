import express from 'express';
import signin from '../controller/authentication/signin.js';
import signup from '../controller/authentication/signup.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);


export default router;