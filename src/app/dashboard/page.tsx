import { headers } from 'next/headers';
import { redirect } from 'next/navigation';

import {
  ArrowUpRight,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
} from 'lucide-react';

import { AppSidebar } from '@/components/app-sidebar';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbSeparator,
} from '@/components/ui/breadcrumb';
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { Separator } from '@/components/ui/separator';
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from '@/components/ui/sidebar';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import { auth } from '@/lib/auth';
import { hasActiveSubscription } from '@/lib/subscription/queries';

export default async function Page() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const hasActiveSub = await hasActiveSubscription();
  console.warn('Has active subscription:', hasActiveSub);

  if (!session) {
    return <div>Not authenticated</div>;
  }

  if (!hasActiveSub) {
    redirect('/subscribe');
  }

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className='flex h-16 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12'>
          <div className='flex items-center gap-2 px-4'>
            <SidebarTrigger className='-ml-1' />
            <Separator
              className='mr-2 data-[orientation=vertical]:h-4'
              orientation='vertical'
            />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='/'>Home</BreadcrumbLink>
                </BreadcrumbItem>
                <BreadcrumbSeparator className='hidden md:block' />
                <BreadcrumbItem className='hidden md:block'>
                  <BreadcrumbLink href='#'>Dashboard</BreadcrumbLink>
                </BreadcrumbItem>
              </BreadcrumbList>
            </Breadcrumb>
          </div>
        </header>
        <div className='flex flex-1 flex-col gap-4 p-4 pt-0'>
          {/* Stats Cards */}
          <div className='grid auto-rows-min gap-4 md:grid-cols-3'>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Revenue
                </CardTitle>
                <DollarSign className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>$45,231.89</div>
                <p className='text-muted-foreground text-xs'>
                  <span className='text-green-600'>+20.1%</span> from last month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Active Users
                </CardTitle>
                <Users className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>2,350</div>
                <p className='text-muted-foreground text-xs'>
                  <span className='text-green-600'>+180.1%</span> from last
                  month
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Sales</CardTitle>
                <ShoppingCart className='text-muted-foreground h-4 w-4' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>12,234</div>
                <p className='text-muted-foreground text-xs'>
                  <span className='text-green-600'>+19%</span> from last month
                </p>
              </CardContent>
            </Card>
          </div>

          {/* Main Content Area */}
          <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-7'>
            {/* Recent Sales */}
            <Card className='col-span-4'>
              <CardHeader>
                <CardTitle>Recent Sales</CardTitle>
                <CardDescription>
                  You made 265 sales this month.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Customer</TableHead>
                      <TableHead>Product</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className='text-right'>Amount</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    <TableRow>
                      <TableCell className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage src='/placeholder.svg' />
                          <AvatarFallback>JD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='font-medium'>John Doe</div>
                          <div className='text-muted-foreground text-sm'>
                            john@example.com
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Premium Plan</TableCell>
                      <TableCell>
                        <Badge variant='default'>Completed</Badge>
                      </TableCell>
                      <TableCell className='text-right'>$99.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage src='/placeholder.svg' />
                          <AvatarFallback>AS</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='font-medium'>Alice Smith</div>
                          <div className='text-muted-foreground text-sm'>
                            alice@example.com
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Basic Plan</TableCell>
                      <TableCell>
                        <Badge variant='secondary'>Pending</Badge>
                      </TableCell>
                      <TableCell className='text-right'>$39.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage src='/placeholder.svg' />
                          <AvatarFallback>BJ</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='font-medium'>Bob Johnson</div>
                          <div className='text-muted-foreground text-sm'>
                            bob@example.com
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Pro Plan</TableCell>
                      <TableCell>
                        <Badge variant='default'>Completed</Badge>
                      </TableCell>
                      <TableCell className='text-right'>$199.00</TableCell>
                    </TableRow>
                    <TableRow>
                      <TableCell className='flex items-center gap-2'>
                        <Avatar className='h-8 w-8'>
                          <AvatarImage src='/placeholder.svg' />
                          <AvatarFallback>CD</AvatarFallback>
                        </Avatar>
                        <div>
                          <div className='font-medium'>Carol Davis</div>
                          <div className='text-muted-foreground text-sm'>
                            carol@example.com
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>Basic Plan</TableCell>
                      <TableCell>
                        <Badge variant='destructive'>Failed</Badge>
                      </TableCell>
                      <TableCell className='text-right'>$39.00</TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </CardContent>
            </Card>

            {/* Analytics & Quick Actions */}
            <Card className='col-span-3'>
              <CardHeader>
                <CardTitle>Analytics Overview</CardTitle>
                <CardDescription>Your performance this month</CardDescription>
              </CardHeader>
              <CardContent className='space-y-6'>
                <div className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <span>Revenue Goal</span>
                    <span>$45,231 / $50,000</span>
                  </div>
                  <Progress className='h-2' value={90} />
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <span>User Acquisition</span>
                    <span>2,350 / 3,000</span>
                  </div>
                  <Progress className='h-2' value={78} />
                </div>

                <div className='space-y-2'>
                  <div className='flex items-center justify-between text-sm'>
                    <span>Customer Satisfaction</span>
                    <span>4.8 / 5.0</span>
                  </div>
                  <Progress className='h-2' value={96} />
                </div>

                <Separator />

                <div className='space-y-3'>
                  <h4 className='text-sm font-medium'>Quick Actions</h4>
                  <div className='space-y-2'>
                    <Button className='w-full justify-start' variant='outline'>
                      <TrendingUp className='mr-2 h-4 w-4' />
                      View Analytics
                    </Button>
                    <Button className='w-full justify-start' variant='outline'>
                      <Users className='mr-2 h-4 w-4' />
                      Manage Users
                    </Button>
                    <Button className='w-full justify-start' variant='outline'>
                      <ArrowUpRight className='mr-2 h-4 w-4' />
                      Export Data
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </SidebarInset>
    </SidebarProvider>
  );
}
