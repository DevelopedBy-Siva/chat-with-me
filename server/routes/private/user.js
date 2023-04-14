const express = require("express");
const { v4: uuid } = require("uuid");
const {
  validateUser,
  validateNickname,
  schema,
  nextAdminIndex,
} = require("../../utils/validation");
const { AppError, ErrorCodes } = require("../../exceptions");
const UserCollection = require("../../db/model/User");
const GroupsCollection = require("../../db/model/Groups");
const ChatCollection = require("../../db/model/Chat");
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

  const isNicknameValid = validateNickname(nickname);
  if (!isNicknameValid)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Invalid nickname"));

  const toReturn = await UserCollection.findOne({ email: newContactMail });
  if (!toReturn)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Contact not found"));

  const data = await UserCollection.findOne({ email });
  const myContacts = data.contacts;

  if (myContacts.length >= 3)
    return resp
      .status(405)
      .send(
        new AppError(
          ErrorCodes.ERR_INVALID_REQUEST,
          "Maximum contacts limit reached"
        )
      );

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

  // Unique ID for Chat
  const chatId = uuid();

  data.contacts.push({
    email: newContactMail,
    nickname,
    isBlocked: false,
    chatId,
  });
  await data.save();

  const chatDocument = new ChatCollection({
    chatId,
    contacts: [email, newContactMail],
  });
  await chatDocument.save();

  const { email: mail, name, avatarId, description, isOnline } = toReturn;
  resp.status(200).send({
    email: mail,
    name,
    avatarId,
    description,
    isOnline,
    isBlocked: false,
    nickname,
    chatId,
    isPrivate: true,
  });
});

/**
 * Update Nickname
 */
route.put("/contact/nickname", async (req, resp) => {
  const { email } = req.payload;

  const toChange = req.query.email.trim().toLowerCase();
  const nickname = req.query.nickname.trim().toLowerCase();

  const isNicknameValid = validateNickname(nickname);
  if (!isNicknameValid)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Invalid nickname"));

  const data = await UserCollection.findOne({ email });
  const myContacts = data.contacts;

  const nicknameExists = myContacts.some((i) => i.nickname === nickname);
  if (nicknameExists)
    return resp
      .status(409)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Nickname already exists")
      );

  const index = myContacts.findIndex((i) => i.email === toChange);
  if (index === -1)
    return resp
      .status(400)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Contact doesn't exist")
      );

  data.contacts[index].nickname = nickname;
  await data.save();

  resp.status(201).send();
});

/**
 * Remove Contact
 */
route.delete("/contact", async (req, resp) => {
  const { email } = req.payload;

  const toDelete = req.query.email.trim().toLowerCase();

  const data = await UserCollection.findOne({ email });
  const myContacts = data.contacts;

  const index = myContacts.findIndex((i) => i.email === toDelete);
  if (index === -1)
    return resp
      .status(400)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Contact doesn't exist")
      );

  data.contacts.splice(index, 1);
  await data.save();

  resp.status(201).send();
});

/**
 * Block a contact
 */
route.put("/block", async (req, resp) => {
  const { email } = req.payload;

  const toBlock = req.query.email.trim().toLowerCase();

  const data = await UserCollection.findOne({ email });
  const myContacts = data.contacts;

  const index = myContacts.findIndex((i) => i.email === toBlock);
  if (index === -1)
    return resp
      .status(400)
      .send(
        new AppError(
          ErrorCodes.ERR_INVALID_REQUEST,
          "Contact doesn't exist or already blocked"
        )
      );

  data.contacts[index].isBlocked = true;
  await data.save();

  resp.status(201).send();
});

/**
 * Unblock a contact
 */
route.put("/unblock", async (req, resp) => {
  const { email } = req.payload;

  const toUnblock = req.query.email.trim().toLowerCase();

  const data = await UserCollection.findOne({ email });
  const myContacts = data.contacts;

  const index = myContacts.findIndex((i) => i.email === toUnblock);
  if (index === -1)
    return resp
      .status(400)
      .send(
        new AppError(
          ErrorCodes.ERR_INVALID_REQUEST,
          "Contact doesn't exist or already unblocked"
        )
      );

  data.contacts[index].isBlocked = false;
  await data.save();

  resp.status(201).send();
});

/**
 * Get user contacts
 */
