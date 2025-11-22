const config = require("config");
const { Server } = require("socket.io");

const db = require("./db");
const logger = require("../logger");
const { authorizeSocket } = require("../auth");
const { ErrorCodes } = require("../exceptions");
const messageQueue = require("../services/queue/sqs");

const JOINED_IDS = new Set();

let io;

module.exports.getSocketServer = () => io;

module.exports.connect = (server) => {
  io = new Server(server, {
    cors: {
      origin: config.get("client_url"),
    },
  });

  io.use((socket, next) => {
    const id = socket.handshake.query.id;
    const token = socket.handshake.query.token;

    if (!authorizeSocket(token))
      return next(new Error(ErrorCodes.ERR_FORBIDDEN));

    const isOn = isUserAlreadyLoggedIn(id);
    if (isOn) return next(new Error(ErrorCodes.ERR_DEVICE_ALREADY_CONNECTED));

    next();
  });

  io.on("connection", (socket) => {
    const id = socket.handshake.query.id;
    socket.join(id);
    JOINED_IDS.add(id);

    logger.info(`User connected: ${id}`);

    socket.on("getOnline", () => {
      io.emit("online", { online: getOnlineIds() });
    });

    socket.on("send-message", async (payload, callback) => {
      try {
        const {
          recipients = [],
          data,
          chatId,
          isPrivate,
          senderName,
          senderAvatarId,
          senderEmail,
        } = payload;

        logger.info(`Message from ${senderEmail} to chat ${chatId}`);

        // Step 1: Save to database (as before)
        const exists = await db.addContactIfNotExists(
          isPrivate,
          recipients,
          senderEmail,
          chatId
        );

        const chat = await db.saveMessageToChatIfExists(data, chatId, [
          senderEmail,
        ]);

        if (!chat) {
          return callback({ success: false, error: "Failed to save message" });
        }

        // Step 2: NEW - Queue message for delivery (SQS)
        // For now, we'll do direct delivery, but structure is ready for SQS
        const useQueue = process.env.USE_SQS === "true";

        if (useQueue) {
          // Queue it (will implement in Day 3-4)
          await messageQueue.enqueueMessage({
            messageId: data.msgId,
            chatId,
            recipients,
            data,
            isPrivate,
            senderEmail,
            senderName,
            senderAvatarId,
          });

          callback({ success: true, messageId: data.msgId, queued: true });
        } else {
          // Direct delivery (current behavior)
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

          // Get recipients for group chats
          let finalRecipients = recipients;
          if (!isPrivate) {
            try {
              const groupChat = await db.getGroupDetails(chatId);
              if (groupChat) {
                finalRecipients = groupChat.members
                  .filter((i) => i.email !== senderEmail)
                  .map((i) => i.ref);
              }
            } catch (err) {
              logger.error("Error getting group details:", err);
            }
          }

          // Deliver to recipients
          finalRecipients.forEach((to) => {
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

          callback({ success: true, messageId: data.msgId });
        }
      } catch (ex) {
        logger.error("Send message error:", ex);
        callback({ success: false, error: ex.message });
      }
    });

    socket.on("disconnect", () => {
      JOINED_IDS.delete(id);
      logger.info(`User disconnected: ${id}`);
      io.emit("online", { online: getOnlineIds() });
    });
  });
};

// Keep your existing helper functions
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
  return index !== -1;
}

function getConnectionId(id) {
  const ids = [...JOINED_IDS];
  const index = ids.findIndex((i) => i.startsWith(id));
  return index === -1 ? id : ids[index];
}

module.exports.getConnectionId = getConnectionId;
