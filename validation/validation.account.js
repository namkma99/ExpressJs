const Joi = require("joi");

exports.validationResgister = (data) => {
  const schema = Joi.object({
    userName: Joi.string().min(6).max(30).required(),

    password: Joi.string().min(3).max(30).required(),

    email: Joi.string().required().email(),

    role: Joi.string()
  });
  return schema.validate(data);
};
