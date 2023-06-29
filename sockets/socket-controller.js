const { Socket } = require('socket.io');
const { checkJWT } = require('../helpers');

const socketController = async (socket = new Socket()) => {
  const user = await checkJWT(socket.handshake.headers['x-token']);
  if (!user) {
    return socket.disconnect();
  }

  console.log('Cliente conectado: ', user.name);
}

module.exports = {
  socketController
}
