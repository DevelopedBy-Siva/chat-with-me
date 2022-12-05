const express = require("express");
const { ErrorCodes, AppError } = require("../../exceptions");
const auth = require("../../auth");
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
    { email: 1, password: 1 }
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
  const token = auth.jwtToken(user.email);
  resp.setHeader("x-auth-token", token).send();
});

/**
 * Register User
 */
route.post("/register", async (req, resp) => {
  const body = req.body;
  const { value, error } = validateUser(body);
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
      .status(400)
      .send(
        new AppError(ErrorCodes.ERR_INVALID_REQUEST, "User already registered")
      );

  // Hash the password
  const hashedPswd = await auth.hash(value.password);

  // Create User Document
  const document = new UserCollection({ ...value, password: hashedPswd });
  // Save Document to DB
  await document.save();

  // Generate JWT token
  const token = auth.jwtToken(value.email);
  resp.setHeader("x-auth-token", token).send();
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

  // Delete all records of a user
  await VerificationCodeCollection.deleteMany({ email: user.email });

  const data = {
    requestedBy: user.email,
    username: user.name,
    createdAt: Date.now(),
    verificationCode: Math.floor(Math.random() * 90000) + 10000,
  };
  // Save Doc to DB
  const verificationDoc = new VerificationCodeCollection(data);
  await verificationDoc.save();

  // Send verification code to the user
  await sendMail(type.FORGOT_PSWD, data);
  resp.send();
});

route.post("/verify-account", async (req, resp) => {
  const verifyCode = req.header("x-verify-code");
  const email = req.query.email;

  const { error, value } = validateUser({ email }, { email: schema.email });

  if (!verifyCode || error)
    return resp
      .status(400)
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, "Invalid request"));

  const user = await UserCollection.findOne({
    email: value.email,
  });
  if (!user)
    return resp
      .status(404)
      .send(new AppError(ErrorCodes.ERR_USR_NOT_FOUND, "User not found"));

  const verify = await VerificationCodeCollection.findOne(
    {
      requestedBy: value.email,
    },
    { verificationCode: 1 }
  );

  if (!verify)
    return resp
      .status(410)
      .send(
        new AppError(
          ErrorCodes.ERR_VERIFY_CODE_EXPIRED,
          "Verification code expired"
        )
      );
  if (parseFloat(verifyCode) !== verify.verificationCode)
    return resp
      .status(400)
      .send(
        new AppError(
          ErrorCodes.ERR_INVALID_REQUEST,
          "Invalid verification code"
        )
      );
  resp.send();
});

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
      .send(new AppError(ErrorCodes.ERR_INVALID_REQUEST, error.message));

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

  // Delete all records of a user
  await VerificationCodeCollection.deleteMany({ requestedBy: value.email });

  resp.send();
});

module.exports = route;
