import { Response, NextFunction } from 'express';
import { ctrlWrapper, httpError } from '../../utils';
import { HydrationEntry } from '../../models/hydrationEntry';
import {
  getMatchByTimeStage,
  getSortByTimeStage,
  getGroupByDayStage,
  getEntriesInfoStage,
  getAddMonthNameStage,
  getAddDailyDataPostfixStage,
  getAddObjectIdStage,
  getRoundNumbersStage,
} from './aggregationStages';
import { errorMessages } from '../../constants';
import { IHydrationEntryRequest, IUser } from '../../types/types';

const { invalidDateErr } = errorMessages;

const getMonthProgress = async (
  req: IHydrationEntryRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { month, year } = req.query;
  const { _id: owner } = req.user as IUser;

  if (!month || !year) {
    throw httpError({
      status: 400,
      message: invalidDateErr,
    });
  }

  const matchByTimeStage = getMatchByTimeStage({
    month: String(month),
    year: String(year),
    owner: String(owner),
  });
  const sortByTimeStage = getSortByTimeStage();
  const groupByDayStage = getGroupByDayStage();
  const entriesInfoStage = getEntriesInfoStage();
  const roundNumbersStage = getRoundNumbersStage();
  const addMonthNameStage = getAddMonthNameStage();
  const addDailyDataPostfixStage = getAddDailyDataPostfixStage();
  const addObjectIdStage = getAddObjectIdStage();

  const result = await HydrationEntry.aggregate([
    matchByTimeStage,
    sortByTimeStage,
    groupByDayStage,
    entriesInfoStage,
    roundNumbersStage,
    addMonthNameStage,
    addDailyDataPostfixStage,
    addObjectIdStage,
  ]);

  res.status(200).json(result);
};

export default ctrlWrapper<IHydrationEntryRequest>(getMonthProgress);
