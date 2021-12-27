import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const joiObjectId = JoiObjectId(Joi);

export const payloadSchema = Joi.object({
  name: Joi.string().required(),
  standardUnit: Joi.string().required(),
  minValue: Joi.number().required(),
  maxValue: Joi.number().required(),
  sensors: Joi.array().items(Joi.string()).optional()
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
      name: Joi.string().required()
    })
  },
  update: {
    params: Joi.object({
      id: joiObjectId().required()
    }),
    payload: payloadSchema
  }
};
