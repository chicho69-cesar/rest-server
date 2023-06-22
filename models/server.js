const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    this.authPath = '/api/auth';
    this.usersPath = '/api/users';

    // Connect to DB
    this.connectToDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();
  }

  async connectToDB() {
    await dbConnection();
  }

  middlewares() {
    // CORS
    this.app.use(cors());
    // Parse and read body
    this.app.use(express.json());
    // Use public folder for static files
    this.app.use(express.static('public'));
  }

  routes() {
    this.app.use(this.authPath, require('../routes/auth.route'));
    this.app.use(this.usersPath, require('../routes/user.route'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}!`);
    });
  }
}

module.exports = Server;
