'use client';

import { useActionState, useEffect } from 'react';
import Form from 'next/form';
import Link from 'next/link';

import { LucideCode2 } from 'lucide-react';
import { toast } from 'sonner';

import { resendVerifcationEmailAction } from '@/actions/auth/resend-verifcation-email-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ActionState } from '@/types/types';

const initialFormState: ActionState = {
  errorMessage: '',
};

const ResendVerificationEmailForm = () => {
  const [state, formAction, pending] = useActionState(
    resendVerifcationEmailAction,
    initialFormState,
  );

  useEffect(() => {
    if (state.errorMessage) {
      toast.error('Error finding account', {
        description: state.errorMessage,
      });
    }

    if (state.successMessage) {
      toast.success('Success!', {
        description: state.successMessage,
      });
    }
  }, [state.errorMessage, state.successMessage]);

  return (
    <Form
      action={formAction}
      className='bg-card text-card-foreground border-border m-auto h-fit w-full max-w-sm rounded-lg border p-0.5 shadow-md'
    >
      <div className='p-8 pb-6'>
        <div className='mb-6'>
          <Link aria-label='go home' href='/'>
            <LucideCode2 className='h-6 w-6' />
          </Link>
          <h1 className='mt-4 mb-1 text-xl font-semibold'>
            No verifaction email received?
          </h1>
          <p className='text-muted-foreground text-sm'>
            Enter your email to receive a new verification link.
          </p>
        </div>

        <div className='space-y-6'>
          <div className='space-y-2'>
            <Label className='block text-sm' htmlFor='email'>
              Email
            </Label>
            <Input required id='email' name='email' type='email' />
          </div>

          <Button className='w-full' disabled={pending}>
            Get Verification Link
          </Button>
        </div>
      </div>{' '}
    </Form>
  );
};
export default ResendVerificationEmailForm;
