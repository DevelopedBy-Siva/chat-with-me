const Joi = require("joi");

const USER_SCHEMA = {
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().min(10).max(11).required(),
};

function validateUserRegistration(user) {
  const joiObj = Joi.object(USER_SCHEMA);
  return joiObj.validate(user);
}

module.exports.validateRegister = validateUserRegistration;
