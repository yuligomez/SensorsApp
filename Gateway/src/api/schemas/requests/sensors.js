import Joi from 'joi';

export const payloadSchema = Joi.object({
  esn: Joi.string().required(),
  observableProperty: Joi.string().required(),
  unit: Joi.string().required(),
  value: Joi.number().required(),
});

export const rules = {
  create: {
    payload: payloadSchema
  }
};
