const express = require("express");

const ChatCollection = require("../../db/model/Chat");
const GroupsCollection = require("../../db/model/Groups");
const UserCollection = require("../../db/model/User");
const { AppError, ErrorCodes } = require("../../exceptions");
const { nextAdminIndex } = require("../../utils/validation");
const { decrypt } = require("../../utils/messages");

const route = express.Router();

/**
 * Get Chats
 */
route.get("/:chatId", async (req, resp) => {
  const chatId = req.params.chatId;

  const data = await ChatCollection.findOne({ chatId });
  if (!data)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Chat not found"));

  let messages = data.messages;
  messages.forEach((item) => {
    item.message = decrypt(item.message);
  });
  resp.status(200).send({ ...data, messages });
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
  if (!isInTheContact)
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
    data.members.push({ email: contactToAdd });
    await Promise.all([
      data.save(),
      ChatCollection.updateOne(
        { chatId },
        { $push: { contacts: contactToAdd } }
      ),
    ]);
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

    return resp.status(201).send();
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

  resp.status(201).send();
});

module.exports = route;
