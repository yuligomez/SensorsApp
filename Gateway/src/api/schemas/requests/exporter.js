import Joi from 'joi';

export const rules = {
  create: {
    params: Joi.object({
      entity: Joi.string().valid('users').required()
    }),
    payload: Joi.object().required()
  },
  list: {
    params: Joi.object({
      entity: Joi.string().valid('exports').required()
    }),
    headers: Joi.object({
      token: Joi.string().required()
    }).options({ allowUnknown: true })
  }
};
