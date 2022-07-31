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

    verifiToken(req, res, () => {
        const userId = (req.user) ? (req.user.id) ? req.user.id : null : null
        const isAdmin = (req.user) ? (req.user.isAdmin) ? req.user.isAdmin : null : null

        if (req.params.id === userId || isAdmin) {
            next()
        } else {
            return next(createError(403, "Your not authorized"))
        }

    })
}

export const adminVerify = (req, res, next) => {
    verifiToken(req, res, () => {
        try {
            const isAdmin = (req.user) ? (req.user.isAdmin) ? req.user.isAdmin : null : null
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