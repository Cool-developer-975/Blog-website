import { ApiError } from '../utils/ApiError.js';
import { ApiResponse } from '../utils/ApiResponse.js'
import { Blog } from '../models/blogs.models.js';
import { User } from '../models/users.models.js';
import { readFileSync, unlinkSync } from 'fs';
import {marked} from 'marked';

export const getAllBlogs = async (req, res, next)=>{
    const blogs = await Blog.find({}).sort({'createdAt': -1, 'updateAt': -1});
    const data = {
        blogs
    }
    res.render('blogs', data)
};

export const getBlogs = async (req, res, next) =>{
    const skip = req.params.skip;
    const blogs = await Blog.find({}).sort({'createdAt': -1, 'updateAt': -1}).skip(skip).limit(10);
    res.status(201).json(blogs);
};

export const getAllUserBlogs = async (req, res, next) => {
    const user = req?.user;
    if (!user) throw new ApiError(404, 'user details are not present');
    const blogs = await Blog.find({ authorId: user._id });
    // console.log(blogs);
    const data = {
        userName: user.name,
        blogs
    }
    res.render('userDashboard', data)
};

export const createBlog = async (req, res, next) => {
    let { title, description, content } = req.body;
    // console.log(req.user);
    title = title.trim();
    description = description.trim();
    content = content.trim();
    const coverImage = req.file;
    // console.log('coverimage: \n', coverImage);
    const coverimageBuffer = Buffer.from(readFileSync(coverImage.path));
    const blog = await Blog.create(
        {
            title,
            description,
            content,
            coverimage: coverimageBuffer,
            imageMimeType: coverImage.mimetype,
            authorId: req.user._id,
            authorName: req.user.name
        }
    );
    // console.log('created blog', blog);
    const updatedUser = await User.findByIdAndUpdate(
        req.user._id,
        {
            '$push': {
                'blogs': blog._id
            }
        }
    );
    unlinkSync(coverImage.path);
    res.status(201).redirect('/user/dashboard');
};


export const editBlog = async (req, res, next) => {
    const blogId = req.params.id;
    if (!blogId) throw new ApiError(402, 'blog id not provided');
    const { title, description, content } = req.body;
    const coverImage = req?.file;
    const update = {
        $set: {
            'title': title.trim(),
            'description': description.trim(),
            'content': content.trim(),
        }
    };
    
    if (coverImage) {
        console.log('coverimage: ', coverImage);
        const imageBuffer = Buffer.from(readFileSync(coverImage.path));
        unlinkSync(coverImage.path);
        update.$set.coverimage = imageBuffer;
        update.$set.imageMimeType = coverImage.mimetype;
    }
    const updateBlog = await Blog.findByIdAndUpdate(
        blogId,
        update,
        {
            returnOriginal: false
        }
    );
    console.log(updateBlog);
    res.status(201).redirect('/user/dashboard');
};

export const viewBlog = async (req, res, next) => {

    const blogId = req.params?.id;
    if (!blogId) throw new ApiError(401, 'blog id not provided');
    const blog = await Blog.findById(blogId);
    if (!blog) throw new ApiError(404, 'Blog not found');
    blog.content = marked(blog.content);
    const data = {
        blog
    }
    res.render('viewBlog', data);
};

export const deleteBlog = async (req, res, next) => {
    const blogId = req.params?.id;
    if (!blogId) throw new ApiError(401, 'blog id not provided');
    const result = await Blog.deleteOne({ _id: blogId });
    const user = await User.updateOne(
        {
            _id: req.user._id
        },
        {
            $pull: {
                blogs: blogId
            }
        },
    );
    console.log(user);
    res.status(200).send(new ApiResponse(200, 'blog deleted successfully'));
};