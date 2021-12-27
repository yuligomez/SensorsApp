import Joi from 'joi';

export const payloadSchema = Joi.object({
  email: Joi.string().required()
});

export const rules = {
  create: {
    payload: payloadSchema
  }
};
