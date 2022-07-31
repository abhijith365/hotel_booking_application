import express from 'express'
const route = express.Router()

route.get('/', (req, res) => { res.send("coming from auth") })

export default route