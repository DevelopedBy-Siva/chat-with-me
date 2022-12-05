const Joi = require("joi");

const USER_SCHEMA = {
  name: Joi.string().trim().min(3).max(16).required().lowercase(),
  email: Joi.string().email().required().lowercase(),
  password: Joi.string().min(8).max(16).required(),
  phone: Joi.string().trim().min(10).max(11).regex(/^\d+$/).required(),
};

function validateUser(user, schema = USER_SCHEMA) {
  const joiObj = Joi.object(schema);
  return joiObj.validate(user);
}

module.exports.validateUser = validateUser;
module.exports.schema = USER_SCHEMA;
