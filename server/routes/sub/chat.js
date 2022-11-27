const express = require("express");

const route = express.Router();

route.get("/", (req, resp) => {
  resp.send("chat");
});

module.exports = route;
