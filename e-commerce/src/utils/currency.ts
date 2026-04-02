/**
 * Converts a number to a currency format.
 * @param number - The number to format.
 * @returns - The formatted currency string.
 */
export const formatCurrency = (number: number) => {
  const formatter = new Intl.NumberFormat(
    'en-US',
    {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    }
  );

  return formatter.format(number);
};
