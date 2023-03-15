const express = require("express");

const route = express.Router();

route.get("/", async (req, resp) => {
  console.log(req.payload.email);
  resp.send("chat");
});

module.exports = route;
