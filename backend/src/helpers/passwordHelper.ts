import bcrypt from "bcrypt";
import config from "../config";

/**
 * Hashes a plain-text password using bcrypt.
 * @param password - The plain-text password to be hashed.
 * @returns A promise that resolves to the hashed password.
 */
export const hashPassword = async (password: string) => {
  return await bcrypt.hash(password, config.saltRound);
};

/**
 * Compares a plain-text password with a hashed password to verify if they match.
 * @param password - The plain-text password to be compared.
 * @param hashPassword - The hashed password to compare against.
 * @returns A promise that resolves to a boolean indicating whether the passwords match.
 */
export const comparePassword = async (
  password: string,
  hashPassword: string
): Promise<boolean> => {
  try {
    console.log(password, hashPassword);
    const isMatch = await bcrypt.compare(password, hashPassword);
    return isMatch;
  } catch (error) {
    console.error("Error comparing passwords:", error);
    return false;
  }
};
