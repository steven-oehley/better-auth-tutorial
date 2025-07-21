'use client';

import { checkout } from '@/lib/auth-client';

import { Button } from '../ui/button';

interface CheckoutBtnProps {
  label: string;
  productSlug: string;
}

const CheckoutBtn = ({ label, productSlug }: CheckoutBtnProps) => {
  const handleSubcribeClick = async () => {
    try {
      console.warn('Starting checkout with productSlug:', productSlug);
      const result = await checkout({
        slug: productSlug,
      });
      console.warn('Checkout success:', result);
    } catch (error) {
      console.error('Full checkout error:', error);
      if (error instanceof Error) {
        console.error('Error message:', error.message);
      } else {
        console.error('Error message:', String(error));
      }
      console.error('Error details:', JSON.stringify(error, null, 2));
    }
  };

  return <Button onClick={handleSubcribeClick}>{label}</Button>;
};
export default CheckoutBtn;
