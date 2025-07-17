import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';

import { PrismaClient } from '@/generated/prisma';

const prisma = new PrismaClient();
export const auth = betterAuth({
  account: {
    accountLinking: {
      autoSignIn: true,
      enabled: true,
    },
  },
  database: prismaAdapter(prisma, {
    provider: 'sqlite', // or "mysql", "postgresql", ...etc
  }),
  emailAndPassword: {
    autoSignIn: true,
    enabled: true,
    maxPasswordLength: 64,
    minPasswordLength: 8,
  },
  plugins: [nextCookies()],
  socialProviders: {
    github: {
      clientId: process.env.GITHUB_CLIENT_ID as string,
      clientSecret: process.env.GITHUB_CLIENT_SECRET as string,
    },
    google: {
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    },
  },
});
