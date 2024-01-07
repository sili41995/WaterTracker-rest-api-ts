import { IAuthRequest } from '../../types/types';
import { User } from '../../models/user';
import jwt from 'jsonwebtoken';
import { NextFunction, Response } from 'express';
import { ctrlWrapper, httpError } from '../../utils';

const { SECRET_KEY } = process.env;

const restorePassword = async (
  req: IAuthRequest,
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

  const result = await User.findOneAndUpdate(
    { email },
    { restorePasswordToken }
  );

  sendEmail({
    userEmail: result.email,
    token: result.restorePasswordToken,
  });

  res.status(200).json({ message: 'Password recovery email sent' });
};

export default ctrlWrapper<IAuthRequest>(restorePassword);
