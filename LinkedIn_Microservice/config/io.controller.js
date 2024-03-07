const { Server } = require('socket.io')


module.exports = async (http) => {

    const io = new Server(http, {
        // pingTimeout: 60000,
        cors: {
            origin: process.env.CLIENT_URL
        }
    })

    io.on("connection", (socket) => {
        console.log(`⚡: ${socket.id} user just connected!`)
        socket.on('disconnect', () => {
            console.log(`🔥: ${socket.id} disconnected`);
        });

        socket.on("notification-room", (userId) => {
            console.log(userId)
            socket.join(userId);

            console.log("room joined");
        })





    })

}