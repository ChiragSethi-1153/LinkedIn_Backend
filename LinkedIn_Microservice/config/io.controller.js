const { Server } = require("socket.io");

let recievers, content;

exports.handlePostNotifications = (reciever, body) => {
  console.log(reciever, " ", body)
  recievers = reciever;
  content = body;
  console.log(recievers, ' ', content)
};

const sendNotification = (socket) => {
  try{
    socket.emit(recievers, content);
    recievers = ''
    content = ''
    console.log(recievers, "as", content)
  }catch(err){
    console.log(err)
  }
}

exports.ioController = async (http) => {
  try {
    const io = new Server(http, {
      // pingTimeout: 60000,
      cors: {
        origin: process.env.CLIENT_URL,
      },
    });

    io.on("connection", (socket) => {
      console.log(`⚡: ${socket.id} user just connected!`);
      socket.on("disconnect", () => {
        console.log(`🔥: ${socket.id} disconnected`);
      });

      socket.on("notification-room", (userId) => {
        console.log(userId);
        socket.join(userId);

        console.log("room joined");

      });
      
      sendNotification(socket)
      
    });
  
} catch (err) {
    console.log(err);
  }
};
