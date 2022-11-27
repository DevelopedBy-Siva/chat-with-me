const express = require("express");
const chat = require("./sub/chat");
const user = require("./sub/user");
const AppError = require("../models/AppError");
const exceptionHandler = require("../exceptions/expressExceptions");

module.exports = function (app) {
  /**
   * RequestBody Parser
   */
  app.use(express.json());

  /**
   * Handles User API calls
   */
  app.use("/api/user", user);

  /**
   * Handles Chat API calls
   */
  app.use("/api/chat", chat);

  /**
   * Handles invalid path mapping
   */
  app.get("*", (req, resp) => {
    resp
      .status(404)
      .send(
        new AppError("INVALID_PATH", `Invalid request path: '${req.path}'`)
      );
  });

  /**
   * Middleware that handles Route exceptions
   */
  app.use(exceptionHandler);
};
