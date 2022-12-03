const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");

const DEFAULT_ROLE = "USER";
const SECRET_KEY = config.get("app_secret_key");

function jwtToken(email, role = DEFAULT_ROLE) {
  const payload = {
    email,
    role,
  };
  const token = jwt.sign(payload, SECRET_KEY);
  return token;
}

async function login(plainPswd, hashedPswd) {
  let success = true;
  try {
    await bcrypt.compare(plainPswd, hashedPswd);
  } catch (e) {
    success = false;
  }
}

async function hashPswd(pswd) {
  // Generate Salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the Salt
  const hashedPswd = await bcrypt.hash(pswd, salt);
  return hashedPswd;
}

module.exports.jwtToken = jwtToken;
module.exports.login = login;
module.exports.hash = hashPswd;
