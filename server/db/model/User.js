const mongoose = require("mongoose");

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
    minLength: 10,
    maxLength: 11,
    validate: {
      validator: function (value) {
        const pattern = /^\d+$/;
        return pattern.test(value);
      },
      message: "Invalid phone number",
    },
  },
  contacts: {
    type: [Object],
    default: [],
  },
  joinedOn: {
    type: Date,
    default: () => Date.now(),
  },
});

const User = mongoose.model("User", schema);

module.exports = User;
