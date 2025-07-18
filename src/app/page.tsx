import { headers } from 'next/headers';
import Link from 'next/link';

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
    </div>
  );
};
export default HomePage;
