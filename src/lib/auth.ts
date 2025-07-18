import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';

import PasswordResetEmail from '@/components/emails/forgot-password-email';
import { PrismaClient } from '@/generated/prisma';

const resend = new Resend(process.env.RESEND_API_KEY as string);

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
    sendResetPassword: async ({ user, url }) => {
      await resend.emails.send({
        from: 'info@stevedoes.tech',
        react: PasswordResetEmail({
          resetUrl: url,
          userEmail: user.email,
          userName: user.name,
        }),
        subject: 'Reset your password',
        to: user.email,
      });
    },
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
