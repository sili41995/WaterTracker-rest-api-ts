import { NextFunction, Response } from 'express';
import { IAuthRequest, IUser } from '../../types/types';
import { User } from '../../models/user';
import {
  ctrlWrapper,
  filterFieldsToUpdate,
  getHashPassword,
} from '../../utils';

const updateProfile = async (
  req: IAuthRequest,
  res: Response,
  next: NextFunction
) => {
  const { _id: id, password: currentPassword } = req.user as IUser;

  const { set, unset } = filterFieldsToUpdate(req.body);

  if (set.password && currentPassword) {
    const hashPassword = await getHashPassword({
      currentPassword,
      password: set.password,
      passwordOutdated: set.passwordOutdated,
    });
    set.password = hashPassword;
  }

  const result = await User.findByIdAndUpdate(id, {
    $set: set,
    $unset: unset,
  }).select('-token -restorePasswordToken -password');

  res.status(200).json(result);
};

export default ctrlWrapper<IAuthRequest>(updateProfile);
