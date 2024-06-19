import { Schema, SchemaTypes, model } from 'mongoose';

const commentSchema = new Schema(
    {
        content: {
            type: String,
            required: [true, 'comment content not provided']
        },
        userId: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: [true, 'user id not provided']
        }
    },
    {
        timestamps: true
    }
)

const blogSchema = new Schema(
    {
        title: {
            type: String,
            required: [true, 'blog title not provided'],
            minLength: 5,
            maxLength: 100
        },
        description: {
            type: String,
            required: [true, 'blog description not provided'],
            minLength: 0,
            maxLength: 250
        },
        content: {
            type: String,
            required: [true, 'blog content not provided']
        },
        // give the contentType to image/png or something else
        coverimage: {
            type: Buffer,
            required: [true, 'blog coverimage not provided']
        },
        imageMimeType: {
            type: String,
            required: [true, 'mime-type not provided']
        },
        authorId: {
            type: SchemaTypes.ObjectId,
            ref: 'User',
            required: [true, 'blog authorId not provided']
        },
        authorName: {
            type: String,
            required: [true, 'blog authorName not provided']
        },
        comments: [commentSchema]
    },
    {
        timestamps: true
    }
);


export const Blog = model('Blog', blogSchema);