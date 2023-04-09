const mongoose = require("mongoose");

const MemberType = {
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
};

const IconType = {
  letter: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
    minLength: 1,
    maxLength: 1,
  },
  background: {
    type: String,
    required: true,
  },
};

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 16,
  },
  admin: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  members: {
    type: [MemberType],
    default: [],
  },
  lastMsgTstmp: {
    type: String,
    default: "",
  },
  lastMsg: {
    type: String,
    default: "",
  },
  icon: {
    type: IconType,
    required: true,
  },
  joinedOn: {
    type: String,
    default: () => new Date().toUTCString(),
  },
  chatId: {
    type: String,
    required: true,
  },
});

const Groups = mongoose.model("Groups", schema);

module.exports = Groups;
