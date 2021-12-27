import DateExtension from '@joi/date';
import JoiImport from 'joi';
const Joi = JoiImport.extend(DateExtension);

export const rules = {
  list: {
    query: Joi.object({
      enddate: Joi.date().format('YYYY-MM-DD').required(),
      startdate: Joi.date().format('YYYY-MM-DD').required(),
      esn: Joi.string().required(),
      property: Joi.string().required(),
      time: Joi.string().valid('year', 'month', 'day')
    })
  }
};
