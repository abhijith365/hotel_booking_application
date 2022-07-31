import express from 'express'
import { allRoom, createRoom, deleteRoom, singlRoom, updateRoom } from '../controllers/Room.js'
import { adminVerify } from '../utils/verfiToken.js'
const route = express.Router()

// create room
route.post('/:hotelId', adminVerify, createRoom)

// update room
route.put('/update/:roomId', adminVerify, updateRoom)

//delete room 
route.delete('/delete/:id/:hotelId', adminVerify, deleteRoom)

//get single room 
route.get('/:roomId', singlRoom)

//get all rooms
route.get('/', allRoom)

export default route