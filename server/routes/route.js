const express = require("express");
const compression = require("compression");
const cors = require("cors");
const config = require("config");
const helmet = require("helmet");
const cookieParser = require("cookie-parser");
const chat = require("./private/chat");
const user = require("./private/user");
const public = require("./public");
const exceptionHandler = require("../exceptions/expressExceptions");
const { authorizeJWT } = require("../auth");
const { AppError } = require("../exceptions");

module.exports = function (app) {
  /**
   * Allowed URL
   */
  app.use(
    cors({
      origin: config.get("client_url"),
      credentials: true,
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
   * Middle to handle Req/Resp cookies
   */
  app.use(cookieParser());

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
   * Middleware that handles Route exceptions
   */
  app.use(exceptionHandler);
};
