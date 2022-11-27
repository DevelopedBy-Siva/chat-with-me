const express = require("express");

const route = express.Router();

route.get("/", (req, resp) => {
  resp.send("user");
});

module.exports = route;
