const chat = require("./sub/chat");
const user = require("./sub/user");

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
};
