'use client';

import { Suspense } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';

import { CheckCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

function CheckoutSuccessContent() {
  const searchParams = useSearchParams();
  const checkoutId = searchParams.get('checkout_id');

  return (
    <div className='flex min-h-screen items-center justify-center bg-gradient-to-br from-green-50 to-blue-50 p-4'>
      <Card className='w-full max-w-md'>
        <CardHeader className='text-center'>
          <div className='mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-green-100'>
            <CheckCircle className='h-8 w-8 text-green-600' />
          </div>
          <CardTitle className='text-2xl font-bold text-green-800'>
            Payment Successful!
          </CardTitle>
          <CardDescription className='text-gray-600'>
            Thank you for your purchase. Your payment has been processed
            successfully.
          </CardDescription>
        </CardHeader>
        <CardContent className='space-y-6'>
          {checkoutId && (
            <div className='rounded-lg bg-gray-50 p-4'>
              <p className='mb-1 text-sm font-medium text-gray-700'>
                Checkout ID:
              </p>
              <p className='font-mono text-sm break-all text-gray-900'>
                {checkoutId}
              </p>
            </div>
          )}

          <div className='space-y-4 text-center'>
            <p className='text-sm text-gray-600'>
              You will receive a confirmation email shortly with your order
              details.
            </p>

            <Button asChild className='w-full'>
              <Link href='/dashboard'>Go to Dashboard</Link>
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default function CheckoutSuccessPage() {
  return (
    <Suspense
      fallback={
        <div className='flex min-h-screen items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-gray-900' />
        </div>
      }
    >
      <CheckoutSuccessContent />
    </Suspense>
  );
}
