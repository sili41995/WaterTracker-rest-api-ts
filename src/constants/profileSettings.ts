import { IUserProfile } from '../types/types';

const profileSettings: IUserProfile = {
  passMinLength: 8,
  passMaxLength: 48,
  genders: ['girl', 'man'],
  minDailyWaterRequirement: 1,
  maxDailyWaterRequirement: 15000,
  minAmountOfWaterDrunk: 1,
  maxAmountOfWaterDrunk: 5000,
};

export default profileSettings;
