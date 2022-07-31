import jwt from 'jsonwebtoken'
import { createError } from './error.js'

export const verifiToken = (req, res, next) => {

    const token = req.cookies.access_token

    if (!token) return next(createError(401, "Your are not authenticated"))


    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {

        if (err) return next(createError(404, "Token is not valid"))

        req.user = user;

        next()
    })
}

// cheking is user
export const userVerfi = (req, res, next) => {

    verifiToken(req, res, next, () => {
        const userId = req.user.id
        const isAdmin = req.user.isAdmin

        if (req.params.id === userId || isAdmin) {
            next()
        } else {
            return next(createError(403, "Your not authorized"))
        }

    })
}

export const adminVerify = (req, res, next) => {
    verifiToken(req, res, next, () => {
        try {
            const isAdmin = req.user.isAdmin
            if (isAdmin) {
                next()
            } else {
                next(createError(403, "Your not authorized"))
            }
        } catch (error) {
            console.log(error)
        }

    })
}