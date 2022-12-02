const express = require("express");
const { ErrorCodes, AppError } = require("../../models/AppError");
const auth = require("../../auth");

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
      .send(ErrorCodes.ERR_UNAUTHORIZED, "Invalid email/ password");

  // Compare the plain password with the hashed password from the DB
  const success = await auth.login(password, user.password);
  if (!success)
    return resp
      .status(401)
      .send(ErrorCodes.ERR_UNAUTHORIZED, "Invalid email/ password");

  // Generate JWT token
  const token = auth.jwtToken(user.email);
  resp.setHeader("x-auth-token", token).send();
});

/**
 * Register User
 */
route.post("/register", (req, resp) => {
  const body = req.body;

  resp.send("register");
});

/**
 * User forget password
 */
route.post("/forgot-pswd", (req, resp) => {
  resp.send("forgot pswd");
});

module.exports = route;
