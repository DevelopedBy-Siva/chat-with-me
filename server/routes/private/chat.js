const express = require("express");
const { v4: uuid } = require("uuid");

const ChatCollection = require("../../db/model/Chat");
const GroupsCollection = require("../../db/model/Groups");
const UserCollection = require("../../db/model/User");
const { AppError, ErrorCodes } = require("../../exceptions");
const { nextAdminIndex } = require("../../utils/validation");
const { decrypt, encrypt } = require("../../utils/messages");
const { getSocketServer, getConnectionId } = require("../../socket");

const route = express.Router();

/**
 * Get Chats
 */
route.get("/:chatId", async (req, resp) => {
  const { email } = req.payload;
  const chatId = req.params.chatId;

  const data = await ChatCollection.findOne({ chatId });
  if (!data)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Chat not found"));

  const contacts = data.contacts.filter((item) => item !== email);

  const contactInfos = await UserCollection.find(
    { email: { $in: [...contacts] } },
    { avatarId: 1, name: 1, _id: 1, email: 1 }
  );

  let messages = data.messages;
  messages.forEach((item) => {
    item.message = decrypt(item.message);
  });
  resp.status(200).send({
    _id: data._id,
    chatId: data.chatId,
    contacts: data.contacts,
    isPrivate: data.isPrivate,
    lastMessage: data.lastMessage,
    messages,
    contactInfos,
    blockedBy: data.blockedBy,
  });
});

/**
 * Remove a Group
 */
route.delete("/:chatId", async (req, resp) => {
  const chatId = req.params.chatId;
  const { email } = req.payload;

  const data = await GroupsCollection.findOne({ chatId, admin: email });
  if (!data)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Group not found"));

  await Promise.all([
    GroupsCollection.deleteOne({ chatId }),
    ChatCollection.deleteOne({ chatId }),
    UserCollection.updateMany({}, { $pull: { groups: { ref: data._id } } }),
  ]);

  resp.status(201).send();
});

/**
 * Leave a Group
 */
route.put("/leave/:chatId", async (req, resp) => {
  const { email } = req.payload;
  const chatId = req.params.chatId;

  const data = await GroupsCollection.findOne({
    chatId,
    members: { $elemMatch: { email } },
  });
  if (!data)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Group not found"));

  // Delete group & its references, if members are <= 3
  if (data.members.length <= 3) {
    await Promise.all([
      GroupsCollection.deleteOne({ chatId }),
      ChatCollection.deleteOne({ chatId }),
      UserCollection.updateMany({}, { $pull: { groups: { ref: data._id } } }),
    ]);

    return resp.status(201).send();
  }

  const dontLookUpIndex = data.members.findIndex((i) => i.email === email);
  if (dontLookUpIndex !== -1 && data.admin === email) {
    // Generate a Random Admin Index
    const adminIndex = nextAdminIndex(dontLookUpIndex, data.members.length);
    const nextAdmin = data.members[adminIndex].email;
    await GroupsCollection.updateOne(
      { chatId },
      { $pull: { members: { email } }, $set: { admin: nextAdmin } }
    );
  }

  await Promise.all([
    UserCollection.updateOne(
      { email },
      { $pull: { groups: { ref: data._id } } }
    ),
    ChatCollection.updateOne({ chatId }, { $pull: { contacts: email } }),
    GroupsCollection.updateOne({ chatId }, { $pull: { members: { email } } }),
  ]);

  resp.status(201).send();
});

/**
 * Add contact to group
 */
