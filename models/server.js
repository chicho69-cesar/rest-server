const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../database/config');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;

    // Paths
    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
    };

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
    this.app.use(this.paths.auth, require('../routes/auth.route'));
    this.app.use(this.paths.users, require('../routes/user.route'));
    this.app.use(this.paths.categories, require('../routes/categories.route'));
  }

  listen() {
    this.app.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}!`);
    });
  }
}

module.exports = Server;
