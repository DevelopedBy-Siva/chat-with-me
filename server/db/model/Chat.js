const mongoose = require("mongoose");

const MessageType = {
  sendBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: String,
    default: () => new Date().toUTCString(),
  },
  message: {
    type: String,
  },
  isNotification: {
    type: Boolean,
    default: false,
  },
};

const schema = new mongoose.Schema({
  chatId: {
    unique: true,
    type: String,
    required: true,
  },
  contacts: {
    type: [String],
    required: true,
  },
  messages: {
    type: [MessageType],
  },
  isPrivate: {
    type: Boolean,
    default: true,
  },
  blockedBy: {
    type: String,
  },
  lastMsgTstmp: {
    type: String,
    default: "",
  },
  lastMsg: {
    type: String,
    default: "",
  },
});

const Chat = mongoose.model("Chat", schema);

module.exports = Chat;
