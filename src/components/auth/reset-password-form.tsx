'use client';

import { useActionState, useEffect, useState } from 'react';
import Form from 'next/form';
import Link from 'next/link';

import { Eye, EyeOff, LucideCode2 } from 'lucide-react';
import { toast } from 'sonner';

import { resetPasswordAction } from '@/actions/auth/reset-password-action';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { cn } from '@/lib/utils';
import { type ActionState } from '@/types/types';

const initialFormState: ActionState = {
  errorMessage: '',
  fieldErrors: {}, // Initialize fieldErrors
};

interface ResetPasswordFormProps {
  token: string;
}

const ResetPasswordForm = ({ token }: ResetPasswordFormProps) => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [clientPassword, setClientPassword] = useState('');
  const [clientConfirmPassword, setClientConfirmPassword] = useState('');

  const [state, formAction, pending] = useActionState(
    resetPasswordAction.bind(null, token),
    initialFormState,
  );

  useEffect(() => {
    if (state.errorMessage) {
      toast.error('Error resetting password', {
        description: state.errorMessage,
      });
    }
  }, [state.errorMessage]);

  // Client-side password match validation for immediate feedback
  const passwordsMatch =
    clientPassword && clientConfirmPassword
      ? clientPassword === clientConfirmPassword
      : null;

  // Debug: Log the state to see what's coming back
  useEffect(() => {
    console.warn('Form state:', state);
  }, [state]);

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
            Reset your password
          </h1>
          <p className='text-muted-foreground text-sm'>
            Enter your new password below to reset it.
          </p>
        </div>

        <div className='space-y-6'>
          {/* Password Field */}
          <div className='space-y-2'>
            <Label className='block text-sm' htmlFor='pwd'>
              New Password
            </Label>
            <div className='relative'>
              <Input
                required
                className={cn(
                  state.fieldErrors?.pwd
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : '',
                )}
                id='pwd'
                name='pwd'
                placeholder='Enter your new password'
                type={showPassword ? 'text' : 'password'}
                value={clientPassword}
                onChange={(e) => setClientPassword(e.target.value)}
              />
              <Button
                className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                size='sm'
                type='button'
                variant='ghost'
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
            </div>

            {/* Display field errors for password */}
            {state.fieldErrors?.pwd && state.fieldErrors.pwd.length > 0 && (
              <div className='space-y-1'>
                {state.fieldErrors.pwd.map((error, index) => (
                  <p key={index} className='text-sm text-red-600'>
                    {error}
                  </p>
                ))}
              </div>
            )}

            <p className='text-muted-foreground text-xs'>
              Must be at least 8 characters with uppercase, lowercase, number,
              and special character
            </p>
          </div>

          {/* Confirm Password Field */}
          <div className='space-y-2'>
            <Label className='block text-sm' htmlFor='pwdConfirm'>
              Confirm Password
            </Label>
            <div className='relative'>
              <Input
                required
                className={cn(
                  state.fieldErrors?.pwdConfirm || passwordsMatch === false
                    ? 'border-red-500 focus-visible:ring-red-500'
                    : passwordsMatch === true
                      ? 'border-green-500 focus-visible:ring-green-500'
                      : '',
                )}
                id='pwdConfirm'
                name='pwdConfirm'
                placeholder='Confirm your new password'
                type={showConfirmPassword ? 'text' : 'password'}
                value={clientConfirmPassword}
                onChange={(e) => setClientConfirmPassword(e.target.value)}
              />
              <Button
                className='absolute top-0 right-0 h-full px-3 py-2 hover:bg-transparent'
                size='sm'
                type='button'
                variant='ghost'
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              >
                {showConfirmPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
            </div>

            {/* Client-side password match feedback (only if no server errors) */}
            {!state.fieldErrors?.pwdConfirm && passwordsMatch === false && (
              <p className='text-sm text-red-600'>Passwords don&apos;t match</p>
            )}
            {!state.fieldErrors?.pwdConfirm && passwordsMatch === true && (
              <p className='text-sm text-green-600'>Passwords match ✓</p>
            )}

            {/* Display field errors for confirm password */}
            {state.fieldErrors?.pwdConfirm &&
              state.fieldErrors.pwdConfirm.length > 0 && (
                <div className='space-y-1'>
                  {state.fieldErrors.pwdConfirm.map((error, index) => (
                    <p key={index} className='text-sm text-red-600'>
                      {error}
                    </p>
                  ))}
                </div>
              )}
          </div>

          <Button
            className='w-full'
            disabled={
              pending ||
              !clientPassword ||
              !clientConfirmPassword ||
              passwordsMatch === false
            }
            type='submit'
          >
            {pending ? 'Resetting...' : 'Reset Password'}
          </Button>
        </div>
      </div>

      {/* General error message (not field-specific) */}
      {state.errorMessage && (
        <div className='mx-6 mb-6 rounded-lg bg-red-100 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-400'>
          <p className='text-sm'>{state.errorMessage}</p>
        </div>
      )}

      <div className='bg-muted rounded-2xl border p-3'>
        <p className='text-muted-foreground text-center text-sm'>
          Remembered your password?{' '}
          <Button asChild className='h-auto p-0' variant='link'>
            <Link className='text-primary' href='/sign-in'>
              Sign In
            </Link>
          </Button>
        </p>
      </div>
    </Form>
  );
};

export default ResetPasswordForm;
