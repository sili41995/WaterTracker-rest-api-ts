import { IHydrationEntryRequest, IUser } from '../../types/types';
import { findHydrationEntryFilter } from '../../constants';
import { HydrationEntry } from '../../models/hydrationEntry';
import { ctrlWrapper, httpError } from '../../utils';
import { Response, NextFunction } from 'express';

const deleteById = async (
  req: IHydrationEntryRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: owner } = req.user as IUser;
  const { entryId: _id } = req.params;

  const result = await HydrationEntry.findOneAndDelete({ _id, owner }).select(
    findHydrationEntryFilter
  );

  if (!result) {
    throw httpError({ status: 404 });
  }

  res.status(200).json(result);
};

export default ctrlWrapper<IHydrationEntryRequest>(deleteById);
