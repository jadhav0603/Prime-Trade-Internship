const express = require('express')
const app = express()
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()


app.use(express.json())
app.use(cors())

app.get('/',(req,res)=>{
    console.log("Test Route")
})



app.listen(process.env.PORT,async ()=>{
    try {
        await mongoose.connect(process.env.MONGO_URL)
        try {
            console.log('server successfully connected to Database')
        } catch (error) {
            console.log(error)
        }
        
        console.log(`server successfully connected to ${process.env.PORT}`)
    } catch (error) {
        console.log(error)
    }
})