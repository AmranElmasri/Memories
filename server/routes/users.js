import express from 'express';
import logout from '../controller/authentication/logout.js';
import signin from '../controller/authentication/signin.js';
import signup from '../controller/authentication/signup.js';

const router = express.Router();

router.post('/signin', signin);
router.post('/signup', signup);
router.get('/logout', logout);


export default router;