import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const joiObjectId = JoiObjectId(Joi);

export const payloadSchema = Joi.object({
  model: Joi.string().required(),
  name: Joi.string().required(),
  esn: Joi.string().required(),
  lat: Joi.string().required(),
  long: Joi.string().required(),
  token: Joi.string().required(),
  observables: Joi.array().items(Joi.string()).optional()
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
  internalList: {
    query: Joi.object({
      esn: Joi.string().required()
    })
  },
  update: {
    params: Joi.object({
      id: joiObjectId().required()
    }),
    payload: payloadSchema
  }
};
