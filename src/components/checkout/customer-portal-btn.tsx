import { customer } from '@/lib/auth-client';

import { Button } from './../ui/button';

const CustomerPortalBtn = () => {
  return (
    <Button
      className='w-full bg-cyan-600 text-white'
      onClick={async () => await customer.portal()}
    >
      Customer Portal
    </Button>
  );
};
export default CustomerPortalBtn;
