import Joi from 'joi';
import { errorMessages } from '../constants';

const { missingFieldsErr } = errorMessages;

const notEmptyBodySchema = Joi.object().min(1).messages({
  'object.min': missingFieldsErr,
});

export default notEmptyBodySchema;
