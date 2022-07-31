import express from 'express'
import { allUser, deleteUser, singleUser, updateUser } from '../controllers/User.js'
import { adminVerify, userVerfi } from '../utils/verfiToken.js'

const route = express.Router()


//finding user
route.get('/:id', userVerfi, singleUser)

//finding Alluser
route.get('/', userVerfi, allUser)

// updating user
route.put('/update/:id', userVerfi, updateUser)

// delete user
route.delete('/delete/:id', userVerfi, deleteUser)


export default route