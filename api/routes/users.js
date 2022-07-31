import express from 'express'
import { allUser, deleteUser, singleUser, updateUser } from '../controllers/User.js'
const route = express.Router()

//finding user
route.get('/:id', singleUser)

//finding Alluser
route.get('/', allUser)

// updating user
route.put('/update/:id', updateUser)

// delete user
route.delete('/delete/:id', deleteUser)


export default route