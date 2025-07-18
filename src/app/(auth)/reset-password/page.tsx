import Link from 'next/link';

import ResetPasswordForm from '@/components/auth/reset-password-form';
import { Button } from '@/components/ui/button';

interface ResetPasswordPageProps {
  searchParams: Promise<{ token?: string }>;
}

const ResetPasswordPage = async ({ searchParams }: ResetPasswordPageProps) => {
  const { token } = await searchParams;

  if (!token) {
    return (
      <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-900'>
        <div className='mx-auto max-w-sm text-center'>
          <h1 className='text-xl font-semibold'>Invalid or missing token</h1>
          <p className='text-muted-foreground text-sm'>
            Please check the link you received or request a new password reset.
          </p>
          <Button asChild variant='link'>
            <Link href='/forgot-password'>Request a new password reset</Link>
          </Button>
        </div>
      </section>
    );
  }

  return (
    <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-900'>
      <ResetPasswordForm token={token} />
    </section>
  );
};
export default ResetPasswordPage;
