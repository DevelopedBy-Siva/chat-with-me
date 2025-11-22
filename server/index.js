const express = require("express");
const http = require("http");
const config = require("config");
const app = express();

const logger = require("./logger");
const socket = require("./socket");
require("./exceptions/globalExceptions");
require("./db");
require("express-async-errors");
require("./routes/route")(app);

/**
 * Create server using HTTP module
 */
const server = http.createServer(app);

/**
 * Socket.io server
 */
socket.connect(server);

const port = config.get("api_port");
server.listen(port, () => {
  logger.info(`Development server running on port ${port}`);
  logger.info(`API: http://localhost:${port}/api`);
  logger.info(`Socket.io: http://localhost:${port}`);
  logger.info(`Health: http://localhost:${port}/health`);
});

module.exports = { app, server };
