import { Router } from 'express';
import { authenticate } from '../middlewares/authenticate.js';
import { asyncHandler } from '../utils/asyncHandler.js';
import { __dirname } from '../../root.js';
import { createBlog, deleteBlog, editBlog, getAllUserBlogs, viewBlog } from '../controllers/user.blogs.js';
import { upload } from '../middlewares/upload.js';
import { ApiError } from '../utils/ApiError.js';
import { Blog } from '../models/blogs.models.js';

export const userRouter = Router();

userRouter.route('/dashboard').get(asyncHandler(authenticate), asyncHandler(getAllUserBlogs));

userRouter.route('/blogs/createBlog')
    .post(asyncHandler(authenticate), asyncHandler(upload.single('coverimage')), asyncHandler(createBlog))
    .get(asyncHandler(authenticate), async (req, res) => {
        res.render('createBlog', { edit: false });
    });

userRouter.route('/blogs/editBlog/:id')
    .get(asyncHandler(authenticate), asyncHandler(async (req, res) => {
        const id = req.params.id;
        if (!id) throw new ApiError(401, 'id is not provided');
        const blog = await Blog.findById(id);
        if (!blog) throw new ApiError(404, 'blog not found');
        const data = {
            blog,
            edit: true
        }
        res.render('editBlog', data);
    }))
    .post(asyncHandler(authenticate), asyncHandler(upload.single('coverimage')), asyncHandler(editBlog));

userRouter.route('/blogs/viewBlog/:id')
    .get(
        asyncHandler(authenticate),
        asyncHandler(viewBlog)
    );

userRouter.route('/blogs/deleteBlog/:id')
    .delete(
        asyncHandler(authenticate),
        asyncHandler(deleteBlog)
    )