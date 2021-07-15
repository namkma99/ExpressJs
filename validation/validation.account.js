const Joi = require("joi");

exports.validationResgister = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(6).max(30).required(),

    email: Joi.string().required().email(),

    password: Joi.string().min(3).max(30).required(),

    role: Joi.string(),
  });
  return schema.validate(data);
};

exports.validationLogin = (data) => {
  const schema = Joi.object({
    email: Joi.string().required().email(),

    password: Joi.string().min(3).max(30).required(),
  });
  return schema.validate(data);
};
