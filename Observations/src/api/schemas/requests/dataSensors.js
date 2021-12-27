import DateExtension from '@joi/date';
import JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

export const payloadSchema = Joi.object({
  esn: Joi.string().required(),
  observableProperty: Joi.string().required(),
  unit: Joi.string().required(),
  value: Joi.number().required()
});

export const rules = {
  list: {
    query: Joi.object({
      enddate: Joi.date().format('YYYY-MM-DD').required(),
      startdate: Joi.date().format('YYYY-MM-DD').required(),
      esn: Joi.string()
    }).when(Joi.object({ esn: Joi.exist() }).unknown(), {
      then: Joi.object({
        property: Joi.string().required(),
        time: Joi.string().valid('year', 'month', 'day')
      })
    })
  }
};
