const { Server } = require("socket.io");
const config = require("config");

const ChatCollection = require("../db/model/Chat");
const UserCollection = require("../db/model/User");
const GroupsCollection = require("../db/model/Groups");
const { encrypt } = require("../utils/messages");
const { ErrorCodes } = require("../exceptions");
const logger = require("../logger");

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
        try {
          // Check contact existed or not, if not add it
          const exists = await addContactIfNotExists(
            isPrivate,
            recipients,
            senderEmail,
            chatId
          );

          // Save message to chat
          const messageSaved = await saveMessageToChat(data, chatId, [
            senderEmail,
          ]);

          if (messageSaved.modifiedCount > 0) {
            // If receiver doesn't have this contact, send it
            let newContact;
            if (!exists) {
              newContact = await getUserDetails(senderEmail);
              if (newContact) {
                newContact.chatId = chatId;
                newContact.lastMsg = data.message;
                newContact.lastMsgTstmp = data.createdAt;
              }
            }

            if (!isPrivate) {
              try {
                const chat = await GroupsCollection.findOne(
                  { chatId },
                  { members: 1 }
                );
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

async function addContactIfNotExists(
  isPrivate,
  recipients = [],
  senderEmail,
  chatId
) {
  if (isPrivate && recipients.length === 1) {
    const user = await UserCollection.findOne({ _id: recipients[0] });
    if (user && senderEmail) {
      const contactFound = user.contacts.findIndex(
        (i) => i.email === senderEmail
      );
      if (contactFound === -1) {
        user.contacts.push({
          email: senderEmail,
          nickname: "",
          inContact: false,
          chatId,
        });
        await user.save();
        return false;
      }
    }
  }
  return true;
}

async function saveMessageToChat(data, chatId, lookup = []) {
  const encryptedMessage = encrypt(data.message);
  return await ChatCollection.updateOne(
    { chatId, blockedBy: { $exists: false }, contacts: { $in: lookup } },
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

async function getUserDetails(email) {
  const user = await UserCollection.findOne({ email });
  if (!user) return undefined;
  return {
    _id: user._id,
    email: user.email,
    description: user.description,
    name: user.name,
    avatarId: user.avatarId,
    nickname: "",
    isBlocked: false,
    isPrivate: true,
    inContact: false,
  };
}

function getConnectionId(id) {
  const ids = [...JOINED_IDS];
  const index = ids.findIndex((i) => i.startsWith(id));
  if (index === -1) return id;
  return ids[index];
}
module.exports.getConnectionId = (id) => getConnectionId(id);
