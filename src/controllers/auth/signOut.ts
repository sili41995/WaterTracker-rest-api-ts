import { IAuthRequest } from 'types/types';
import { User } from '../../models/user';
import { ctrlWrapper } from '../../utils';
import { NextFunction, Response } from 'express';

const signOut = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { _id: id } = req.user;
  await User.findByIdAndUpdate(id, { token: null });

  res.status(204).json();
};

export default ctrlWrapper<IAuthRequest>(signOut);
