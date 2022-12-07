const jwt = require("jsonwebtoken");
const config = require("config");
const bcrypt = require("bcrypt");
const { ErrorCodes, AppError } = require("../exceptions");

const DEFAULT_ROLE = "USER";
const SECRET_KEY = config.get("app_secret_key");
const JWT_EXPIRY = config.get("jwt_expiry");

/**
 * Validates user login password against hashed password in DB
 */
function login(plainPswd, hashedPswd) {
  return bcrypt.compare(plainPswd, hashedPswd);
}

/**
 * Hash plain user password
 */
async function hashPswd(pswd) {
  // Generate Salt
  const salt = await bcrypt.genSalt(10);
  // Hash the password using the Salt
  const hashedPswd = await bcrypt.hash(pswd, salt);
  return hashedPswd;
}

/**
 * Generate JWT
 */
function jwtToken(email, role = DEFAULT_ROLE) {
  const payload = {
    email,
    role,
  };
  const token = jwt.sign(payload, SECRET_KEY, { expiresIn: JWT_EXPIRY });
  return token;
}

/**
 * Authorize JWT
 */
function authorizeJWT(req, res, next) {
  try {
    const token = req.header("x-auth-token");
    const payload = jwt.verify(token, SECRET_KEY);
    // Set payload to request
    req.payload = payload;
    next();
  } catch (ex) {
    res
      .status(403)
      .send(
        new AppError(ErrorCodes.ERR_FORBIDDEN, "Invalid Authorization Token")
      );
  }
}

module.exports.jwtToken = jwtToken;
module.exports.login = login;
module.exports.hash = hashPswd;
module.exports.authorizeJWT = authorizeJWT;
