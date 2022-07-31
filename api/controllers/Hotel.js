import Hotel from '../models/Hotel.js'

export const createHotel = async (req, res, next) => {

    const newHotel = new Hotel(req.body)

    try {
        const savedHotel = await newHotel.save()
        res.status(200).json(savedHotel)

    } catch (e) {
        next(e)
    }
}

export const upDatedHotel = async (req, res, next) => {
    try {
        const upDatedHotel = await Hotel.findByIdAndUpdate(req.params.id,
            { $set: req.body },
            { new: true }
        )
        res.status(200).json(upDatedHotel)

    } catch (e) {
        next(e)
    }
}

export const deleteHotel = async (req, res, next) => {
    try {
        await Hotel.findByIdAndDelete(req.params.id)
        res.status(200).json("Hotel has been deleted")

    } catch (e) {
        console.log(e)
        next(e)
    }
}

export const singleHotel = async (req, res, next) => {
    try {
        const hotel = await Hotel.findById(req.params.id)
        res.status(200).json(hotel)
    } catch (e) {
        next(e)
    }
}

export const allHotel = async (req, res, next) => {
    try {
        const allHotel = await Hotel.find()
        res.status(200).json(allHotel)
    } catch (e) {
        next(e)
    }
}