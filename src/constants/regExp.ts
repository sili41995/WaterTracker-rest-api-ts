import { IRegExp } from '../types/types';

const regExp: IRegExp = {
  emailRegExp: /^[-?\w.?%?]+@\w+\.{1}\w{2,4}$/,
  notEmptyValueRegExp: /\S/,
};

export default regExp;
