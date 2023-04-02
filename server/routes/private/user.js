const express = require("express");
const { validateUser, schema } = require("../../utils/validation");
const { AppError, ErrorCodes } = require("../../exceptions");
const UserCollection = require("../../db/model/User");
const { hash, login, cookies, jwtToken } = require("../../auth");

const route = express.Router();

/**
 * Update User Password
 */
route.put("/change-pswd", async (req, resp) => {
  const { email } = req.payload;
  const currentPassword = req.header("x-current-password");
  const newPassword = req.header("x-new-password");

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
      .status(405)
      .send(
        new AppError(ErrorCodes.ERR_UNAUTHORIZED, "Invalid current password")
      );

  // Hash the new password and store it in DB
  const hashedPswd = await hash(value.newPassword);
  await UserCollection.updateOne({ email }, { $set: { password: hashedPswd } });

  // Generate JWT token
  const token = jwtToken(value.email);

  const { cookieNames, httpOnlyCookieProps, expiry } = cookies;
  const expiresAt = expiry();
  resp.cookie(cookieNames.jwtTokenKey, token, {
    ...httpOnlyCookieProps,
    expires: expiresAt,
  });

  resp.status(201).send();
});

/**
 * Update User Profile Details
 */
route.put("/profile", async (req, resp) => {
  const { email } = req.payload;

  const description = req.query.description;
  const avatarId = req.query.avatarId;
  const name = req.query.name;

  let updateOpt = {
    key: null,
    value: null,
  };

  if (description) {
    const { value, error } = validateUser(
      { description },
      {
        description: schema.description,
      }
    );
    if (!error) {
      updateOpt.key = "description";
      updateOpt.value = value;
    }
  } else if (avatarId) {
    updateOpt.key = "avatarId";
    updateOpt.value = avatarId;
  } else if (name) {
    const { value, error } = validateUser(
      { name },
      {
        name: schema.name,
      }
    );
    if (!error) {
      updateOpt.key = "name";
      updateOpt.value = value;
    }
  }

  if (!updateOpt.key)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, error.message));

  await UserCollection.updateOne(
    { email },
    { $set: { [updateOpt.key]: updateOpt.value } }
  );
  resp.status(201).send();
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

/**
 * Validate Token
 */
route.get("/validate-token", (_, resp) => {
  resp.status(204).send();
});

module.exports = route;
