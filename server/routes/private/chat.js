const express = require("express");

const ChatCollection = require("../../db/model/Chat");
const GroupsCollection = require("../../db/model/Groups");
const UserCollection = require("../../db/model/User");
const { AppError, ErrorCodes } = require("../../exceptions");
const { nextAdminIndex } = require("../../utils/validation");

const route = express.Router();

/**
 * Get Chats
 */
route.get("/:chatId", async (req, resp) => {
  const chatId = req.params.chatId;

  const data = await ChatCollection.findOne({ chatId });
  if (!data)
    resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Chat not found"));
  resp.status(200).send(data);
});

/**
 * Remove a Group
 */
route.delete("/:chatId", async (req, resp) => {
  const chatId = req.params.chatId;

  const data = await GroupsCollection.findOne({ chatId });
  if (!data)
    resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Group not found"));

  await Promise.all([
    GroupsCollection.deleteOne({ chatId }),
    ChatCollection.deleteOne({ chatId }),
    UserCollection.updateMany({}, { $pull: { groups: { ref: data._id } } }),
  ]);

  return resp.status(201).send();
});

/**
 * Leave a Group
 */
route.put("/leave/:chatId", async (req, resp) => {
  const { email } = req.payload;
  const chatId = req.params.chatId;

  const data = await GroupsCollection.findOne({ chatId });
  if (!data)
    resp
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
  ]);

  return resp.status(201).send();
});

module.exports = route;
