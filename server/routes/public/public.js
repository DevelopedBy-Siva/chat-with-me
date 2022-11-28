const express = require("express");

const route = express.Router();

/**
 * User Login
 */
route.post("/login", (req, resp) => {
  resp.send("login");
});

/**
 * Register User
 */
route.post("/register", (req, resp) => {
  resp.send("register");
});

/**
 * User forget password
 */
route.post("/forgot-pswd", (req, resp) => {
  resp.send("forgot pswd");
});

module.exports = route;
