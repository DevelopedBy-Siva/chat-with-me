const mongoose = require("mongoose");

const MemberType = {
  email: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
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
  isPrivate: {
    type: Boolean,
    default: false,
  },
  joinedOn: {
    type: String,
    default: () => new Date().toUTCString(),
  },
});

const Groups = mongoose.model("Groups", schema);

module.exports = Groups;
