const { Server } = require("socket.io");
const config = require("config");

const ChatCollection = require("../db/model/Chat");

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
        const messageSaved = await saveMessageToChat(data, chatId);
        if (messageSaved.modifiedCount > 0) {
          socket.broadcast.to(recipients).emit("receive-message", {
            data,
            chatId,
          });
          callback(true);
        } else callback(false);
      }
    );
  });
};

async function saveMessageToChat(data, chatId) {
  return await ChatCollection.updateOne(
    { chatId },
    { $push: { messages: data } }
  );
}
