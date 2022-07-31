import User from "../models/User.js"


export const updateUser = async (req, res, next) => {
    try {
        const updateUser = await User.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(updateUser)

    } catch (e) {
        next(e)
    }
}

export const deleteUser = async (req, res, next) => {
    try {
        await User.findByIdAndDelete(req.params.id)
        res.status(200).json("User has been deleted")

    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const singleUser = async (req, res, next) => {
    try {
        const getUser = await User.findById(req.params.id)
        res.status(200).json(getUser)
    } catch (e) {
        next(e)
    }
}

export const allUser = async (req, res, next) => {
    try {
        const getAllUser = await User.find()
        res.status(200).json(getAllUser)

    } catch (e) {
        next(e)
    }
}