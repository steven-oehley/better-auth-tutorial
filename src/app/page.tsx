import { headers } from 'next/headers';
import Link from 'next/link';

import CheckoutBtn from '@/components/checkout/checkout-btn';
import { POLAR_PRODUCT_IDS } from '@/components/checkout/constants';
import { Button } from '@/components/ui/button';
import { auth } from '@/lib/auth';

const HomePage = async () => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });
  console.warn('Session:', session);
  return (
    <div className='flex min-h-screen flex-col items-center justify-center gap-8 bg-gray-300'>
      <div className='flex justify-center gap-4'>
        <Button asChild>
          <Link href='/sign-up'>Sign Up</Link>
        </Button>
        <Button asChild variant='secondary'>
          <Link href='/login'>Sign In</Link>
        </Button>
      </div>
      <div className='flex justify-center gap-4'>
        <CheckoutBtn
          label='Subscribe to Better Build - Annual'
          productSlug={POLAR_PRODUCT_IDS.annual.slug}
        />
        <CheckoutBtn
          label='Subscribe to Better Build - Monthly'
          productSlug={POLAR_PRODUCT_IDS.monthly.slug}
        />
      </div>
    </div>
  );
};
export default HomePage;
