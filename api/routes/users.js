import express from 'express'
import { allUser, deleteUser, singleUser, updateUser } from '../controllers/User.js'
import { adminVerify, userVerfi } from '../utils/verfiToken.js'

const route = express.Router()

// updating user
route.put('/update/:id', userVerfi, updateUser)

// delete user
route.delete('/delete/:id', userVerfi, deleteUser)

//finding user
route.get('/:id', userVerfi, singleUser)

//finding Alluser
route.get('/', adminVerify, allUser)


export default route