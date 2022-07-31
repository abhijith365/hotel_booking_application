import express from 'express'
import {
    allHotel,
    createHotel,
    deleteHotel,
    singleHotel,
    upDatedHotel
} from '../controllers/Hotel.js'


const route = express.Router()

// CREATE HOTEL
route.post('/', createHotel)

// UPDATE HOTEL
route.put('/:id', upDatedHotel)

// DELETE HOTEL
route.delete('/:id', deleteHotel)

// GET 
route.get('/:id', singleHotel)

// GET ALL
route.get('/', allHotel)

export default route