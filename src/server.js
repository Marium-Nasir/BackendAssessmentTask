require('dotenv').config()
const express = require('express')
const app = express()
port = process.env.PORT || 8000
require('./db/connection')
const router = require('./router/route')

app.use(express.json())

app.use('/api/employee',router)

app.listen(port,()=>{
    console.log(`sever is running on ${port}`);
})