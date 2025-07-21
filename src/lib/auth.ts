import {
  checkout,
  polar,
  portal,
  usage,
  // webhooks,
} from '@polar-sh/better-auth';
import { Polar } from '@polar-sh/sdk';
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { Resend } from 'resend';

import { POLAR_PRODUCT_IDS } from '@/components/checkout/constants';
import PasswordResetEmail from '@/components/emails/forgot-password-email';
import VerifyEmailTemplate from '@/components/emails/verify-email-email';
import { PrismaClient } from '@/generated/prisma';

const resend = new Resend(process.env.RESEND_API_KEY as string);

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN as string,
  server: 'sandbox',
});

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
    autoSignIn: false,
    enabled: true,
    maxPasswordLength: 64,
    minPasswordLength: 8,
    requireEmailVerification: true,
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
  emailVerification: {
    autoSignInAfterVerification: true,
    callbackUrl: '/dashboard',
    sendVerificationEmail: async ({ user, url }) => {
      await resend.emails.send({
        from: 'noreply@stevedoes.tech',
        react: VerifyEmailTemplate({
          userEmail: user.email,
          userName: user.name,
          verificationUrl: url,
        }),
        subject: 'Verify your email address',
        to: user.email,
      });
    },
    verificationTokenExpiresIn: 60 * 60 * 48,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          authenticatedUsersOnly: true,
          products: [
            {
              productId: POLAR_PRODUCT_IDS.annual.id,
              slug: POLAR_PRODUCT_IDS.annual.slug, // Ctom slug for easy reference in Checkout URL, e.g. /checkout/Better-Build-Annual
            },
            {
              productId: POLAR_PRODUCT_IDS.monthly.id,
              slug: POLAR_PRODUCT_IDS.monthly.slug, // Custom slug for easy reference in Checkout URL, e.g. /checkout/Better-Build-Monthly
            },
          ],
          successUrl: '/success?checkout_id={CHECKOUT_ID}',
        }),
        portal(),
        usage(),
      ],
    }),
    nextCookies(),
  ],
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
