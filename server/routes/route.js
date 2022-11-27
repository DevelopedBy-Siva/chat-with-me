const chat = require("./sub/chat");
const user = require("./sub/user");
const exceptionHandler = require("../exceptions/expressExceptions");

module.exports = function (app) {
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
    resp.send("Invalid Path");
  });

  /**
   * Middleware that handles Route exceptions
   */
  app.use(exceptionHandler);
};
