import jwt from "jsonwebtoken";

export const rootAuthenticate = async (req, res, next) => {
    const token = req?.cookies?.token;

    if (!token) return next();
    let user = null;
    try {
        user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        res.clearCookie('token');
        return next();
    }
    
    req.user = user;

    res.redirect('/user/dashboard');
};

export const authenticate = async (req, res, next) => {
    const token = req?.cookies?.token;
    let user = null;
    if (!token) return res.redirect('/');
    try {
        user = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
    } catch (error) {
        return res.clearCookie('token').redirect('/');
    }
    
    if (!user) return res.clearCookie('token').redirect('/');

    req.user = user;

    next();
};