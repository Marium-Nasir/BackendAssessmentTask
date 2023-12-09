require('dotenv').config()
const mongoose = require('mongoose')
mongoose.connect(process.env.dbURI).then(()=>{
    console.log(`success`);
}).catch((err)=>{
    console.log(err);
})