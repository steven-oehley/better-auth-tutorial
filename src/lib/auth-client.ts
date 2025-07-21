import { polarClient } from '@polar-sh/better-auth';
import { createAuthClient } from 'better-auth/react';

const authClient = createAuthClient({
  /** The base URL of the server (optional if you're using the same domain) */
  baseURL: 'http://localhost:3000',
  plugins: [polarClient()],
});

export const { signIn, signUp, signOut, useSession, checkout } = authClient;
