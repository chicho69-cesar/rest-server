const { Socket } = require('socket.io');

const socketController = (socket = new Socket()) => {
  console.log(`New client connected: ${socket.id}`);
}

module.exports = {
  socketController
}
