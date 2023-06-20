const express = require('express');
const cors = require('cors');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.usersPath = '/api/users';

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  middlewares() {
    this.app.use(express.static('public'));
    this.app.use(cors());
  }

  routes() {
    this.app.use(this.usersPath, require('../routes/user.routes'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}!`);
    });
  }
}

module.exports = Server;
