import Room from '../models/Room.js'
import Hotel from '../models/Hotel.js'
import { createError } from '../utils/error.js'

//create hotel room's
export const createRoom = async (req, res, next) => {

    const newRoom = new Room(req.body)
    const hotelId = req.params.hotelId

    try {
        const savedRoom = await newRoom.save()

        try {
            // adding room id to hotel 
            await Hotel.findByIdAndUpdate(hotelId, { $push: { rooms: savedRoom._id } })
        } catch (error) {
            next(error)
        }

        res.status(200).json(newRoom)

    } catch (e) {
        next(e)
    }
}

//update hotel room's
export const updateRoom = async (req, res, next) => {
    try {
        const updatedRoom = await Room.findByIdAndUpdate(req.params.roomId,
            { $set: req.body },
            { new: true })

        res.status(200).json(updatedRoom)
    } catch (e) {
        next(e)
    }
}

// delete rooms
export const deleteRoom = async (req, res, next) => {
    const hotelId = req.params.hotelId
    try {
        await Room.findByIdAndDelete(req.params.id)
        try {
            // adding room id to hotel 
            await Hotel.findByIdAndUpdate(hotelId, { $pull: { rooms: req.params.id } })
        } catch (error) {
            next(error)
        }

        res.status(200).json("Room has been deleted")
    } catch (e) {
        next(e)
    }
}

// get single roomm 
export const singlRoom = async (req, res, next) => {
    try {
        const room = await Hotel.findById(req.params.roomId)
        res.status(200).json(room)
    } catch (e) {
        next(e)
    }
}

// get all rooms
export const allRoom = async (req, res, next) => {
    try {
        const getAllRooms = await Room.find()
        res.status(200).json(getAllRooms)
    } catch (e) {
        next(e)
    }
}