type FlattenableValue = string | number | boolean | null | undefined | FlattenableObject | FlattenableValue[];
interface FlattenableObject {
  [key: string]: FlattenableValue;
}
type FlattenedResult = Record<string, string | number | boolean | (string | number | boolean)[]>;

/**
 * Checks if a value is neither undefined nor null.
 * @param value - The value to check.
 * @returns - True if the value is defined and not null, false otherwise.
 */
const isNotUndefinedOrNull = (value: unknown) => value !== undefined && value !== null;

/**
 * Recursively flattens a nested object into a single-level object
 * with key paths as keys. The key paths use bracket notation for nesting.
 *
 * @param {object} obj - The object to flatten.
 * @param {string} [prefix=''] - The prefix for key paths (used internally during recursion).
 * @returns {object} - The flattened object where each key is a path to a value in the original object.
 */
const flattenObject = (obj: FlattenableObject, prefix: string = ''): FlattenedResult => {
  const result: FlattenedResult = {};

  const processKeyValue = (key: string, value: FlattenableValue): void => {
    const fullKey = prefix ? `${prefix}[${key}]` : key;

    if (isNotUndefinedOrNull(value)) {
      if (Array.isArray(value)) {
        // Initialize array if not already present
        result[fullKey] = result[fullKey] || ([] as (string | number | boolean)[]);
        value.forEach((item) => {
          if (isNotUndefinedOrNull(item)) {
            if (typeof item === 'object' && !Array.isArray(item)) {
              // Recursively flatten nested objects within arrays
              Object.assign(result, flattenObject(item as FlattenableObject, fullKey));
            } else {
              (result[fullKey] as (string | number | boolean)[]).push(item as string | number | boolean);
            }
          }
        });
      } else if (typeof value === 'object' && value !== null) {
        // Recursively flatten nested objects
        Object.assign(result, flattenObject(value as FlattenableObject, fullKey));
      } else {
        // Assign primitive values directly
        result[fullKey] = value as string | number | boolean;
      }
    }
  };

  if (typeof obj === 'object' && obj !== null) {
    Object.entries(obj).forEach(([key, value]) => {
      processKeyValue(key, value);
    });
  }

  return result;
};

/**
 * Constructs a URL by appending query parameters to the provided endpoint.
 * The query parameters are generated from the provided object, which can include nested properties.
 *
 * @param {string} endpoint - The base URL endpoint to which query parameters will be appended.
 * @param {object} [params={}] - An object containing key-value pairs to be converted into query parameters.
 *                               Nested properties will be flattened into key paths.
 * @returns {string} - The constructed URL with the query parameters appended.
 */
export const urlBuilder = (endpoint: string, params = {}) => {
  const flattenedParams = flattenObject(params);
  const queryString = Object.entries(flattenedParams)
    .map(([key, value]) =>
      Array.isArray(value)
        ? value.map((v) => `${encodeURIComponent(key)}=${encodeURIComponent(v)}`).join('&')
        : `${encodeURIComponent(key)}=${encodeURIComponent(value)}`
    )
    .join('&');

  return `${endpoint}${queryString ? `?${queryString}` : ''}`;
};
