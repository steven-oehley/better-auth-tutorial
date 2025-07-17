import SignInForm from '@/components/auth/sign-in-form';

export default function LoginPage() {
  return (
    <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-zinc-900'>
      <SignInForm />
    </section>
  );
}
