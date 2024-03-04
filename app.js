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
const http = require('http')
const express = require('express')
const cors = require('cors')
const multer = require('multer')
const path = require('path')
const app = express()
const socket = require('socket.io')
const server = new http.Server(app)
// socker(server)


require('./config/db')

app.use(cors())
app.use(express.json({ extended: true }));
app.use(express.urlencoded({ extended: true }));

app.use('/uploads',express.static(path.join(__dirname, 'uploads')))
app.use("/", require('./routes'))
app.listen(process.env.PORT, () => {
    console.log("server connected 8080")
})

server.listen(process.env.Server_PORT, () => {
    console.log(`Socket listening on port ${process.env.SERVER_PORT}`)
})