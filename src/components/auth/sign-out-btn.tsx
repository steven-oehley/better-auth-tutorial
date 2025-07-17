import { LucideLogOut } from 'lucide-react';

import { signOutAction } from '@/actions/auth/sign-out-action';

import { Button } from '../ui/button';

const SignOutBtn = () => {
  return (
    <form action={signOutAction}>
      <Button className='w-full'>
        <LucideLogOut /> Sign Out
      </Button>
    </form>
  );
};
export default SignOutBtn;
