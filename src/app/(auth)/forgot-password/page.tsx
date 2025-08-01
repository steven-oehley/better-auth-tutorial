import ForgotPasswordForm from '@/components/auth/forgot-password-form';

const ForgotPassword = () => {
  return (
    <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-900'>
      <ForgotPasswordForm />
    </section>
  );
};
export default ForgotPassword;
