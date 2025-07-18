import ResendVerificationEmailForm from '@/components/auth/resend-verfication-email-form';

const ResendVerification = () => {
  return (
    <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-900'>
      <ResendVerificationEmailForm />
    </section>
  );
};
export default ResendVerification;
