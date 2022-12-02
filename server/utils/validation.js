const Joi = require("joi");

const user_schema = {
  name: Joi.string().min(3).max(16).required(),
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  phone: Joi.string().min(10).max(11).required(),
};

function validateUserRegistration(user) {
  const joiObj = Joi.object(user_schema);
  return joiObj.validate(user);
}

module.exports.validateRegister = validateUserRegistration;
