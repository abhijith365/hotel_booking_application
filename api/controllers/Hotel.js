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
    const { min, max, ...others } = req.query
    try {
        const allHotel = await Hotel.find({ ...others, cheapestPrice: { $gte: min || 1, $lte: max || 99999 } }).limit(req.query.limit)
        res.status(200).json(allHotel)
    } catch (e) {
        next(e)
    }
}

export const countByCity = async (req, res, next) => {
    try {
        const cities = req.query.cities.split(',')
        const cityList = await Promise.all(cities.map(item => {
            return Hotel.countDocuments({ city: item })
        }))
        res.status(200).json(cityList)
    } catch (error) {
        next(error)
    }
}

export const countBytype = async (req, res, next) => {
    try {
        const hotelCount = await Hotel.countDocuments({ type: "hotel" })
        const apartmentsCount = await Hotel.countDocuments({ type: "apartment" })
        const resortsCount = await Hotel.countDocuments({ type: "resort" })
        const villasCount = await Hotel.countDocuments({ type: "villa" })
        const cabinsCount = await Hotel.countDocuments({ type: "cabin" })

        const totalCount = [
            { "type": "hotels", count: hotelCount },
            { type: "Apartments", count: apartmentsCount },
            { type: "Resorts", count: resortsCount },
            { type: "Villas", count: villasCount },
            { type: "Cabins", count: cabinsCount }
        ]

        res.status(200).json(totalCount)
    } catch (error) {
        next(error)
    }
}