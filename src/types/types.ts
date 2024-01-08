import { Request } from 'express';
import { ObjectId } from 'mongoose';

export interface IHttpError {
  status: number;
  message?: string;
}

export type Gender = 'girl' | 'man';

export type MulterFile = Express.Multer.File;

export type MulterCB = (error: any, acceptFile?: boolean) => void;

export interface IUser {
  [key: string]: ObjectId | string | number | null | undefined;
  _id: ObjectId;
  email: string;
  password: string | undefined;
  token: string | null | undefined;
  avatar?: string;
  gender?: Gender;
  name?: string;
  dailyWaterRequirement?: number;
  restorePasswordToken: string | null | undefined;
}

export interface IHydrationEntry {
  _id: ObjectId;
  time: Date;
  amount: number;
  owner: ObjectId | undefined;
  dailyWaterRequirement: number;
}

export interface IRequest extends Request {
  user?: IUser;
  file?: MulterFile;
}

export interface IAuthRequest extends IRequest {
  body: IUser;
}

export interface IHydrationEntryRequest extends IRequest {
  body: IHydrationEntry;
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

export interface IUpdateImageProps {
  path: string;
  filename: string;
}

export interface IUpdateUserData extends Partial<IUser> {
  passwordOutdated?: string;
}
export interface IFilteredData {
  unset: { [key: string]: number };
  set: IUpdateUserData;
}

export interface IUnsetData {
  [key: string]: number;
}

export interface IUpdatePasswordProps {
  currentPassword: string;
  password: string;
  passwordOutdated: string | undefined;
}

export interface IDecodedToken {
  id: string;
}

export interface IGetMatchByTimeStageProps {
  year: string;
  month: string;
  owner: string;
}
