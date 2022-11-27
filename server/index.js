const express = require("express");
const http = require("http");
const config = require("config");
const app = express();
require("./routes/route")(app);

/**
 * Create server using HTTP module
 */
const server = http.createServer(app);

/**
 * Server Configuration:- Looks for env variable PORT, and if not found, default port is set
 */
const port = config.get("app_port");
server.listen(port, () => {
  console.log(`Application started at Port ${port}`);
});
