import express from 'express'
import {
    allHotel,
    countByCity,
    countBytype,
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

// get hotel by count by city
route.get('/countByCity', countByCity)

// get hotel by count by type 
route.get('/countBytype', countBytype)

// GET SINGLE HOTEL
route.get('/:id', singleHotel)

// GET ALL HOTEL
route.get('/', allHotel)


export default route