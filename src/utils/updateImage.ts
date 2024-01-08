import fs from 'fs/promises';
import cloudinary from './cloudinary';
import { UploadApiResponse } from 'cloudinary';
import { IUpdateImageProps } from '../types/types';

const updateImage = async ({
  path,
  filename,
}: IUpdateImageProps): Promise<UploadApiResponse> => {
  const result = await cloudinary.uploader.upload(path, {
    public_id: filename,
    folder: 'avatars',
    width: 200,
    height: 200,
    gravity: 'face',
    crop: 'thumb',
  });

  await fs.unlink(path);

  return result;
};

export default updateImage;
