import Link from 'next/link';

import { LucideArrowLeft } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Toaster } from '@/components/ui/sonner';

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
      <Toaster
        closeButton
        richColors
        className='border-2 border-white bg-black text-white'
        position='bottom-right'
      />
    </div>
  );
};
export default AuthLayout;
