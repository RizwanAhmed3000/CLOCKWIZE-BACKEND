import jwt from 'jsonwebtoken';
import { createError } from './error.js'

export const verifyToken = (req, res, next) => {
    const token = req.body.access_token;
    // console.log(token)
    if (!token) {
        return next(createError(401, "You are not authenticated!!"))
    }
    jwt.verify(token, process.env.JWT, (err, user) => {
        if (err) {
            return next(createError(403, "Invaild token!!"))
        }
        req.user = user
        // console.log(req.user.user, "====>>>> req.user")
        next();
    })
}