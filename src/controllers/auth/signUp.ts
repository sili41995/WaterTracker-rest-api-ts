import bcrypt from 'bcryptjs';
import { User } from '../../models/user';
import { ctrlWrapper, httpError } from '../../utils';
import { NextFunction, Request, Response } from 'express';

const signUp = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  const { password, email } = req.body;
  const user = await User.findOne({ email });

  if (user) {
    throw httpError({ status: 409, message: 'Email already use' });
  }

  const hashPassword = await bcrypt.hash(password, 10);
  const result = await User.create({
    ...req.body,
    password: hashPassword,
  });
  result.password = undefined;
  result.restorePasswordToken = undefined;

  res.status(201).json({
    user: result,
  });
};

export default ctrlWrapper<Request>(signUp);
