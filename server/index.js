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

/**
 * Server Configuration:- Looks for env variable PORT, and if not found, default port is set
 */
const port = config.get("app_port");
server.listen(port, () => {
  logger.info(`Application started at Port ${port}`);
});
