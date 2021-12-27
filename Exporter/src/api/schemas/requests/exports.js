import Joi from 'joi';

export const rules = {
  list: {
    query: Joi.object({
      email: Joi.string().required()
    }),
    headers: Joi.object({
      token: Joi.string().required()
    }).options({ allowUnknown: true })
  }
};
