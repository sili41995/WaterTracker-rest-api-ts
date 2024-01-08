import { IAuthRequest, IUser } from '../../types/types';
import { User } from '../../models/user';
import { ctrlWrapper } from '../../utils';
import { Response, NextFunction } from 'express';

const updateWater = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: id } = req.user as IUser;

  const result = await User.findByIdAndUpdate(id, req.body).select(
    'dailyWaterRequirement'
  );

  res.status(200).json(result);
};

export default ctrlWrapper<IAuthRequest>(updateWater);
