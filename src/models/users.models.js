import { Schema, SchemaTypes, model } from 'mongoose';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const userSchema = new Schema(
    {
        name: {
            type: String,
            required: [true, 'name not provided'],
            minLength: 2,
            maxLength: 50
        },
        email: {
            type: String,
            lowercase: true,
            unique: [true, 'email already exists not unique'],
            required: [true, 'email not provided'],
            minLength: 5,
            maxLength: 254
        },
        password: {
            type: String,
            required: [true, 'not provided'],
            minLength: 12,
            maxLength: 128
        },
        blogs: [{
            type: SchemaTypes.ObjectId,
            ref: 'Blog'
        }]
    },
    {
        timestamps: true
    }
);

userSchema.pre('save', async function (next) {
    if (!this.isModified(this.password)) return next();
    // make the salt to 12 or > for productions
    this.password = await bcrypt.hash(this.password, 10);
    next();
});

userSchema.methods.generateAccessToken = function (user) {
    return jwt.sign(
        {
            _id: user._id,
            name: user.name,
            email: user.email,
            blogs: user.blogs
        },
        process.env.ACCESS_TOKEN_SECRET,
        {
            expiresIn: '10h'
        }
    );
}

userSchema.methods.isPasswordCorrect = async function (password) {

    return await bcrypt.compare(password, this.password);
};

export const User = model('User', userSchema);