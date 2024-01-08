import { IFilteredData, IUnsetData, IUpdateUserData } from '../types/types';

const filterFieldsToUpdate = (data: IUpdateUserData): IFilteredData => {
  const unset: IUnsetData = {};
  const set: IUpdateUserData = {};

  const keys = Object.keys(data);
  keys.forEach((key) => {
    data[key] === '' ? (unset[key] = 1) : (set[key] = data[key] as string);
  });

  return { set, unset };
};

export default filterFieldsToUpdate;
