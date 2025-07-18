// app/signup-success/page.tsx
import Link from 'next/link';

import { CheckCircle, Mail } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

// This is a server component
const SignUpSuccessPage = async () => {
  return (
    <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-900'>
      <div className='mx-auto w-full max-w-md'>
        <Card className='text-center'>
          <CardHeader>
            <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100 dark:bg-green-900/20'>
              <CheckCircle className='h-8 w-8 text-green-600 dark:text-green-400' />
            </div>
            <CardTitle className='text-2xl font-bold'>
              Check Your Email
            </CardTitle>
            <CardDescription className='text-base'>
              We&apos;ve sent you a verification email to get started.
            </CardDescription>
          </CardHeader>

          <CardContent className='space-y-6'>
            <div className='rounded-lg bg-blue-50 p-4 dark:bg-blue-900/20'>
              <div className='flex items-center justify-center space-x-2 text-blue-700 dark:text-blue-300'>
                <Mail className='h-5 w-5' />
              </div>
            </div>

            <div className='space-y-4'>
              <div className='space-y-2 text-left'>
                <h3 className='text-sm font-semibold'>What&apos;s next?</h3>
                <ol className='text-muted-foreground list-inside list-decimal space-y-1 text-sm'>
                  <li>Check your email inbox (and spam folder)</li>
                  <li>
                    Click the <span className='font-bold'>Verify My Email</span>{' '}
                    button in the email
                  </li>
                  <li>You&apos;ll be automatically signed in and redirected</li>
                </ol>
              </div>

              <div className='rounded-lg border border-yellow-200 bg-yellow-50 p-3 dark:border-yellow-800 dark:bg-yellow-900/20'>
                <p className='text-xs text-yellow-800 dark:text-yellow-200'>
                  <strong>Note:</strong> The verification link expires in 48
                  hours. You can request a new one if needed.
                </p>
              </div>
            </div>

            <div className='space-y-3'>
              <Button asChild className='w-full'>
                <Link href='/login'>Continue to Login</Link>
              </Button>

              <Button asChild className='w-full' variant='outline'>
                <Link href='/resend-verification'>
                  Didn&apos;t Receive Email? Request a new link.
                </Link>
              </Button>
            </div>

            <div className='text-center'>
              <p className='text-muted-foreground text-sm'>
                Need help?{' '}
                <Button asChild className='h-auto p-0 text-sm' variant='link'>
                  <Link href='/support'>Contact Support</Link>
                </Button>
              </p>
            </div>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default SignUpSuccessPage;
