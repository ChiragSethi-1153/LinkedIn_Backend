const mongoose = require('mongoose')

mongoose.connect(process.env.DB_URL, {
    dbName: process.env.DB_NAME
})

mongoose.connection.on("connected", () => {
    console.log("Mongoose connected to db" )
})

mongoose.connection.on('error', (err) => {
    console.log(err.message)
})

mongoose.connection.on('disconnected', (err) => {
    console.log("Mongoose connection is disconnected.");
})

process.on("SIGINT", async() => {
    await mongoose.connection.close()
    process.exit();
});

module.exports = mongoose;