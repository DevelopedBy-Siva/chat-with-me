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
function jwtToken(email, name, _id, role = DEFAULT_ROLE) {
  const payload = {
    _id,
    name,
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
    // Retrieve JWT token from the Cookie
    const token = req.cookies[cookieNames.jwtTokenKey];
    // Verify the JWT token
    const payload = jwt.verify(token, SECRET_KEY);
    // Set payload to request
    req.payload = payload;
    req.token = token;
    res.cookie(cookieNames.isLoggedInKey, "yes", {
      expires: getIsLoggedInExpiryDate(),
    });
    next();
  } catch (ex) {
    res.clearCookie(cookieNames.jwtTokenKey);
    res.clearCookie(cookieNames.isLoggedInKey);
    res
      .status(403)
      .send(
        new AppError(ErrorCodes.ERR_FORBIDDEN, "Invalid Authorization Token")
      );
  }
}

/**
 * Server cookie names
 */
const cookieNames = {
  jwtTokenKey: "session_token",
  isLoggedInKey: "logged_in",
};

/**
 * HttpOnly Cookie props
 */
const httpOnlyCookieProps = {
  httpOnly: true,
  secure: true,
  sameSite: "none",
  domain: "onrender.com",
};

/**
 * Generate expiry date for the HttpOnly Cookie
 */
const getCookieExpiryDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + parseInt(config.get("http_cookie_expiry")));
  return date;
};

/**
 * Generate expiry date for the HttpOnly Cookie
 */
const getIsLoggedInExpiryDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + 365);
  return date;
};

const authorizeSocket = (token) => {
  try {
    jwt.verify(token, SECRET_KEY);
    return true;
  } catch (_) {
    return false;
  }
};

module.exports.jwtToken = jwtToken;
module.exports.login = login;
module.exports.hash = hashPswd;
module.exports.authorizeJWT = authorizeJWT;
module.exports.authorizeSocket = authorizeSocket;
module.exports.cookies = {
  httpOnlyCookieProps,
  cookieNames,
  expiry: getCookieExpiryDate,
  isLoggedExpiry: getIsLoggedInExpiryDate,
};
