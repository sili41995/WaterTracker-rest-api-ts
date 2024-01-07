import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface IHttpError {
  status: number;
  message?: string;
}

export type Gender = 'girl' | 'man';

export type MulterFile = Express.Multer.File;

export interface IUser {
  _id: ObjectId;
  email: string;
  password: string | undefined;
  token: string | null | undefined;
  avatar?: string;
  gender: Gender;
  name: string;
  dailyWaterRequirement: number;
  restorePasswordToken: string | null | undefined;
}

export interface IRequest extends Request {
  user: IUser;
  file?: MulterFile;
}

export interface IAuthRequest extends IRequest {
  body: IUser;
}

//other
export interface IErrorMessages {
  [key: string]: string;
}

export interface IRegExp {
  [key: string]: RegExp;
}

export interface IUserProfile {
  passMinLength: number;
  passMaxLength: number;
  genders: Gender[];
  minDailyWaterRequirement: number;
  maxDailyWaterRequirement: number;
  minAmountOfWaterDrunk: number;
  maxAmountOfWaterDrunk: number;
}

export interface IErrorMessageList {
  [key: number]: string;
}

export interface ISendEmailProps {
  userEmail: string;
  token: string;
}
