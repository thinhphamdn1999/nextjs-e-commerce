import * as bcrypt from 'bcrypt';

/**
 * Hashes a password using bcrypt with a generated salt. 
 * This function only for mocking purposes. In the real world, you should hash passwords on the server side.
 * @param password The password to be hashed
 * @returns - The hashed password
 */
export const saltAndHashPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // You can adjust the number of salt rounds for security vs performance trade-off
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
}
