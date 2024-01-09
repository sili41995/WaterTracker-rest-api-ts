import { IGetDayProgressProps } from '../types/types';

const getDayProgress = ({
  entries,
  dailyWaterRequirement,
}: IGetDayProgressProps): number => {
  const amounts = entries.map(({ amount }) => amount);
  const totalAmount = amounts.reduce((acc, amount) => acc + amount, 0);

  return (100 / dailyWaterRequirement) * totalAmount;
};

export default getDayProgress;
