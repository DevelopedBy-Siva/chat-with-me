const express = require("express");
const compression = require("compression");
const cors = require("cors");
const config = require("config");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const chat = require("./private/chat");
const user = require("./private/user");
const public = require("./public");
const exceptionHandler = require("../exceptions/expressExceptions");
const { AppError } = require("../exceptions");
const { authorizeJWT } = require("../auth");

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 5,
  message: { error: "Too many login attempts, please try again later." },
  standardHeaders: true,
  legacyHeaders: false,
  skipSuccessfulRequests: true,
});

const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: "Too many requests, please slow down." },
  standardHeaders: true,
  legacyHeaders: false,
});

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

  app.get("/health", (req, res) => {
    res.status(200).json({
      status: "healthy",
      timestamp: new Date().toISOString(),
    });
  });

  /**
   * Middleware to handle User API calls (PROTECTED ROUTE)
   */
  app.use("/api/user", generalLimiter, authorizeJWT, user);

  /**
   * Middleware to handle Chat API calls (PROTECTED ROUTE)
   */
  app.use("/api/chat", generalLimiter, authorizeJWT, chat);

  /**
   * Middleware to handle all public API calls
   */
  app.use("/api", authLimiter, public);

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
