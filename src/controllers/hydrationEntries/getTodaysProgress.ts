import { IHydrationEntryRequest, IUser } from '../../types/types';
import { errorMessages } from '../../constants';
import { HydrationEntry } from '../../models/hydrationEntry';
import {
  ctrlWrapper,
  getTodayTime,
  httpError,
  getDayProgress,
} from '../../utils';
import { Response, NextFunction } from 'express';

const { dailyWaterRequirementAbsentErr } = errorMessages;

const getTodaysProgress = async (
  req: IHydrationEntryRequest,
  res: Response,
  next: NextFunction
) => {
  const { _id: owner, dailyWaterRequirement } = req.user as IUser;

  if (!dailyWaterRequirement) {
    throw httpError({
      status: 400,
      message: dailyWaterRequirementAbsentErr,
    });
  }

  const today = getTodayTime();
  const result = await HydrationEntry.find({ time: { $gte: today }, owner });
  const todayProgress = getDayProgress({
    entries: result,
    dailyWaterRequirement,
  });

  res.status(200).json({ data: result, progress: todayProgress });
};

export default ctrlWrapper<IHydrationEntryRequest>(getTodaysProgress);
