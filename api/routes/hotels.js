import express from 'express'
import {
    allHotel,
    createHotel,
    deleteHotel,
    singleHotel,
    upDatedHotel
} from '../controllers/Hotel.js'
import { adminVerify } from '../utils/verfiToken.js'


const route = express.Router()

// CREATE HOTEL
route.post('/', adminVerify, createHotel)

// UPDATE HOTEL
route.put('/:id', adminVerify, upDatedHotel)

// DELETE HOTEL
route.delete('/:id', adminVerify, deleteHotel)

// GET 
route.get('/:id', singleHotel)

// GET ALL
route.get('/', allHotel)

export default route