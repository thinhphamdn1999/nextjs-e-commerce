/**
 * Capitalize the first letter of a string
 * @param string - Text: 'hello world'
 * @returns - Text: 'Hello world'
 */
export const capitalizeFirstLetter = (string = '') =>
  string.charAt(0).toUpperCase() + string.slice(1);

/**
 * Format text by adding a space between words and capitalizing the first letter of each word.
 *
 * @param {string} string - Text: 'hello-world'
 * @param {string} sliptCharacter - The character user want to take for slipt
 * @returns {string} - Update case first letter of the sentence and add a space between words
 */
export const addSpaceAndCapitalizeFirstLetter = (
  string: string,
  sliptCharacter = '-'
) => {
  const words = string.split(sliptCharacter);
  const result = words
    .map((word) => capitalizeFirstLetter(word || ''))
    .join(' ');
  return result;
};

/**
 * Convert a number to a string with commas as thousands separators
 * @param number - Number to convert
 * @returns - String representation of the number with commas
 */
export const convertNumberToString = (number: number) => {
  return number.toLocaleString('en-IN');
};
