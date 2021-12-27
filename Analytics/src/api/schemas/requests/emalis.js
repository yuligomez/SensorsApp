import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const joiObjectId = JoiObjectId(Joi);

export const payloadSchema = Joi.object({
  email: Joi.string().email().required()
});

export const rules = {
  get: {
    params: Joi.object({
      id: joiObjectId().required()
    })
  },
  create: {
    payload: payloadSchema
  },
  update: {
    params: Joi.object({
      id: joiObjectId().required()
    }),
    payload: payloadSchema
  }
};
