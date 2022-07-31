import User from "../models/User.js";
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

// User registration
export const register = async (req, res, next) => {
    try {
        // encoding password
        const salt = await bcrypt.genSalt(10)
        const hashPassword = await bcrypt.hash(req.body.password, salt)


        const newUser = new User({
            username: req.body.username,
            email: req.body.email,
            password: hashPassword,
        })
        await newUser.save()

        res.status(200).json(newUser)
    } catch (error) {
        next(error)
    }
}

// User login

export const login = async (req, res, next) => {
    try {

        const user = await User.findOne({ "username": req.body.username })

        if (!user) return
        next(404, "User not found!")

        const isPassword = bcrypt.compare(req.body.password, user.password)

        if (!isPassword) return
        next(400, "wrong password or user name")

        //creating  jwt 
        const token = jwt.sign({ id: user.id, isAdmin: user.isAdmin }, process.env.JWT_SECRET)

        const { password, isAdmin, ...others } = user._doc
        res.cookie("access_token", token, {
            httpOnly: true,
        }).status(200).json({ ...others })

    } catch (error) {
        next(error)
    }
}