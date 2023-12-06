export const numberWithComma = (number) => {
  return Intl.NumberFormat("en-Us", {
    maximumFractionDigits: 2,
  }).format(number);
};
