import { Schema, model } from 'mongoose';
import Joi from 'joi';
import { handleMongooseError, preUpdate } from './hooks';
import { errorMessages, profileSettings } from '../constants';
import { IHydrationEntry } from '../types/types';

const {
  timeFeatureErr,
  dailyWaterRequirementErr,
  amountRequiredErr,
  timeRequiredErr,
} = errorMessages;
const { maxAmountOfWaterDrunk, minAmountOfWaterDrunk } = profileSettings;

const hydrationEntrySchema = new Schema<IHydrationEntry>(
  {
    time: {
      type: Date,
      max: [Date.now(), timeFeatureErr],
      required: [true, timeRequiredErr],
    },
    amount: {
      type: Number,
      min: [minAmountOfWaterDrunk, dailyWaterRequirementErr],
      max: [maxAmountOfWaterDrunk, dailyWaterRequirementErr],
      required: [true, amountRequiredErr],
    },
    owner: {
      type: Schema.Types.ObjectId,
      ref: 'user',
    },
    dailyWaterRequirement: { type: Number, required: true },
  },
  { versionKey: false, timestamps: true }
);

hydrationEntrySchema.pre('findOneAndUpdate', preUpdate);
hydrationEntrySchema.post('save', handleMongooseError);
hydrationEntrySchema.post('findOneAndUpdate', handleMongooseError);

const addHydrationEntrySchema = Joi.object({
  time: Joi.date().max('now').required().messages({
    'any.required': timeRequiredErr,
    'date.max': timeFeatureErr,
  }),
  amount: Joi.number()
    .min(minAmountOfWaterDrunk)
    .max(maxAmountOfWaterDrunk)
    .required()
    .messages({
      'any.required': amountRequiredErr,
      'number.min': dailyWaterRequirementErr,
      'number.max': dailyWaterRequirementErr,
    }),
});

const HydrationEntry = model<IHydrationEntry>(
  'hydrationEntry',
  hydrationEntrySchema
);

export { HydrationEntry, addHydrationEntrySchema };
