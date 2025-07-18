import SignInForm from '@/components/auth/sign-in-form';

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ message?: string }>;
}) {
  const { message } = await searchParams;

  return (
    <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-900'>
      <SignInForm resetSuccess={message === 'password-reset-success'} />
    </section>
  );
}
