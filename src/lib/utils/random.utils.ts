import crypto from "crypto";

/**
 * Generates a random number of specified length
 * @param length - The length of the random number to generate
 * @returns A random number of the specified length
 */
export const generateRandom = (length = 10): number => {
  // Generate random number
  const min = Math.pow(10, length - 1);
  const max = Math.pow(10, length) - 1;
  return Math.floor(min + Math.random() * (max - min + 1));
};

/**
 * Generates a random string of specified length
 * @param length - The length of the random string to generate
 * @returns A random string of the specified length
 */
export const generateRandomString = (length = 10): string => {
  return crypto.randomBytes(length).toString("hex").normalize();
};
