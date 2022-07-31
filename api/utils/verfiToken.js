import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verfiToken = (req, res, next) => {
    const token = req.cookies.access_token
    if (!token) {
        return next(createError(401, "Your are not authenticated"))
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) return next(createError(404, "Token is not valid"))

        req.user = user;

        next()
    })
}