import { Check } from 'lucide-react';

import CheckoutBtn from '@/components/checkout/checkout-btn';
import { POLAR_PRODUCT_IDS } from '@/components/checkout/constants';
import { Badge } from '@/components/ui/badge';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';

export default function SubscribePage() {
  return (
    <div className='min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 px-4 py-12'>
      <div className='mx-auto max-w-4xl'>
        {/* Header */}
        <div className='mb-12 text-center'>
          <h1 className='mb-4 text-4xl font-bold text-gray-900'>
            Choose Your Subscription
          </h1>
          <p className='text-xl text-gray-600'>
            Get access to all premium features
          </p>
        </div>

        {/* Pricing Cards */}
        <div className='mx-auto grid max-w-3xl grid-cols-1 gap-8 md:grid-cols-2'>
          {/* Monthly Card */}
          <Card className='relative border border-gray-200 transition-all duration-200 hover:shadow-lg'>
            <CardHeader className='pb-4 text-center'>
              <CardTitle className='text-2xl font-bold'>Monthly</CardTitle>
              <CardDescription className='text-gray-600'>
                Pay monthly, cancel anytime
              </CardDescription>
            </CardHeader>

            <CardContent className='pb-6 text-center'>
              <div className='mb-6'>
                <span className='text-4xl font-bold text-gray-900'>$29</span>
                <span className='ml-1 text-gray-600'>/month</span>
              </div>

              <ul className='space-y-3 text-left'>
                <li className='flex items-center'>
                  <Check className='mr-3 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span className='text-sm text-gray-700'>
                    Full access to all features
                  </span>
                </li>
                <li className='flex items-center'>
                  <Check className='mr-3 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span className='text-sm text-gray-700'>
                    Priority customer support
                  </span>
                </li>
                <li className='flex items-center'>
                  <Check className='mr-3 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span className='text-sm text-gray-700'>
                    Regular updates and new features
                  </span>
                </li>
                <li className='flex items-center'>
                  <Check className='mr-3 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span className='text-sm text-gray-700'>Cancel anytime</span>
                </li>
              </ul>
            </CardContent>

            <CardFooter>
              <CheckoutBtn
                label='Subscribe Monthly'
                productSlug={POLAR_PRODUCT_IDS.monthly.slug}
              />
            </CardFooter>
          </Card>

          {/* Annual Card */}
          <Card className='relative border-2 border-blue-500 shadow-lg transition-all duration-200 hover:shadow-xl'>
            <Badge className='absolute -top-3 left-1/2 -translate-x-1/2 transform bg-blue-500'>
              Best Value
            </Badge>

            <CardHeader className='pb-4 text-center'>
              <CardTitle className='text-2xl font-bold'>Annual</CardTitle>
              <CardDescription className='text-gray-600'>
                Save 31% with yearly billing
              </CardDescription>
            </CardHeader>

            <CardContent className='pb-6 text-center'>
              <div className='mb-2'>
                <span className='text-4xl font-bold text-gray-900'>$199</span>
                <span className='ml-1 text-gray-600'>/year</span>
              </div>

              <div className='mb-6 text-sm text-green-600'>
                Save $149 compared to monthly
              </div>

              <ul className='space-y-3 text-left'>
                <li className='flex items-center'>
                  <Check className='mr-3 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span className='text-sm text-gray-700'>
                    Full access to all features
                  </span>
                </li>
                <li className='flex items-center'>
                  <Check className='mr-3 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span className='text-sm text-gray-700'>
                    Priority customer support
                  </span>
                </li>
                <li className='flex items-center'>
                  <Check className='mr-3 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span className='text-sm text-gray-700'>
                    Regular updates and new features
                  </span>
                </li>
                <li className='flex items-center'>
                  <Check className='mr-3 h-4 w-4 flex-shrink-0 text-green-500' />
                  <span className='text-sm text-gray-700'>
                    31% savings vs monthly
                  </span>
                </li>
              </ul>
            </CardContent>

            <CardFooter>
              <CheckoutBtn
                label='Subscribe Annually'
                productSlug={POLAR_PRODUCT_IDS.annual.slug}
              />
            </CardFooter>
          </Card>
        </div>

        {/* Additional Info */}
        <div className='mt-12 text-center'>
          <p className='text-sm text-gray-600'>
            All subscriptions include a 14-day free trial. No credit card
            required to start.
          </p>
        </div>
      </div>
    </div>
  );
}
