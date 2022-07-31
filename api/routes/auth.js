import express from 'express'
import { login, register } from '../controllers/Auth.js'
const route = express.Router()

// CREATE USER
route.post('/register', register)

// User Login
route.post('/login', login)

export default route