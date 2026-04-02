'use server';

import { signIn, signOut } from '@/auth';
import { ERROR_MESSAGES } from '@/constants/message';
import { AuthError } from 'next-auth';

const userSignOut = async () => {
  await signOut({
    redirect: false
  });
};

const userSignIn = async ({
  email,
  password
}: {
  email: string;
  password: string;
}) => {
  try {
    await signIn('credentials', {
      email,
      password,
      redirect: false
    });
  } catch (error) {
    if (error instanceof AuthError) {
      return ERROR_MESSAGES.ACCOUNT_AND_PASSWORD_INVALID;
    }

    throw error;
  }
};

export { userSignIn, userSignOut };
