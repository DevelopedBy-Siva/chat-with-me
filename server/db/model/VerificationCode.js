const mongoose = require("mongoose");
const config = require("config");

const schema = new mongoose.Schema({
  requestedBy: {
    type: String,
    required: true,
  },
  createdAt: {
    type: Date,
    default: () => Date.now(),
    expires: config.get("verify_code_expiry"),
  },
  username: {
    type: String,
    required: true,
  },
  verifyCode: {
    type: String,
    required: true,
  },
});

const VerificationCode = mongoose.model("VerificationCode", schema);

module.exports = VerificationCode;
