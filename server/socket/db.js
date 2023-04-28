const ChatCollection = require("../db/model/Chat");
const UserCollection = require("../db/model/User");
const GroupsCollection = require("../db/model/Groups");
const { encrypt } = require("../utils/messages");

async function saveMessageToChatIfExists(data, chatId, lookup = []) {
  const encryptedMessage = encrypt(data.message);
  return await ChatCollection.findOneAndUpdate(
    { chatId, blockedBy: { $exists: false }, contacts: { $in: lookup } },
    {
      $push: { messages: { ...data, message: encryptedMessage } },
      $set: { lastMsg: encryptedMessage, lastMsgTstmp: data.createdAt },
    },
    {
      new: true,
    }
  );
}

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

async function getGroupDetails(chatId) {
  const chat = await GroupsCollection.findOne({ chatId }, { members: 1 });
  return chat;
}

module.exports.saveMessageToChatIfExists = saveMessageToChatIfExists;
module.exports.addContactIfNotExists = addContactIfNotExists;
module.exports.getUserDetails = getUserDetails;
module.exports.getGroupDetails = getGroupDetails;
