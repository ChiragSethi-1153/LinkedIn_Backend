require('dotenv').config()

try{
    if(process.env.PORT){
        console.log("PORT is " + process.env.PORT)
    }
    else{ 
        process.exit() 
    }
}
catch(err){  
    process.exit() 
}
// const socker = require('./socker')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const app = express()
const socket = require('socket.io')
const http = require('http').Server(app)
module.exports = {http}
// socker(server)

require('./config/ioManager')
require('./config/db')

app.use(cors())
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads',express.static(path.join(__dirname, 'uploads')))
app.use("/", require('./routes'))

http.listen(process.env.PORT, () => {
    console.log(`server connected on ${process.env.PORT}`)
})