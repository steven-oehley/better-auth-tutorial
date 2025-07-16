import SignUpForm from '@/components/auth/sign-up-form';

export default function SignupPage() {
  return (
    <section className='flex min-h-screen bg-zinc-50 px-4 py-16 md:py-32 dark:bg-transparent'>
      <SignUpForm />
    </section>
  );
}
