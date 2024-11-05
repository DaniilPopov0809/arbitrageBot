export const getRandomDepositValue = () => {
  const min = 0.1;
  const max = 0.3;
  return ((Math.random() * (max - min)) + min).toFixed(1);
};
  