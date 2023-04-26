const { Server } = require("socket.io");
const config = require("config");

const ChatCollection = require("../db/model/Chat");
const { encrypt } = require("../utils/messages");
const { AppError, ErrorCodes } = require("../exceptions");

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

  io.use((socket, next) => {
    const id = socket.handshake.query.id;
    const isOn = isUserAlreadyLoggedIn(id);
    if (isOn) return next(new Error(ErrorCodes.ERR_DEVICE_ALREADY_CONNECTED));
    next();
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
      async (
        {
          recipients = [],
          data,
          chatId,
          isPrivate,
          senderName,
          senderAvatarId,
          senderEmail,
        },
        callback
      ) => {
        const messageSaved = await saveMessageToChat(data, chatId);
        if (messageSaved.modifiedCount > 0) {
          recipients.forEach((to) => {
            const broadcastId = getConnectionId(to);
            socket.broadcast.to(broadcastId).emit("receive-message", {
              data,
              chatId,
              isPrivate,
              senderName,
              senderAvatarId,
              senderEmail,
            });
          });
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
    try {
      let onlineIds = [];
      [...JOINED_IDS].forEach((i) => {
        if (i) {
          const splitted = i.split("--__--");
          if (splitted && splitted.length > 0) onlineIds.push(splitted[0]);
        }
      });
      io.emit("is-online", {
        online: onlineIds,
      });
    } catch (_) {}
  }
};

async function saveMessageToChat(data, chatId) {
  const encryptedMessage = encrypt(data.message);
  return await ChatCollection.updateOne(
    { chatId, blockedBy: { $exists: false } },
    {
      $push: { messages: { ...data, message: encryptedMessage } },
      $set: { lastMsg: encryptedMessage, lastMsgTstmp: data.createdAt },
    }
  );
}

function isUserAlreadyLoggedIn(id) {
  const ids = [...JOINED_IDS];
  const lookup = id.split("--__--")[0];
  const index = ids.findIndex((i) => i.startsWith(lookup));
  if (index === -1) return false;
  return true;
}

function getConnectionId(id) {
  const ids = [...JOINED_IDS];
  const index = ids.findIndex((i) => i.startsWith(id));
  if (index === -1) return id;
  return ids[index];
}
