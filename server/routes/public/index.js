const express = require("express");
const { v4: uuidv4 } = require("uuid");
const { ErrorCodes, AppError } = require("../../exceptions");
const auth = require("../../auth");
const validate = require("../../utils/validation");
const { sendMail, type } = require("../../utils/mail");

const route = express.Router();

/**
 * User Login
 */
route.post("/login", async (req, resp) => {
  let email = req.header("x-auth-email");
  const password = req.header("x-auth-password");
  if (!email || !password)
    return resp
      .status(400)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Invalid email/ password")
      );
  email = email.toLowerCase().trim();

  // TODO: Get User credentials from Database
  const user = { email: "", password: "" };
  if (!user)
    return resp
      .status(401)
      .send(
        new AppError(ErrorCodes.ERR_UNAUTHORIZED, "Invalid email/ password")
      );

  // Compare the plain password with the hashed password from the DB
  const success = await auth.login(password, user.password);
  if (!success)
    return resp
      .status(401)
      .send(
        new AppError(ErrorCodes.ERR_UNAUTHORIZED, "Invalid email/ password")
      );

  // Generate JWT token
  const token = auth.jwtToken(user.email);
  resp.setHeader("x-auth-token", token).send();
});

/**
 * Register User
 */
route.post("/register", async (req, resp) => {
  const body = req.body;
  const { value, error } = validate.validateRegister(body);
  if (error)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, error.message));

  // TODO: check if the User is already present
  const user = {};
  if (user)
    return resp
      .status(400)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "User already registered")
      );

  const hashedPswd = await auth.hash(value.password);
  // TODO: store data to DB

  // Generate JWT token
  const token = auth.jwtToken(value.email);
  resp.setHeader("x-auth-token", token).send();
});

/**
 * User forget password
 */
route.post("/forgot-pswd", async (req, resp) => {
  const user = req.query.user;
  if (!user)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "User expected"));

  // TODO: Verify user is present in the DB
  const isPresent = {};
  if (!isPresent)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_USR_NOT_FOUND, "User not found"));

  // TODO: Update the Expiry records

  const data = {
    requestedBy: user,
    createdAt: new Date(),
    verifyCode: Math.floor(Math.random() * 90000) + 10000,
  };

  // TODO: Save To DB

  await sendMail(type.FORGOT_PSWD, data);
  resp.send();
});

route.post("/verify-account", (req, resp) => {
  const verifyCode = req.header("x-verify-code");
  if (!verifyCode)
    return resp
      .status(400)
      .send(
        new AppError(
          ErrorCodes.ERR_INVALID_REQUEST,
          "Verification code required"
        )
      );
  // TODO: Get verification data from DB
  const user = { verificationCode: "" };

  if (!user)
    return resp
      .status(410)
      .send(
        new AppError(
          ErrorCodes.ERR_VERIFY_CODE_EXPIRED,
          "Verification code expired"
        )
      );
  if (verifyCode !== user.verificationCode)
    return resp
      .status(400)
      .send(
        new AppError(
          ErrorCodes.ERR_INVALID_REQUEST,
          "Invalid verification code"
        )
      );
  resp.send();
});

module.exports = route;
