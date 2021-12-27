import Joi from 'joi';
import JoiObjectId from 'joi-objectid';

const joiObjectId = JoiObjectId(Joi);

export const rules = {
  create: {
    params: Joi.object({
      entity: Joi.string().valid('sensors', 'observables').required()
    }),
    payload: Joi.object().required()
  },
  get: {
    params: Joi.object({
      entity: Joi.string().valid('sensors', 'observables').required(),
      id: joiObjectId().required()
    })
  },
  list: {
    params: Joi.object({
      entity: Joi.string().valid('sensors', 'observables').required()
    })
  },
  update: {
    params: Joi.object({
      entity: Joi.string().valid('sensors', 'observables').required(),
      id: joiObjectId().required()
    }),
    payload: Joi.object().required()
  }
};
