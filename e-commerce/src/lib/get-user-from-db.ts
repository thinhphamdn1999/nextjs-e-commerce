import bcrypt from 'bcryptjs';

const mockUserDB = {
  email: process.env.USER_EMAIL || 'mockPassword',
  password: process.env.PASSWORD || 'mockPassword'
};

const getHashedPassword = async (password: string): Promise<string> => {
  const saltRounds = 10; // You can adjust the number of salt rounds for security vs performance trade-off
  const hashedPassword = await bcrypt.hash(password, saltRounds);
  return hashedPassword;
};

/**
 * Mocks a database call to get a user by email and password.
 * @param email - The email of the user
 * @param password - The password of the user
 * @returns
 */
export const getUserFromDb = async (
  email: string,
  password: string
): Promise<{ email: string } | null> => {
  const mockUserDBHashedPassword = await getHashedPassword(mockUserDB.password);
  const isMatchedPassword = await bcrypt.compare(
    password,
    mockUserDBHashedPassword
  );

  const isMatchedEmail = mockUserDB.email === email;

  if (isMatchedEmail && isMatchedPassword) {
    return {
      email: mockUserDB.email
    };
  }

  return null;
};
