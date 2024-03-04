import socketio from 'socket.io';
const Room = require('../models/room')
const io = socketio.listen(app);

const roomId = Room._id

io.on('connection', async socket => {
  await socket.join(roomId);
  
  logger.info('Client Connected');
});