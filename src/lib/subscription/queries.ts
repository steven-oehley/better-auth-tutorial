import { cache } from 'react';
import { headers } from 'next/headers';

import { auth } from '@/lib/auth';

// Base session query with caching
export const getSession = cache(async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
});

// ✅ CORRECTED: Get complete customer state
export const getCustomerState = cache(async () => {
  const session = await getSession();

  if (!session?.user) {
    return null;
  }

  try {
    console.warn('Getting customer state for user:', session.user.id);

    // Use auth.api.state (not auth.customer.state)
    const customerState = await auth.api.state({
      headers: await headers(),
    });

    console.warn('Customer state retrieved:', customerState);
    return customerState;
  } catch (error) {
    console.error('Failed to get customer state:', error);
    return null;
  }
});

// ✅ CORRECTED: Get user subscriptions directly
export const hasActiveSubscription = cache(async () => {
  const session = await getSession();
  if (!session?.user) return false;

  try {
    const subscriptions = await auth.api.subscriptions({
      headers: await headers(),
      query: { active: true, limit: 1 }, // Only need to know if ANY exist
    });

    return subscriptions.result?.items?.length > 0;
  } catch (error) {
    console.error('Failed to check subscription:', error);
    return false;
  }
});
