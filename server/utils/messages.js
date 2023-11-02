const CryptoJS = require("crypto-js");
const config = require("./config");

const SECRET_KEY = config.SECRET_KEY;

/**
 * Encrypt Message
 */
function encryptMessage(message) {
  const response = CryptoJS.AES.encrypt(message, SECRET_KEY).toString();
  return response;
}

/**
 * Decrypt Message
 */
function decryptMessage(message) {
  const bytes = CryptoJS.AES.decrypt(message, SECRET_KEY);
  const response = bytes.toString(CryptoJS.enc.Utf8);
  return response;
}

module.exports.encrypt = encryptMessage;
module.exports.decrypt = decryptMessage;
