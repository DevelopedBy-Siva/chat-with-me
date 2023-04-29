const config = require("config");
const { Server } = require("socket.io");

const db = require("./db");
const logger = require("../logger");
const { authorizeSocket } = require("../auth");
const { ErrorCodes } = require("../exceptions");

const JOINED_IDS = new Set();

let io;

/**
 * Get SOCKET SERVER
 */
module.exports.getSocketServer = () => io;

module.exports.connect = (server) => {
  /**
   * Socket.io server
   */
  io = new Server(server, {
    cors: {
      origin: config.get("client_url"),
    },
  });

  /**
   * Middleware to Authorize and ensures that the use is logged on to a single device
   */
  io.use((socket, next) => {
    const id = socket.handshake.query.id;

    // Authorise Socket
    const token = socket.handshake.query.token;
    if (!authorizeSocket(token))
      return next(new Error(ErrorCodes.ERR_FORBIDDEN));

    // Check whether the user is already connected or not
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

    socket.on("getOnline", () => {
      io.emit("online", {
        online: getOnlineIds(),
      });
    });

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
        try {
          // Check contact existed or not, if not add it
          const exists = await db.addContactIfNotExists(
            isPrivate,
            recipients,
            senderEmail,
            chatId
          );

          // Save message to chat
          const chat = await db.saveMessageToChatIfExists(data, chatId, [
            senderEmail,
          ]);

          if (chat) {
            // If receiver doesn't have this contact, send it
            let newContact;
            if (!exists) {
              newContact = await db.getUserDetails(senderEmail);
              if (newContact) {
                newContact.chatId = chatId;
                newContact.lastMessage = {
                  message: data.message,
                  timestamp: data.createdAt,
                  uuid: data.msgId,
                };
              }
            }

            if (!isPrivate) {
              try {
                const chat = await db.getGroupDetails(chatId);
                if (!chat) return callback(false);
                recipients = chat.members
                  .filter((i) => i.email !== senderEmail)
                  .map((i) => i.ref);
              } catch (_) {
                recipients = [];
              }
            }

            recipients.forEach((to) => {
              const broadcastId = getConnectionId(to);
              socket.broadcast.to(broadcastId).emit("receive-message", {
                data,
                chatId,
                isPrivate,
                senderName,
                senderAvatarId,
                senderEmail,
                newContact,
              });
            });
            callback(true);
          } else callback(false);
        } catch (ex) {
          logger.error(ex);
          callback(false);
        }
      }
    );
    socket.on("disconnect", () => {
      JOINED_IDS.delete(id);
      io.emit("online", {
        online: getOnlineIds(),
      });
    });
  });
};

function getOnlineIds() {
  let onlineIds = [];
  [...JOINED_IDS].forEach((i) => {
    if (i) {
      const splitted = i.split("--__--");
      if (splitted && splitted.length > 0) onlineIds.push(splitted[0]);
    }
  });
  return onlineIds;
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
module.exports.getConnectionId = getConnectionId;
