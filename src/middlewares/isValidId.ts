import { Request, Response, NextFunction } from 'express';
import { isValidObjectId } from 'mongoose';
import { httpError } from '../utils';

const isValidId = (req: Request, res: Response, next: NextFunction): void => {
  const { entryId } = req.params;
  if (!isValidObjectId(entryId)) {
    return next(
      httpError({ status: 404, message: `${entryId} is not valid id` })
    );
  }

  next();
};

export default isValidId;
