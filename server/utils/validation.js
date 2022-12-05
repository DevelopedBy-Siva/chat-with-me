const Joi = require("joi");

/**
 * The Password must not contain any Whitespaces.
 * The Password must contain at least one Uppercase character.
 * The Password must contain at least one Lowercase character.
 * The Password must contain at least one digit.
 * The Password must have at least one Special Symbol.
 * The Password must be 8-16 characters long.
 */
const PASSWORD_PATTERN =
  /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[!@#$%&]).{8,16}$/;

const USER_SCHEMA = {
  name: Joi.string().trim().min(3).max(16).required().lowercase(),
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().regex(PASSWORD_PATTERN).required(),
  phone: Joi.string().trim().min(10).max(11).regex(/^\d+$/).required(),
};

function validateUser(user, schema = USER_SCHEMA) {
  const joiObj = Joi.object(schema);
  return joiObj.validate(user);
}

module.exports.validateUser = validateUser;
module.exports.schema = USER_SCHEMA;
