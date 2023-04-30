const express = require("express");

const auth = require("../../auth");
const { ErrorCodes, AppError } = require("../../exceptions");
const { validateUser, schema } = require("../../utils/validation");
const { sendMail, type } = require("../../utils/mail");
const UserCollection = require("../../db/model/User");
const VerificationCodeCollection = require("../../db/model/VerificationCode");

const route = express.Router();

/**
 * User Login
 */
route.post("/login", async (req, resp) => {
  const email = req.header("x-auth-email");
  const password = req.header("x-auth-password");

  const { error, value } = validateUser(
    { email, password },
    { email: schema.email, password: schema.password }
  );
  if (error)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, error.message));

  // Get User Details from DB
  const user = await UserCollection.findOne(
    { email: value.email },
    { email: 1, password: 1, name: 1, description: 1, _id: 1 }
  );
  if (!user)
    return resp
      .status(401)
      .send(
        new AppError(ErrorCodes.ERR_UNAUTHORIZED, "Invalid email/ password")
      );

  // Compare the plain password with the hashed password from the DB
  const success = await auth.login(value.password, user.password);

  if (!success)
    return resp
      .status(401)
      .send(
        new AppError(ErrorCodes.ERR_UNAUTHORIZED, "Invalid email/ password")
      );

  // Generate JWT token
  const token = auth.jwtToken(user.email, user.name, user._id);

  const { cookieNames, httpOnlyCookieProps, expiry } = auth.cookies;
  const expiresAt = expiry();

  resp.cookie(cookieNames.jwtTokenKey, token, {
    ...httpOnlyCookieProps,
    expires: expiresAt,
  });
  const { name, email: mail, description, avatarId, _id } = user;
  resp.status(200).send({ name, email: mail, description, avatarId, _id });
});

/**
 * Register User
 */
route.post("/register", async (req, resp) => {
  const body = req.body;
  const { value, error } = validateUser(body, {
    email: schema.email,
    password: schema.password,
    name: schema.name,
    phone: schema.phone,
  });
  if (error)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, error.message));

  // Check if User is already present or not
  const user = await UserCollection.findOne({
    email: value.email,
  });
  if (user)
    return resp
      .status(409)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "User already registered")
      );

  // Hash the password
  const hashedPswd = await auth.hash(value.password);

  // Create User Document
  const document = new UserCollection({ ...value, password: hashedPswd });
  // Save Document to DB
  const { email, name, description, avatarId, _id } = await document.save();

  // Generate JWT token
  const token = auth.jwtToken(email, name, _id);
  const { cookieNames, httpOnlyCookieProps, expiry } = auth.cookies;
  const expiresAt = expiry();
  resp.cookie(cookieNames.jwtTokenKey, token, {
    ...httpOnlyCookieProps,
    expires: expiresAt,
  });
  resp.status(200).send({ email, name, description, avatarId, _id });
});

/**
 * User forget password
 */
route.post("/forgot-pswd", async (req, resp) => {
  const email = req.query.email;
  const { error, value } = validateUser({ email }, { email: schema.email });
  if (error)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, error.message));

  // Verify user is present in the DB
  const user = await UserCollection.findOne(
    {
      email: value.email,
    },
    { email: 1, name: 1 }
  );

  if (!user)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_USR_NOT_FOUND, "User not found"));

  const data = {
    requestedBy: user.email,
    username: user.name,
    verificationCode: Math.floor(Math.random() * 90000) + 10000,
  };

  // Send verification code to the user
  await sendMail(type.FORGOT_PSWD, data);

  // Save Doc to DB
  const verificationDoc = new VerificationCodeCollection(data);
  await verificationDoc.save();

  resp.status(201).send();
});

/**
 * Verify User Account
 */
route.post("/verify-account", async (req, resp) => {
  const verifyCode = req.header("x-verify-code");
  const email = req.query.email;

  const { error, value } = validateUser({ email }, { email: schema.email });

  if (!verifyCode || error)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Invalid request"));

  // Check whether the Verification Code is expired or not
  const verify = await VerificationCodeCollection.find(
    {
      requestedBy: value.email,
      expiresAt: { $gt: new Date() },
    },
    { verificationCode: 1 }
  )
    .sort({ createdAt: -1 })
    .limit(1);

  if (verify.length === 0)
    return resp
      .status(410)
      .send(
        new AppError(
          ErrorCodes.ERR_VERIFY_CODE_EXPIRED,
          "Verification code expired"
        )
      );

  if (parseFloat(verifyCode) !== verify[0].verificationCode)
    return resp
      .status(400)
      .send(
        new AppError(
          ErrorCodes.ERR_INVALID_VERIFY_CODE,
          "Invalid verification code"
        )
      );
  resp.status(201).send();
});

/**
 * Change User password
 */
route.put("/change-pswd", async (req, resp) => {
  const password = req.header("x-password");
  const email = req.query.email;

  const { error, value } = validateUser(
    { password, email },
    { password: schema.password, email: schema.email }
  );
  if (error)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Invalid Request"));

  // Hash Password
  const hashedPswd = await auth.hash(value.password);

  // Update the password in DB
  const { modifiedCount } = await UserCollection.updateOne(
    { email: value.email },
    { $set: { password: hashedPswd } }
  );

  if (modifiedCount === 0)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_USR_NOT_FOUND, "User not found"));

  resp.status(201).send();
});

/**
 * Remove HttpOnly Cookie
 */
route.post("/logout", (_, resp) => {
  const { jwtTokenKey, isLoggedInKey } = auth.cookies.cookieNames;
  resp.clearCookie(jwtTokenKey);
  resp.clearCookie(isLoggedInKey);
  resp.status(201).send();
});

module.exports = route;
