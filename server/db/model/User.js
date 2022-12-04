const mongoose = require("mongoose");

const schema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
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
    type: Number,
    required: true,
    trim: true,
  },
  contacts: {
    type: Array,
    default: [],
  },
  joinedOn: {
    type: Date,
    default: () => Date.now(),
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
