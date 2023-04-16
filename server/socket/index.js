const { Server } = require("socket.io");
const config = require("config");

module.exports.connect = (server) => {
  /**
   * Socket.io server
   */
  const io = new Server(server, {
    cors: {
      origin: config.get("client_url"),
    },
  });

  /**
   * Create Socket.io connection
   */
  io.on("connection", (socket) => {
    // Connection ID -> UserId
    const id = socket.handshake.query.id;
    socket.join(id);
    socket.on("send-message", ({ recipients, text, chatId }) => {
      socket.broadcast.to(recipients).emit("receive-message", {
        text,
        chatId,
      });
    });
  });
};
