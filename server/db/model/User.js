const mongoose = require("mongoose");

const ContactType = {
  email: String,
  nickname: String,
  isPrivate: Boolean,
  lastMsgTstmp: String,
  lastMsg: String,
};

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minLength: 3,
    maxLength: 16,
    lowercase: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minLength: 9,
    maxLength: 10,
    validate: {
      validator: function (value) {
        const pattern = /^\d+$/;
        return pattern.test(value);
      },
      message: "Invalid phone number",
    },
  },
  contacts: {
    type: [ContactType],
    default: [],
  },
  joinedOn: {
    type: String,
    default: () => new Date().toUTCString(),
  },
  description: {
    type: String,
    default: "",
  },
  isOnline: {
    type: Boolean,
    default: true,
  },
  avatarId: {
    type: String,
    default: "",
  },
  blocked: {
    type: [ContactType],
    default: [],
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
