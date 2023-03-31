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
    // Retrieve JWT token from the Cookie
    const token = req.cookies[cookieNames.jwtTokenKey];
    // Verify the JWT token
    const payload = jwt.verify(token, SECRET_KEY);
    // Set payload to request
    req.payload = payload;

    res.cookie(cookieNames.isLoggedIn, "yes", { expires: 0 });
    next();
  } catch (ex) {
    res.clearCookie(cookieNames.isLoggedIn);
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
  isLoggedIn: "logged_in",
};

/**
 * HttpOnly Cookie props
 */
const httpOnlyCookieProps = {
  httpOnly: true,
  path: "/",
  sameSite: "lax",
  secure: true,
};

/**
 * Generate expiry date for the HttpOnly Cookie
 */
const getCookieExpiryDate = () => {
  let date = new Date();
  date.setDate(date.getDate() + parseInt(config.get("http_cookie_expiry")));
  return date;
};

module.exports.jwtToken = jwtToken;
module.exports.login = login;
module.exports.hash = hashPswd;
module.exports.authorizeJWT = authorizeJWT;
module.exports.cookies = {
  httpOnlyCookieProps,
  cookieNames,
  expiry: getCookieExpiryDate,
};
