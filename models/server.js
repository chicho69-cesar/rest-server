const server = require('node:http');
const express = require('express');
const socketIO = require('socket.io');
const cors = require('cors');
const fileUpload = require('express-fileupload');

const { dbConnection } = require('../database/config');
const { socketController } = require('../sockets/socket-controller');

class Server {
  constructor() {
    this.app = express();
    this.port = process.env.PORT;
    this.server = server.createServer(this.app);
    this.io = socketIO(this.server);

    // Paths
    this.paths = {
      auth: '/api/auth',
      users: '/api/users',
      categories: '/api/categories',
      products: '/api/products',
      search: '/api/search',
      uploads: '/api/uploads'
    };

    // Connect to DB
    this.connectToDB();

    // Middlewares
    this.middlewares();

    // Routes
    this.routes();

    // Sockets
    this.sockets();
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
    // File upload
    this.app.use(fileUpload({
      useTempFiles: true,
      tempFileDir: '/tmp/',
      createParentPath: true
    }));
  }

  routes() {
    this.app.use(this.paths.auth, require('../routes/auth.route'));
    this.app.use(this.paths.users, require('../routes/user.route'));
    this.app.use(this.paths.categories, require('../routes/categories.route'));
    this.app.use(this.paths.products, require('../routes/products.route'));
    this.app.use(this.paths.search, require('../routes/search.route'));
    this.app.use(this.paths.uploads, require('../routes/upload.route'));
  }

  sockets() {
    this.io.on('connection', (socket) => socketController(socket, this.io));
  }

  listen() {
    this.server.listen(this.port, () => {
      console.log(`Server is running on port ${this.port}!`);
    });
  }
}

module.exports = Server;
