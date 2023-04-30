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
  msgId: {
    type: String,
  },
};

const LastMessage = {
  message: {
    type: String,
    default: "",
  },
  timestamp: {
    type: String,
    default: "",
  },
  uuid: {
    type: String,
    default: "",
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
  lastMessage: {
    type: LastMessage,
    default: {
      message: "",
      timestamp: "",
      uuid: "",
    },
  },
});

const Chat = mongoose.model("Chat", schema);

module.exports = Chat;
