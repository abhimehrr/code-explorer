/**
 * Pads a number with leading zeros to ensure it is at least 2 digits long
 * @param num - The number to pad
 * @param pad - The number of digits to pad to
 * @returns The padded number as a string
 */
export const padStart = (num: number, pad = 2) =>
  num.toString().padStart(pad, "0");

/**
 * Returns an error message from an error object
 * @param msg - The message to display
 * @param error - The error object
 * @returns The error message
 */
export const errorMessage = (error: any, msg?: string) => {
  const errorMessage =
    error?.response?.data?.message ||
    error?.message ||
    "An unexpected error occurred";

  return msg ? `ERROR: ${msg}: ${errorMessage}` : errorMessage;
};

/**
 * Handle number input change
 * @param e - The change event
 * @param field - The field to update
 * @returns The updated field
 */
// export const handleNumberInputChange = (
//   e: React.ChangeEvent<HTMLInputElement>,
//   field: ControllerRenderProps<any>
// ) => {
//   const value = parseFloat(e.target.value);
//   if (e.target.value === "" || isNaN(value)) {
//     field.onChange("");
//     return;
//   }
//   field.onChange(value);
// };

/**
 * Handle number input change and set as string
 * @param e - The change event
 * @param field - The field to update
 * @returns The updated field
 */
// export const handleNumberInputChangeAsString = (
//   e: React.ChangeEvent<HTMLInputElement>,
//   field: ControllerRenderProps<any>
// ) => {
//   const value = parseFloat(e.target.value);
//   if (e.target.value === "" || isNaN(value)) {
//     field.onChange("");
//     return;
//   }
//   field.onChange(value.toString());
// };

/**
 * Set Index for each item in the array
 * @param data - The array of items to set the index for
 * @param filters - The filters to use to set the index
 * @returns The array of items with the index set
 */
export const setIndex = <T>(
  data: T[],
  filters: { page: number; limit: number }
) => {
  // Set Index for each item in the array
  return data.map((item: T, index: number) => {
    (item as any).index = (filters.page - 1) * filters.limit + index + 1;
    return item;
  });
};

/**
 * Truncate a string to a maximum length
 * @param str - The string to truncate
 * @param maxLength - The maximum length of the string
 * @returns The truncated string
 */
export const truncateString = (str: string, maxLength: number = 20) => {
  return str.length > maxLength ? str.substring(0, maxLength) + "..." : str;
};

/**
 * Check if two objects have the same values
 * @param a - The first object
 * @param b - The second object
 * @returns True if the objects have the same values, false otherwise
 */
export const haveSameValues = <
  TA extends Record<string, any>,
  TB extends Record<string, any>
>(
  a: TA,
  b: TB
) => {
  // Get the values of the objects
  const aValues = Object.values(a).sort();
  const bValues = Object.values(b).sort();

  // If the lengths are not the same, return false
  if (aValues.length !== bValues.length) return false;

  // If the values are not the same, return false
  return !aValues.some((val, idx) => val !== bValues[idx]);
};
