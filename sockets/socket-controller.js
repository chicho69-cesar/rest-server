const { Socket } = require('socket.io');
const { checkJWT } = require('../helpers');
const { ChatMessages } = require('../models');

const chatMessages = new ChatMessages();

const socketController = async (socket = new Socket(), io) => {
  const user = await checkJWT(socket.handshake.headers['x-token']);
  if (!user) {
    return socket.disconnect();
  }

  // Add the user connected
  chatMessages.connectUser(user);

  io.emit('users-active', chatMessages.usersArr);
  socket.emit('receive-messages', chatMessages.lastTen);

  // Connect the user to an specific room
  socket.join(user.id); // global, socket.id, user.id

  // Send messages
  socket.on('send-message', ({ uid, message }) => {
    if (uid) {
      socket.to(uid).emit('message-private', { from: user.name, message });
    } else {
      chatMessages.sendMessage(user.id, user.name, message);
      io.emit('receive-messages', chatMessages.lastTen);
    }
  });

  // Clean when somebody disconnect himself
  socket.on('disconnect', () => {
    chatMessages.disconnectUser(user.id);
    io.emit('users-active', chatMessages.usersArr);
  });
}

module.exports = {
  socketController
}
