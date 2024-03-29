const express = require("express");
const compression = require("compression");
const cors = require("cors");
const config = require("config");
const helmet = require("helmet");

const chat = require("./private/chat");
const user = require("./private/user");
const public = require("./public");
const exceptionHandler = require("../exceptions/expressExceptions");
const { AppError } = require("../exceptions");
const { authorizeJWT } = require("../auth");

module.exports = function (app) {
  /**
   * Allowed URL
   */
  app.use(
    cors({
      origin: config.get("client_url").split(","),
    })
  );

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
   * Middleware to handle User API calls (PROTECTED ROUTE)
   */
  app.use("/api/user", authorizeJWT, user);

  /**
   * Middleware to handle Chat API calls (PROTECTED ROUTE)
   */
  app.use("/api/chat", authorizeJWT, chat);

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