route.put("/add-to-group/:chatId", async (req, resp) => {
  const { email } = req.payload;
  const chatId = req.params.chatId;
  const contactToAdd = req.query.contact.trim().toLowerCase();

  const data = await GroupsCollection.findOne({ chatId });
  if (!data)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Group not found"));

  const contactAlreadyExists = data.members.some(
    (i) => i.email === contactToAdd
  );
  if (contactAlreadyExists) return resp.status(201).send();

  const user = await UserCollection.findOne({ email });

  const isInTheGroup = user.groups.some(
    (i) => String(i.ref) === String(data._id)
  );
  if (!isInTheGroup)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Not in the group"));

  const isInTheContact = user.contacts.some(
    (item) => item.email === contactToAdd
  );

  const contactToAddDetails = await UserCollection.findOne(
    {
      email: contactToAdd,
    },
    { _id: 1, name: 1 }
  );

  if (!isInTheContact || !contactToAddDetails)
    return resp
      .status(404)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Contact doesn't exists")
      );

  const isAdded = await UserCollection.updateOne(
    { email: contactToAdd },
    { $push: { groups: { ref: data._id } } }
  );
  if (isAdded.modifiedCount > 0) {
    data.members.push({ email: contactToAdd, ref: contactToAddDetails._id });

    const message = {
      createdAt: new Date().toUTCString(),
      isNotification: true,
      sendBy: user._id,
      msgId: "",
      message: encrypt(`${contactToAddDetails.name} is added to the group`),
    };

    const lastMessage = {
      message: message.message,
      timestamp: message.timestamp,
      uuid: message.msgId,
    };

    await Promise.all([
      await data.save(),
      ChatCollection.updateOne(
        { chatId },
        {
          $push: {
            contacts: contactToAdd,
            messages: message,
          },
          $set: { lastMessage: lastMessage },
        }
      ),
    ]);

    try {
      const groupMembers = data.members.map((i) => i.email);
      const userData = await UserCollection.find({
        email: { $in: groupMembers },
      });

      let details = [];
      let connectionId;
      userData.forEach((i) => {
        if (i.email === contactToAdd) connectionId = i._id;
        else {
          let data = {
            _id: i._id,
            nickname: null,
            name: i.name,
            email: i.email,
            avatarId: i.avatarId,
          };
          details.push(data);
        }
      });

      const toSend = {
        _id: data._id,
        name: data.name,
        admin: data.admin,
        icon: data.icon,
        chatId: data.chatId,
        lastMessage: { ...lastMessage, message: decrypt(lastMessage.message) },
        members: details,
        isPrivate: false,
      };
      const socket = getSocketServer();
      if (socket) {
        socket.to(getConnectionId(connectionId)).emit("new-group", toSend);

        toSend.members.forEach((i) => {
          const memberConnectionId = i._id;
          socket
            .to(getConnectionId(memberConnectionId))
            .emit("receive-message", {
              data: { ...message, message: decrypt(message.message) },
              isPrivate: false,
              chatId: data.chatId,
              senderName: "",
              senderAvatarId: "",
              senderEmail: "",
            });
        });
      }
    } catch (_) {}
  }

  return resp.status(201).send();
});

/**
 * Leave a Group
 */
route.put("/kick/:chatId", async (req, resp) => {
  const chatId = req.params.chatId;
  const toKick = req.query.contact.trim().toLowerCase();

  const data = await GroupsCollection.findOne({
    chatId,
    members: { $elemMatch: { email: toKick } },
  });
  if (!data)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Group not found"));

  // Delete group & its references, if members are <= 3
  if (data.members.length <= 3) {
    await Promise.all([
      GroupsCollection.deleteOne({ chatId }),
      ChatCollection.deleteOne({ chatId }),
      UserCollection.updateMany({}, { $pull: { groups: { ref: data._id } } }),
    ]);

    return resp.status(201).send({ status: "group" });
  }

  await Promise.all([
    UserCollection.updateOne(
      { email: toKick },
      { $pull: { groups: { ref: data._id } } }
    ),
    ChatCollection.updateOne({ chatId }, { $pull: { contacts: toKick } }),
    GroupsCollection.updateOne(
      { chatId },
      { $pull: { members: { email: toKick } } }
    ),
  ]);

  resp.status(200).send();
});

module.exports = route;
