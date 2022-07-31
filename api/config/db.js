import mongoose from "mongoose";


const connect = () => {
    try {
        mongoose.connect(process.env.MONGO_URI, () => { console.log("connected to mongoDB") })
    } catch (error) {
        console.log(error)
    }
}

mongoose.connection.on("disconnected", () => {
    console.log("mongoDB disconnected")
})

mongoose.connection.on("connected", () => {
    console.log("mongoDB connected")
})

export default connect


