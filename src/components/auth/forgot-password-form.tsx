'use client';

import { useActionState, useEffect } from 'react';
import Form from 'next/form';
import Link from 'next/link';

import { LucideCode2 } from 'lucide-react';
import { toast } from 'sonner';

import { forgotPasswordAction } from '@/actions/auth/forgot-password-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { type ActionState } from '@/types/types';

const initialFormState: ActionState = {
  errorMessage: '',
};

const ForgotPasswordForm = () => {
  const [state, formAction, pending] = useActionState(
    forgotPasswordAction,
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
            Forgot your password?
          </h1>
          <p className='text-muted-foreground text-sm'>
            Let&apos;s reset it so you can get back to your account.
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
            Get Reset Link
          </Button>
        </div>
      </div>

      <div className='bg-muted rounded-2xl border p-3'>
        <p className='text-muted-foreground text-center text-sm'>
          Remembered your password?{' '}
          <Button asChild className='h-auto p-0' variant='link'>
            <Link className='text-primary' href='/login'>
              Login
            </Link>
          </Button>
        </p>
      </div>
    </Form>
  );
};
export default ForgotPasswordForm;
