import { User } from '../models/users.models.js';
import { ApiError } from '../utils/ApiError.js';
import bcrpyt from 'bcrypt';

export const userSignUp = async (req, res, next) => {
    const { name, email, password } = req.body;

    if (!name || !email || !password) throw new ApiError(401, 'Provide all fields', '');
    const hashedPassword = await bcrpyt.hash(password, 10);
    const user = await User.create({
        name,
        email,
        password: hashedPassword
    });

    const token = user.generateAccessToken(user);

    res.cookie('token', token, { httpOnly: true }).redirect('/user/dashboard');
};