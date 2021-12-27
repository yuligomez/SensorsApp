import DateExtension from '@joi/date';
import JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);
import JoiObjectId from 'joi-objectid';

const joiObjectId = JoiObjectId(Joi);

export const rules = {
  create: {
    params: Joi.object({
      entity: Joi.string().valid('emails').required()
    }),
    payload: Joi.object().required()
  },
  get: {
    params: Joi.object({
      entity: Joi.string().valid('emails').required(),
      id: joiObjectId().required()
    })
  },
  list: {
    params: Joi.object({
      entity: Joi.string().valid('emails', 'analytics').required()
    }),
    query: Joi.object({
      esn: Joi.string()
    }).when(Joi.object({ esn: Joi.exist() }).unknown(), {
      then: Joi.object({
        enddate: Joi.date().format('YYYY-MM-DD').required(),
        startdate: Joi.date().format('YYYY-MM-DD').required(),
        property: Joi.string().required(),
        time: Joi.string().valid('year', 'month', 'day')
      })
    })
  },
  update: {
    params: Joi.object({
      entity: Joi.string().valid('emails').required(),
      id: joiObjectId().required()
    }),
    payload: Joi.object().required()
  }
};
