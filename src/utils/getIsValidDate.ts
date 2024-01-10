import { IGetIsValidDateProps } from '../types/types';

const getIsValidDate = ({ year, month }: IGetIsValidDateProps): boolean => {
  const newDate = new Date();
  const currentYear = newDate.getFullYear();
  const validYear = !Number.isNaN(year) && year <= currentYear;
  const validMonth = !Number.isNaN(month) && month > 0 && month <= 12;

  return validYear && validMonth;
};

export default getIsValidDate;
