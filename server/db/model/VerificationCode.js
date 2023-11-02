const mongoose = require("mongoose");
const config = require("../../utils/config");

const expiryTime = config.VERIFY_CODE_EXPIRY;

const schema = new mongoose.Schema({
  requestedBy: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  createdAt: {
    type: Date,
    default: () => new Date(),
    expires: expiryTime,
  },
  expiresAt: {
    type: Date,
    default: () => {
      const date = new Date();
      date.setSeconds(date.getSeconds() + expiryTime);
      return date;
    },
  },
  username: {
    type: String,
    required: true,
    trim: true,
    lowercase: true,
  },
  verificationCode: {
    type: Number,
    required: true,
  },
});

const VerificationCode = mongoose.model("VerificationCode", schema);

module.exports = VerificationCode;
