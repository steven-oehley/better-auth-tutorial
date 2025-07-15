import Link from 'next/link';

import { LucideArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthLayoutProps) => {
  return (
    <div>
      <Button asChild className='absolute top-0 left-0 mb-4' variant='link'>
        <Link href='/'>
          <LucideArrowLeft /> Back
        </Link>
      </Button>
      {children}
    </div>
  );
};
export default AuthLayout;
