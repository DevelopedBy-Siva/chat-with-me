const express = require("express");
const compression = require("compression");
const helmet = require("helmet");
const chat = require("./private/chat");
const user = require("./private/user");
const public = require("./public/public");
const AppError = require("../models/AppError");
const exceptionHandler = require("../exceptions/expressExceptions");

module.exports = function (app) {
  /**
   *  Middleware to decreases API request response size
   */
  app.use(compression());

  /**
   *  Middleware to secure HTTP headers
   */
  app.use(helmet());

  /**
   * Middleware to parse the RequestBody
   */
  app.use(express.json());

  /**
   * Middleware to handle User API calls
   */
  app.use("/api/user", user);

  /**
   * Middleware to handle Chat API calls
   */
  app.use("/api/chat", chat);

  /**
   * Middleware to handle all public API calls
   */
  app.use("/api", public);

  /**
   * Invalid path route mapping
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
