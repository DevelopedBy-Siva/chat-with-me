const express = require("express");
const http = require("http");
const app = express();
const config = require("config");

const logger = require("./logger");
require("./exceptions/globalExceptions");
require("./db");
require("express-async-errors");
require("./routes/route")(app);
require("dotenv").config();

const server = http.createServer(app);

const PORT = config.get("api_port");
server.listen(PORT, () => {
  logger.info(`Application started at Port ${PORT}`);
});

module.exports = app;