route.get("/contacts", async (req, resp) => {
  const { email } = req.payload;
  const data = await UserCollection.findOne({ email });

  const myGroups = data.groups.map((ele) => ele.ref);
  const groups = await GroupsCollection.find({ _id: { $in: myGroups } });

  let grpMembers = [];
  groups.forEach((item) =>
    item.members.forEach((m) => grpMembers.push(m.email))
  );

  const myContacts = data.contacts.map((ele) => ele.email);

  const toLookUp = new Set();
  [...myContacts, ...grpMembers].forEach((item) => toLookUp.add(item));

  const contacts = await UserCollection.find({ email: { $in: [...toLookUp] } });

  let contactsToSend = [];
  myContacts.forEach((con) => {
    const index = contacts.findIndex((item) => item.email === con);
    if (index !== -1) {
      const details = contacts[index];
      const found = data.contacts.find((ele) => ele.email === details.email);

      contactsToSend.push({
        email: details.email,
        description: details.description,
        name: details.name,
        avatarId: details.avatarId,
        isOnline: details.isOnline,
        nickname: found.nickname,
        lastMsg: found.lastMsg,
        lastMsgTstmp: found.lastMsgTstmp,
        isBlocked: found.isBlocked,
        chatId: found.chatId,
        isPrivate: true,
      });
    }
  });

  let groupsToSend = [];
  groups.forEach((grp) => {
    let memberDetails = [];
    grp.members.forEach((item) => {
      if (item.email !== email) {
        const index = contacts.findIndex((i) => i.email === item.email);
        if (index !== -1) {
          const contactDetails = contacts[index];
          const found = data.contacts.find(
            (ele) => ele.email === contactDetails.email
          );
          const nickname = found ? found.nickname : undefined;
          memberDetails.push({
            name: contactDetails.name,
            email: contactDetails.email,
            avatarId: contactDetails.avatarId,
            nickname,
          });
        }
      }
    });
    groupsToSend.push({
      name: grp.name,
      admin: grp.admin,
      icon: grp.icon,
      lastMsg: grp.lastMsg,
      lastMsgTstmp: grp.lastMsgTstmp,
      members: memberDetails,
      chatId: grp.chatId,
      isPrivate: false,
    });
  });

  resp.status(200).send({
    contacts: contactsToSend,
    groups: groupsToSend,
  });
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
 * Create Group
 */
route.post("/create-group", async (req, resp) => {
  const { email } = req.payload;
  const { name, members, icon } = req.body;

  if (!Array.isArray(members) || members.length < 2)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Invalid Request"));

  members.push({ email });
  const contacts = members.map((i) => i.email);

  const userData = await UserCollection.find({ email: { $in: contacts } });

  const curentUserIndex = userData.findIndex((i) => i.email === email);
  const currentUserContacts = userData[curentUserIndex].contacts;

  if (userData[curentUserIndex].groups.length >= 2)
    return resp
      .status(405)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Group limit reached")
      );

  const membersToStore = userData.map((i) => {
    return {
      email: i.email,
    };
  });

  // Unique ChatId
  const chatId = uuid();

  const document = new GroupsCollection({
    name,
    members: membersToStore,
    admin: email,
    icon,
    chatId,
  });
  const data = await document.save();

  const groupRef = {
    ref: data._id,
  };

  await UserCollection.updateMany(
    { email: { $in: contacts } },
    { $push: { groups: groupRef } }
  );

  // Create Chat documment
  const chatDocument = new ChatCollection({
    chatId,
    contacts,
  });
  await chatDocument.save();

  let details = [];
  userData.forEach((i) => {
    if (i.email !== email) {
      let data = {
        nickname: null,
        name: i.name,
        email: i.email,
        avatarId: i.avatarId,
      };
      const exists = currentUserContacts.findIndex(
        (cur) => cur.email === i.email
      );
      if (exists !== -1) data.nickname = currentUserContacts[exists].nickname;
      details.push(data);
    }
  });

  resp.status(200).send({
    name: data.name,
    admin: data.admin,
    lastMsg: data.lastMsg,
    lastMsgTstmp: data.lastMsgTstmp,
    icon: data.icon,
    chatId: data.chatId,
    members: details,
    isPrivate: false,
  });
});

/**
 * Remove a user
 */
route.delete("/remove", async (req, resp) => {
  const { email } = req.payload;

  const isDeleted = await UserCollection.deleteOne({ email });

  if (isDeleted.deletedCount > 0) {
    const groups = await GroupsCollection.find({ members: { email } });

    for (let item of groups) {
      const noOfMembers = item.members.length;
      const iamAdmin = item.admin === email;

      if (noOfMembers > 3) {
        const userIndex = item.members.findIndex((i) => i.email === email);
        if (userIndex === -1) continue;

        if (iamAdmin) {
          // Generate a Random Admin Index
          const adminIndex = nextAdminIndex(userIndex, noOfMembers);
          item.admin = item.members[adminIndex].email;
        }
        item.members.splice(userIndex, 1);
        await item.save();
      } else await item.remove();
    }

    await Promise.all([
      UserCollection.updateMany({}, { $pull: { contacts: { email } } }),
      ChatCollection.deleteMany({
        isPrivate: true,
        contacts: { $in: [email] },
      }),
      ChatCollection.updateMany(
        {
          isPrivate: false,
          contacts: { $in: [email] },
        },
        {
          $pull: {
            contacts: {
              email,
            },
          },
        }
      ),
    ]);
  }

  const { jwtTokenKey, isLoggedInKey } = cookies.cookieNames;
  resp.clearCookie(jwtTokenKey);
  resp.clearCookie(isLoggedInKey);

  resp.status(201).send();
});

/**
 * Validate Token
 */
route.get("/", async (req, resp) => {
  try {
    const { email } = req.payload;
    const user = await UserCollection.findOne({ email });
    const { name, email: mail, isOnline, description, avatarId } = user;
    return resp
      .status(200)
      .send({ name, email: mail, isOnline, description, avatarId });
  } catch (ex) {
    const { isLoggedInKey, jwtTokenKey } = cookies.cookieNames;
    resp.clearCookie(isLoggedInKey);
    resp.clearCookie(jwtTokenKey);
    return resp
      .status(403)
      .send(new AppError(ErrorCodes.ERR_FORBIDDEN, "Invalid User"));
  }
});

module.exports = route;
