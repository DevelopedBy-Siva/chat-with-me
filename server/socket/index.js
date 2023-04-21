const { Server } = require("socket.io");
const config = require("config");

const ChatCollection = require("../db/model/Chat");
const { encrypt } = require("../utils/messages");

const JOINED_IDS = new Set();

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
    JOINED_IDS.add(id);

    // Is Online or not
    weAreOnline();

    socket.on(
      "send-message",
      async ({ recipients = [], data, chatId, isPrivate }, callback) => {
        const messageSaved = await saveMessageToChat(data, chatId);
        if (messageSaved.modifiedCount > 0) {
          recipients.forEach((to) =>
            socket.broadcast.to(to).emit("receive-message", {
              data,
              chatId,
              isPrivate,
            })
          );
          callback(true);
        } else callback(false);
      }
    );
    socket.on("disconnect", () => {
      JOINED_IDS.delete(id);
      weAreOnline();
    });
  });

  function weAreOnline() {
    io.emit("is-online", {
      online: [...JOINED_IDS],
    });
  }
};

async function saveMessageToChat(data, chatId) {
  const encryptedMessage = encrypt(data.message);
  return await ChatCollection.updateOne(
    { chatId },
    {
      $push: { messages: { ...data, message: encryptedMessage } },
      $set: { lastMsg: encryptedMessage, lastMsgTstmp: data.createdAt },
    }
  );
}
