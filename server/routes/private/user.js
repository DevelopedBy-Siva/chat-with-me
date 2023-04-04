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
      updateOpt.value = value.description;
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
      updateOpt.value = value.name;
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
 * Add new contact
 */
route.post("/add-contact", async (req, resp) => {
  const { email } = req.payload;
  const body = req.body;

  const newContactMail = body.email.trim().toLowerCase();
  const nickname = body.nickname.trim().toLowerCase();

  const data = await UserCollection.findOne({ email });
  const myContacts = data.contacts;

  const isAdded = myContacts.some((i) => i.email === newContactMail);
  if (isAdded)
    return resp
      .status(409)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Contact already added")
      );

  const nicknameExists = myContacts.some((i) => i.nickname === nickname);
  if (nicknameExists)
    return resp
      .status(409)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Nickname already exists")
      );

  data.contacts.push({
    email: newContactMail,
    nickname,
    isPrivate: true,
  });
  data.save();

  const toReturn = await UserCollection.findOne({ email: newContactMail });
  if (!toReturn)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Contact not found"));

  const { email: mail, name, avatarId, description, isOnline } = toReturn;
  resp.status(200).send({
    email: mail,
    name,
    avatarId,
    description,
    isOnline,
    isPrivate: true,
    nickname,
  });
});

/**
 * Get user contacts
 */
route.get("/contacts", async (req, resp) => {
  const { email } = req.payload;
  const data = await UserCollection.findOne({ email });
  const myContacts = data.contacts.map((ele) => ele.email);

  const contacts = await UserCollection.find(
    { email: { $in: myContacts } },
    { email: 1, description: 1, name: 1, _id: 0, avatarId: 1, isOnline: 1 }
  );

  const toSend = contacts.map((item) => {
    const found = data.contacts.find((ele) => ele.email === item.email);
    return {
      email: item.email,
      description: item.description,
      name: item.name,
      avatarId: item.avatarId,
      isOnline: item.isOnline,
      isPrivate: found.isPrivate,
      nickname: found.nickname,
    };
  });
  resp.status(200).send(toSend);
});

/**
 * Search Contacts
 */
route.get("/contacts/search", async (req, resp) => {
  let searchQuery = req.query.searchQuery;
  const { email } = req.payload;

  if (!searchQuery || searchQuery.trim().length === 0)
    return resp.status(200).send([]);

  searchQuery = searchQuery.trim().toLowerCase();

  const contacts = await UserCollection.find(
    {
      name: { $regex: searchQuery },
      email: { $ne: email },
    },
    { email: 1, name: 1, avatarId: 1, _id: 0 }
  ).sort({ name: 1 });
  resp.status(200).send(contacts);
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
route.get("/", async (req, resp) => {
  const { email } = req.payload;
  const user = await UserCollection.findOne({ email });
  const { name, email: mail, isOnline, description, avatarId } = user;
  resp.status(200).send({ name, email: mail, isOnline, description, avatarId });
});

module.exports = route;
