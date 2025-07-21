# Better Auth Tutorial

[Complete Auth Setup in Next.js with Better-Auth | Email, Social Login & Reset Password](https://www.youtube.com/watch?v=n6rP9d3RWo8&t=222s)

# Better Auth + Polar Integration Guide

Complete guide for integrating Polar payments with Better Auth in Next.js 15.

## 📋 Table of Contents

1. [Setup](#setup)
2. [Configuration](#configuration)
3. [Available API Methods](#available-api-methods)
4. [Server-Side Usage](#server-side-usage)
5. [Client-Side Usage](#client-side-usage)
6. [Subscription Protection](#subscription-protection)
7. [Toast Notifications](#toast-notifications)
8. [Common Patterns](#common-patterns)
9. [Troubleshooting](#troubleshooting)

## 🚀 Setup

### Required Packages

```bash
npm install better-auth @polar-sh/better-auth @polar-sh/sdk prisma nuq sonner
```

### Environment Variables

```env
# Polar Configuration
POLAR_ACCESS_TOKEN=your_polar_access_token
POLAR_WEBHOOK_SECRET=your_webhook_secret

# Database
DATABASE_URL=your_database_url

# Email (Resend)
RESEND_API_KEY=your_resend_api_key

# OAuth (optional)
GITHUB_CLIENT_ID=your_github_client_id
GITHUB_CLIENT_SECRET=your_github_client_secret
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
```

## ⚙️ Configuration

### Server Configuration (`lib/auth.ts`)

```typescript
import { betterAuth } from 'better-auth';
import { prismaAdapter } from 'better-auth/adapters/prisma';
import { nextCookies } from 'better-auth/next-js';
import { polar, checkout, portal, usage } from '@polar-sh/better-auth';
import { Polar } from '@polar-sh/sdk';

const polarClient = new Polar({
  accessToken: process.env.POLAR_ACCESS_TOKEN as string,
  server: 'sandbox', // or 'production'
});

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: 'sqlite', // or 'postgresql', 'mysql'
  }),
  emailAndPassword: {
    enabled: true,
    requireEmailVerification: true,
  },
  plugins: [
    polar({
      client: polarClient,
      createCustomerOnSignUp: true,
      use: [
        checkout({
          authenticatedUsersOnly: true,
          products: [
            { productId: 'your-annual-product-id', slug: 'annual' },
            { productId: 'your-monthly-product-id', slug: 'monthly' },
          ],
          successUrl: '/success?checkout_id={CHECKOUT_ID}',
        }),
        portal(),
        usage(),
      ],
    }),
    nextCookies(),
  ],
});
```

### Client Configuration (`lib/auth-client.ts`)

```typescript
import { createAuthClient } from 'better-auth/react';
import { polarClient } from '@polar-sh/better-auth';

export const authClient = createAuthClient({
  baseURL:
    process.env.NODE_ENV === 'production'
      ? 'https://yourdomain.com'
      : 'http://localhost:3000',
  plugins: [polarClient()],
});

export const { signIn, signUp, signOut, useSession, checkout } = authClient;
```

## 🔧 Available API Methods

All Polar methods are available on `auth.api`:

### Subscription Management

- `auth.api.subscriptions()` - List user subscriptions
- `auth.api.state()` - Get complete customer state
- `auth.api.portal()` - Get customer portal URL

### Checkout & Payments

- `auth.api.checkout()` - Create checkout session
- `auth.api.orders()` - List user orders

### Benefits & Features

- `auth.api.benefits()` - List user benefits

### Usage Billing

- `auth.api.ingestion()` - Ingest usage events
- `auth.api.meters()` - Get usage meters

### Authentication (Standard Better Auth)

- `auth.api.getSession()` - Get current session
- `auth.api.signInEmail()` - Sign in with email
- `auth.api.signUpEmail()` - Sign up with email
- `auth.api.signOut()` - Sign out user

## 🖥️ Server-Side Usage

### Subscription Queries (`lib/subscription/queries.ts`)

```typescript
import { cache } from 'react';
import { auth } from '@/lib/auth';
import { headers } from 'next/headers';

export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

export const getUserSubscriptions = cache(async () => {
  const session = await getSession();
  if (!session?.user) return [];

  try {
    const result = await auth.api.subscriptions({
      headers: await headers(),
      query: { active: true, limit: 100 },
    });
    return result.data || [];
  } catch (error) {
    console.error('Failed to get subscriptions:', error);
    return [];
  }
});

export const hasActiveSubscription = cache(async () => {
  const subscriptions = await getUserSubscriptions();
  return subscriptions.some((sub) => sub.status === 'active');
});

export const getCustomerState = cache(async () => {
  const session = await getSession();
  if (!session?.user) return null;

  try {
    const result = await auth.api.state({
      headers: await headers(),
    });
    return result;
  } catch (error) {
    console.error('Failed to get customer state:', error);
    return null;
  }
});
```

### Server Actions (`lib/subscription/actions.ts`)

```typescript
'use server';

import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { headers } from 'next/headers';

export async function redirectToCustomerPortal() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) {
    redirect('/sign-in?toast=auth-required');
  }

  try {
    const portalUrl = await auth.api.portal({
      headers: await headers(),
    });
    redirect(portalUrl);
  } catch (error) {
    redirect('/dashboard?toast=portal-error');
  }
}

export async function requireSubscription() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    redirect('/sign-in?toast=auth-required');
  }

  const subscriptions = await auth.api.subscriptions({
    headers: await headers(),
    query: { active: true },
  });

  const hasActive = subscriptions.data?.some((sub) => sub.status === 'active');

  if (!hasActive) {
    redirect('/subscribe?toast=sub-required');
  }

  return { session, subscriptions: subscriptions.data };
}
```

## 💻 Client-Side Usage

### Subscription Status Component

```typescript
'use client'

import { useEffect, useState } from 'react'
import { useSession } from '@/lib/auth-client'

export function SubscriptionStatus() {
  const { data: session } = useSession()
  const [hasSubscription, setHasSubscription] = useState(false)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (!session?.user) return

    const checkSubscription = async () => {
      try {
        const response = await fetch('/api/subscription-status')
        const { hasActiveSubscription } = await response.json()
        setHasSubscription(hasActiveSubscription)
      } catch (error) {
        console.error('Failed to check subscription:', error)
      } finally {
        setLoading(false)
      }
    }

    checkSubscription()
  }, [session])

  if (loading) return <div>Loading...</div>

  return (
    <div className={`p-4 rounded ${hasSubscription ? 'bg-green-100' : 'bg-red-100'}`}>
      {hasSubscription ? 'Active Subscription ✅' : 'No Active Subscription ❌'}
    </div>
  )
}
```

### Subscribe Button

```typescript
'use client'

import { useState } from 'react'
import { checkout, useSession } from '@/lib/auth-client'
import { useRouter } from 'next/navigation'

interface SubscribeButtonProps {
  planSlug: string
  planName: string
}

export function SubscribeButton({ planSlug, planName }: SubscribeButtonProps) {
  const { data: session } = useSession()
  const [loading, setLoading] = useState(false)
  const router = useRouter()

  const handleSubscribe = async () => {
    if (!session?.user) {
      router.push('/sign-in?toast=auth-required')
      return
    }

    setLoading(true)
    try {
      await checkout({ slug: planSlug })
    } catch (error) {
      console.error('Checkout failed:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <button
      onClick={handleSubscribe}
      disabled={loading}
      className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg disabled:opacity-50"
    >
      {loading ? 'Starting checkout...' : `Subscribe to ${planName}`}
    </button>
  )
}
```

## 🛡️ Subscription Protection

### Protected Page Pattern

```typescript
// app/dashboard/page.tsx
import { requireSubscription } from '@/lib/subscription/actions'

export default async function DashboardPage() {
  const { session } = await requireSubscription()

  return (
    <div>
      <h1>Welcome to your dashboard, {session.user.name}!</h1>
      {/* Protected content */}
    </div>
  )
}
```

### API Route Protection

```typescript
// app/api/premium-feature/route.ts
import { auth } from '@/lib/auth';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session?.user) {
    return Response.json({ error: 'Unauthorized' }, { status: 401 });
  }

  const subscriptions = await auth.api.subscriptions({
    headers: request.headers,
    query: { active: true },
  });

  const hasActive = subscriptions.data?.some((sub) => sub.status === 'active');

  if (!hasActive) {
    return Response.json({ error: 'Subscription required' }, { status: 403 });
  }

  // Return premium feature data
  return Response.json({ data: 'premium content' });
}
```

## 🔔 Toast Notifications

### Toast Configuration (`lib/toast-params.ts`)

```typescript
export const TOAST_PARAMS = {
  'sub-required': {
    type: 'error' as const,
    title: 'Subscription Required',
    message: 'Please subscribe to access this feature',
  },
  'auth-required': {
    type: 'error' as const,
    title: 'Authentication Required',
    message: 'Please sign in to continue',
  },
  'sub-success': {
    type: 'success' as const,
    title: 'Welcome!',
    message: 'Subscription activated successfully',
  },
} as const;

export function redirectWithToast(
  path: string,
  toastParam: keyof typeof TOAST_PARAMS,
) {
  const url = new URL(path, 'http://localhost:3000');
  url.searchParams.set('toast', toastParam);
  redirect(url.pathname + url.search);
}
```

### Toast Handler (`hooks/use-toast-params.ts`)

```typescript
'use client';

import { useQueryState } from 'nuq';
import { useEffect } from 'react';
import { toast } from 'sonner';
import { getToastFromParam } from '@/lib/toast-params';

export function useToastParams() {
  const [toastParam, setToastParam] = useQueryState('toast', {
    defaultValue: '',
    clearOnDefault: true,
  });

  useEffect(() => {
    if (toastParam) {
      const toastData = getToastFromParam(toastParam);

      if (toastData) {
        toast[toastData.type](toastData.title, {
          description: toastData.message,
        });
        setToastParam('');
      }
    }
  }, [toastParam, setToastParam]);
}
```

## 🎯 Common Patterns

### Check Feature Access

```typescript
export const hasFeatureAccess = cache(async (featureType: string) => {
  const session = await getSession();
  if (!session?.user) return false;

  try {
    const benefits = await auth.api.benefits({
      headers: await headers(),
      query: { limit: 100 },
    });

    return (
      benefits.data?.some((benefit) => benefit.type === featureType) ?? false
    );
  } catch (error) {
    return false;
  }
});
```

### Usage Tracking

```typescript
export async function trackUsage(event: string, metadata: Record<string, any>) {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session?.user) return;

  try {
    await auth.api.ingestion({
      event,
      metadata,
      headers: await headers(),
    });
  } catch (error) {
    console.error('Usage tracking failed:', error);
  }
}
```

## 🐛 Troubleshooting

### Common Issues

1. **"customer not found"** - Check that `createCustomerOnSignUp: true` is set
2. **"access token invalid"** - Verify your `POLAR_ACCESS_TOKEN` environment variable
3. **"methods not available"** - Ensure `portal()` plugin is in the `use` array
4. **TypeScript errors** - Use `auth.api.methodName()` not `auth.customer.methodName()`

### Debug Helper

```typescript
export async function debugPolarIntegration() {
  console.log('Environment:', {
    hasAccessToken: !!process.env.POLAR_ACCESS_TOKEN,
    nodeEnv: process.env.NODE_ENV,
  });

  console.log('Auth methods:', Object.keys(auth.api));

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (session?.user) {
    try {
      const state = await auth.api.state({
        headers: await headers(),
      });
      console.log('Customer state:', state);
    } catch (error) {
      console.error('State error:', error);
    }
  }
}
```

## 📝 Notes

- Always use `auth.api.*` methods, not `auth.customer.*`
- React's `cache()` prevents duplicate API calls within a request
- Query params are better than cookies for toast messages
- Server-side validation is required for security
- Use `createCustomerOnSignUp: true` for automatic customer creation

## 🚀 Next Steps

1. Set up Polar webhooks for real-time subscription updates
2. Implement usage-based billing with meters
3. Add subscription plan management
4. Set up automated email notifications
5. Configure analytics tracking

# Complete Better Auth + Polar API Endpoints

## 🔐 Core Better Auth Endpoints

### Session Management

```bash
GET  /api/auth/session           # Get current session
GET  /api/auth/get-session       # Alternative session endpoint
POST /api/auth/sign-out          # Sign out user
```

### Email & Password Authentication

```bash
POST /api/auth/sign-in/email     # Email sign in
POST /api/auth/sign-up/email     # Email sign up
POST /api/auth/forgot-password   # Request password reset
POST /api/auth/reset-password    # Reset password with token
```

### Email Verification

```bash
POST /api/auth/send-verification-email    # Send verification email
GET  /api/auth/verify-email              # Verify email with token
POST /api/auth/resend-verification       # Resend verification email
```

### Social Authentication (OAuth)

```bash
GET  /api/auth/sign-in/google      # Google OAuth sign in
GET  /api/auth/callback/google     # Google OAuth callback
GET  /api/auth/sign-in/github      # GitHub OAuth sign in
GET  /api/auth/callback/github     # GitHub OAuth callback
```

### Account Management

```bash
POST /api/auth/update-user         # Update user profile
POST /api/auth/change-password     # Change password
POST /api/auth/delete-user         # Delete user account
GET  /api/auth/list-sessions       # List user sessions
POST /api/auth/revoke-session      # Revoke specific session
POST /api/auth/revoke-sessions     # Revoke all sessions
```

## 💳 Polar Plugin Endpoints

### Checkout

```bash
POST /api/auth/checkout                    # Create checkout session
POST /api/auth/checkout/{slug}             # Create checkout by product slug
GET  /api/auth/checkout/{checkout_id}      # Get checkout details
```

### Customer Portal & State

```bash
GET  /api/auth/customer/portal             # Redirect to customer portal
GET  /api/auth/customer/state              # Get customer state (subscriptions, benefits)
```

### Customer Data Management

```bash
GET  /api/auth/customer/benefits           # List customer benefits
GET  /api/auth/customer/orders             # List customer orders
GET  /api/auth/customer/subscriptions      # List customer subscriptions
```

### Usage-Based Billing

```bash
POST /api/auth/usage/ingestion             # Ingest usage events
GET  /api/auth/usage/meters                # List customer usage meters
```

## 🧪 Testing Examples

### Test Session (Unauthenticated)

```bash
curl http://localhost:3000/api/auth/session
# Returns: null or session object
```

### Test Customer State (Authenticated - use browser)

```bash
# Must be signed in - visit in browser:
http://localhost:3000/api/auth/customer/state
```

### Test Checkout Creation

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  http://localhost:3000/api/auth/checkout \
  -d '{"slug": "Better-Build-Annual"}'
```

### Test Usage Event Ingestion

```bash
curl -X POST \
  -H "Content-Type: application/json" \
  -H "Cookie: your-session-cookie" \
  http://localhost:3000/api/auth/usage/ingestion \
  -d '{"event": "feature_used", "metadata": {"feature": "dashboard"}}'
```

## 🔒 Authentication Requirements

### Public Endpoints (No Auth Required)

- `/api/auth/session`
- `/api/auth/sign-in/*`
- `/api/auth/sign-up/*`
- `/api/auth/forgot-password`
- `/api/auth/verify-email`
- `/api/auth/callback/*`

### Protected Endpoints (Auth Required)

- `/api/auth/customer/*` (All customer endpoints)
- `/api/auth/checkout` (if authenticatedUsersOnly: true)
- `/api/auth/usage/*` (All usage endpoints)
- `/api/auth/update-user`
- `/api/auth/change-password`
- `/api/auth/sign-out`

## 💡 Important Notes

1. **Authentication**: Most Polar endpoints require active session
2. **CSRF**: POST requests may require CSRF tokens
3. **Content-Type**: POST requests need `application/json` header
4. **Cookies**: Session cookies must be included for authenticated requests
5. **Browser Testing**: Easiest to test authenticated endpoints in browser while signed in
