const express = require("express")
const app = express()
const PORT = process.env.PORT || 8150
require("dotenv").config()
const mongoose = require("mongoose")
const cors = require("cors") 
const NotFound = require("./Utils/notfound")
const AuthRouter = require('./Routes/authRoute')
const productRouter = require('./Routes/productRoute')
const customErrorHandler = require("./Middleware/errorHandler")

app.use(express.json())
app.use(cors())
app.get('/', (req, res)=>{
    res.status(200).json({success: true, msg: "server is running"})
})
app.use("/api/v1/auth/user", AuthRouter)
app.use("/api/v1/product", productRouter)
app.use(NotFound)
app.use(customErrorHandler)
const startServer = async()=>{
    try {
        const connect = await mongoose.connect(process.env.dbURL, {dbName: "Products_DB"})
        console.log(connect.connection.host)
        console.log(connect.connection.name)
        app.listen(PORT, ()=>{
            console.log(`Server is listening on PORT ${PORT}`)
        })
    } catch (error) {
        console.error(`Unable to start the server due to ${error}`)
        process.exit(1)
    }
}
startServer()