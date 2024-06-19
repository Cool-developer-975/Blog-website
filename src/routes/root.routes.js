import { Router } from 'express';
import { authenticate, rootAuthenticate } from '../middlewares/authenticate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { __dirname } from '../../root.js';
import { join } from 'path';
import { userLogin } from '../controllers/users.login.js'
import { userSignUp } from '../controllers/users.signup.js'
import { getAllBlogs, getBlogs } from '../controllers/user.blogs.js';

export const rootRouter = Router();

rootRouter.route('/').get(asyncHandler(rootAuthenticate), (req, res) => {
    res.sendFile(join(__dirname, 'public', 'login.html'));
});

rootRouter.route('/login').post(asyncHandler(userLogin));
rootRouter.route('/signup').post(asyncHandler(userSignUp));

rootRouter.route('/blogs').get(asyncHandler(authenticate), asyncHandler(getAllBlogs));

rootRouter.route('/blogs/:skip').get(asyncHandler(authenticate), asyncHandler(getBlogs));