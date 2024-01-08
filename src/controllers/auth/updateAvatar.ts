import { IRequest, IUser } from '../../types/types';
import { User } from '../../models/user';
import {
  ctrlWrapper,
  updateImage,
  getImageFilename,
  httpError,
} from '../../utils';
import { NextFunction, Response } from 'express';

const updateAvatar = async (
  req: IRequest,
  res: Response,
  next: NextFunction
): Promise<void> => {
  if (!req.file) {
    throw httpError({ status: 404, message: 'File is absent' });
  }

  const { path } = req.file;
  const { avatar, _id: id } = req.user;
  const filename = getImageFilename(avatar);
  const { url: avatarURL } = await updateImage({
    path,
    filename,
  });
  const result = (await User.findByIdAndUpdate(id, {
    avatar: avatarURL,
  })) as IUser;

  res.status(200).json({ avatar: result.avatar });
};

export default ctrlWrapper<IRequest>(updateAvatar);
