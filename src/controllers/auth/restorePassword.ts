import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { IRequest, IUser } from '../../types/types';
import { User } from '../../models/user';
import { ctrlWrapper, httpError, sendEmail } from '../../utils';

const { SECRET_KEY } = process.env;

const restorePassword = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { email } = req.body;
  const user = await User.findOne({ email });

  if (!user) {
    throw httpError({ status: 404 });
  }

  const restorePasswordToken = jwt.sign({}, SECRET_KEY as string, {
    expiresIn: '1h',
  });

  const result = (await User.findOneAndUpdate(
    { email },
    { restorePasswordToken }
  )) as IUser;

  sendEmail({
    userEmail: result.email,
    token: result.restorePasswordToken as string,
  });

  res.status(200).json({ message: 'Password recovery email sent' });
};

export default ctrlWrapper<IRequest>(restorePassword);
