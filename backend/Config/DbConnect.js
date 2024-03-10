const mongoose = require('mongoose')
require('dotenv').config()

const dbConnect = async () => {
    try{
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('Db connected')
    }catch (e) {
        console.log('Db connection failed',e.message)
    }
}

dbConnect()