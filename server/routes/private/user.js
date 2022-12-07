const express = require("express");
const { validateUser, schema } = require("../../utils/validation");
const { AppError, ErrorCodes } = require("../../exceptions");
const UserCollection = require("../../db/model/User");
const { hash, login } = require("../../auth");

const route = express.Router();

/**
 * Update User Password
 */
route.put("/change-pswd", async (req, resp) => {
  const { email } = req.payload;
  const currentPassword = req.headers("x-current-password");
  const newPassword = req.headers("x-new-password");

  // Validate the request
  const { value, error } = validateUser(
    { email, currentPassword, newPassword },
    {
      email: schema.email,
      currentPassword: schema.password,
      newPassword: schema.password,
    }
  );
  if (error)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, error.message));

  // Get the user & verify it against the current pasword
  const user = await UserCollection.findOne({ email }, { password: 1 });
  const isAuthenticated = await login(value.currentPassword, user.password);

  if (!isAuthenticated)
    return resp
      .status(401)
      .send(
        new AppError(ErrorCodes.ERR_UNAUTHORIZED, "Invalid current password")
      );

  // Hash the new password and store it in DB
  const hashedPswd = await hash(value.newPassword);
  await UserCollection.updateOne({ email }, { $set: { password: hashedPswd } });

  resp.send();
});

/**
 * Change User Profile Pic
 */
route.put("/change-profile-pic", (req, resp) => {
  resp.send("change profile pic");
});

/**
 * Add new contact
 */
route.post("/add-contact", (req, resp) => {
  resp.send("add contact");
});

/**
 * Get user contacts
 */
route.get("/contacts", (req, resp) => {
  resp.send("contacts");
});

/**
 * Remove user contact
 */
route.delete("/contacts/:contactId", (req, resp) => {
  resp.send("delete contacts");
});

module.exports = route;
