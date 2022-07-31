import express from "express"
import dotenv from 'dotenv'
import morgan from "morgan"
import connect from './config/db.js'
import authRouter from './routes/auth.js'
import hotelRouter from './routes/hotels.js'
import roomsRouter from './routes/rooms.js'
import usersRouter from './routes/users.js'
import cookieParser from "cookie-parser"

const app = express()

// body parser middlewares
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(cookieParser())


// logger 
app.use(morgan('dev'))

//setting env config
dotenv.config()


//router middlewares
app.use('/auth', authRouter)
app.use('/hotels', hotelRouter)
app.use('/rooms', roomsRouter)
app.use('/users', usersRouter)


//ROUTER ERROR HANDLER MIDDLEWARE
app.use((err, req, res, next) => {
    const errorStatus = err.status || 500
    const errorMeg = err.message || "Something went wrong"

    return res.status(errorStatus).json({
        success: false,
        status: errorStatus,
        message: errorMeg,
        stack: err.stack,
    })
})

//server running && mongodb server 
const PORT = process.env.PORT || 8800
app.listen(PORT, () => (connect(), console.log(`running on port number ${PORT}`)))