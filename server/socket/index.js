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
    socket.on(
      "send-message",
      async ({ recipients, data, chatId }, callback) => {
        await new Promise((r) => {
          setTimeout(() => {
            r();
          }, 5000);
        });
        callback(true);
        socket.broadcast.to(recipients).emit("receive-message", {
          data,
          chatId,
        });
      }
    );
  });
};
