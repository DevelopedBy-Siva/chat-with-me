require("dotenv").config();
const http = require("http");
const logger = require("./logger");
const config = require("config");

const socket = require("./socket");

const server = http.createServer((req, res) => {
  if (req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(
      JSON.stringify({
        status: "healthy",
        service: "socket",
        timestamp: new Date().toISOString(),
      })
    );
  } else {
    res.writeHead(404);
    res.end();
  }
});

socket.connect(server);

const PORT = config.get("socket_port");
server.listen(PORT, () => {
  logger.info(`Socket.io Server running on port ${PORT}`);
});

module.exports = server;
