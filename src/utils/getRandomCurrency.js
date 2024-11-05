export const getRandomCurrency= (max = 3) => {
  const min = 0;
  return Math.floor(Math.random() * (max - min + 1)) + min;
};
