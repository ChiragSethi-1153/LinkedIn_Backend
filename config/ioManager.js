const { Server } = require('socket.io')

module.exports = async() => {

const io = require('socket.io')(Server, {
    pingTimeout: 60000,
    cors: {
        origin: process.env.CLIENT_URL
    }
})

io.on("connection", (socket) => {
    console.log(`⚡: ${socket.id} user just connected!`)
    socket.on('disconnect', () => {
        console.log('🔥: A user disconnected');
      });

    socket.on('room', (roomId)=> {
        socket.join(roomId)
    })

})

}