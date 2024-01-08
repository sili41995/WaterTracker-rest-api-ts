import { IHydrationEntryRequest, IUser } from '../../types/types';
import { HydrationEntry } from '../../models/hydrationEntry';
import { ctrlWrapper, getWaterIntakeTime } from '../../utils';
import { Response, NextFunction } from 'express';

const add = async (
  req: IHydrationEntryRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner, dailyWaterRequirement } = req.user as IUser;
  const { time } = req.body;
  const waterIntakeTime = getWaterIntakeTime(time);

  const result = await HydrationEntry.create({
    ...req.body,
    owner,
    time: waterIntakeTime,
    dailyWaterRequirement,
  });
  result.owner = undefined;

  res.status(201).json(result);
};

export default ctrlWrapper<IHydrationEntryRequest>(add);
