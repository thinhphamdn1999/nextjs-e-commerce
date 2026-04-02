import { ZodError } from 'zod';
import NextAuth from 'next-auth';
import Credentials from 'next-auth/providers/credentials';

import { signInSchema } from '@/lib/schema';
import { getUserFromDb } from '@/lib/get-user-from-db';
import { ROUTES } from '@/constants/routes';

export const { handlers, signIn, signOut, auth } = NextAuth({
  secret: process.env.AUTH_SECRET,
  providers: [
    Credentials({
      credentials: {
        email: {
          label: 'Email',
          type: 'email',
          placeholder: 'Enter your email'
        },
        password: {
          label: 'Password',
          type: 'password',
          placeholder: 'Enter your password'
        }
      },
      authorize: async (credentials) => {
        try {
          let user = null;

          const { email, password } =
            await signInSchema.parseAsync(credentials);

          // logic to verify if the user exists
          user = await getUserFromDb(email, password);

          if (!user) {
            return null;
          }

          // return JSON object with the user data
          return user;
        } catch (error) {
          if (error instanceof ZodError) {
            // Return `null` to indicate that the credentials are invalid
            return null;
          }
          return null;
        }
      }
    })
  ],
  pages: {
    signIn: ROUTES.LOGIN
  },
  callbacks: {
    authorized: async ({ auth, request: { nextUrl } }) => {
      const isLoggedIn = !!auth?.user;

      const isPublicPage = nextUrl.pathname === ROUTES.LOGIN;

      const isAuthenticatedPage =
        nextUrl.pathname === ROUTES.CART || nextUrl.pathname === ROUTES.PROFILE;

      // If the user is not logged in and trying to access an authenticated page, redirect them to the login page
      if (!isLoggedIn && isAuthenticatedPage) {
        return Response.redirect(new URL(ROUTES.LOGIN, nextUrl));
      }

      // If the user is logged in and trying to access a public page, redirect them to the home page
      if (isLoggedIn && isPublicPage) {
        return Response.redirect(new URL(ROUTES.HOME, nextUrl));
      }

      return true;
    },
    async session({ session, token }) {
      if (session?.user) Object?.assign(token, session?.user);

      Object?.assign(session.user, token);
      return session;
    }
  },
  session: {
    strategy: 'jwt',
    maxAge: 60 * 60 // 1 hour
  }
});
