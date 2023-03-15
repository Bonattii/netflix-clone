import NextAuth from 'next-auth';
import { compare } from 'bcrypt';
import { PrismaAdapter } from '@next-auth/prisma-adapter';

import GithubProvider from 'next-auth/providers/github';
import GoogleProvider from 'next-auth/providers/google';
import Credentials from 'next-auth/providers/credentials';

import prismadb from '../../../lib/prismadb';

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID || '',
      clientSecret: process.env.GITHUB_SECRET || ''
    }),

    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID || '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET || ''
    }),

    Credentials({
      id: 'credentials',
      name: 'Credentials',

      // Which credentials are going to have
      credentials: {
        email: {
          label: 'Email',
          type: 'text'
        },
        password: {
          label: 'Password',
          type: 'password'
        }
      },

      async authorize(credentials) {
        // Check if password and email where provided
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password required');
        }

        // Search for a user with the email provided on the db
        const user = await prismadb.user.findUnique({
          where: {
            email: credentials.email
          }
        });

        // If didn't find an user throw an error
        if (!user || !user.hashedPassword) {
          throw new Error('Email does not exist');
        }

        // Use bcrypt to compare that the password provided are equal to the one stored on the db
        const isCorrectPassword = await compare(
          credentials.password,
          user.hashedPassword
        );

        // If the passwords are not the same throw an error
        if (!isCorrectPassword) {
          throw new Error('Incorrect password');
        }

        // If everything went well it means that the login was sucessfull and will return the user
        return user;
      }
    })
  ],

  // It informs what is the page used for authentication
  pages: {
    signIn: '/auth'
  },

  // Will show errors on the development area
  debug: process.env.NODE_ENV === 'development',

  adapter: PrismaAdapter(prismadb),

  // Say that the session strategy will be jwt
  session: {
    strategy: 'jwt'
  },

  // Pass the jwt secret
  jwt: {
    secret: process.env.NEXTAUTH_JWT_SECRET
  },

  // Next auth secret
  secret: process.env.NEXTAUTH_SECRET
});
