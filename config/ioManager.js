const {Server} =  require('socket.io')
const { createMessages } = require('../services/message.service')

module.exports = async(http) => {

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

      socket.on("room-join",(roomId)=>{
          socket.join(roomId);
          console.log("room joinded");
      })

    socket.on('message', async ({content, roomId, sender})=> {
        console.log(content, " " , roomId, " ", sender)
        const response = await createMessages(roomId, sender, content)
        
    //   socket.emit("message", {
    //         content: content,
    //         roomId: roomId, 
    //         sender: response?.sender 
    //       })

    io.to(roomId).emit("message", {
        content: content,
        roomId: roomId,
        sender: response?.sender,
    })

    })



})

}