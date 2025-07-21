'use client';

import * as React from 'react';

import {
  AudioWaveform,
  BookOpen,
  Bot,
  Command,
  Frame,
  GalleryVerticalEnd,
  Map,
  PieChart,
  Settings2,
  SquareTerminal,
} from 'lucide-react';

import { NavMain } from '@/components/nav-main';
import { NavProjects } from '@/components/nav-projects';
import { TeamSwitcher } from '@/components/team-switcher';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
} from '@/components/ui/sidebar';

import SignOutBtn from './auth/sign-out-btn';
import CustomerPortalBtn from './checkout/customer-portal-btn';

// This is sample data.
const data = {
  navMain: [
    {
      icon: SquareTerminal,
      isActive: true,
      items: [
        {
          title: 'History',
          url: '#',
        },
        {
          title: 'Starred',
          url: '#',
        },
        {
          title: 'Settings',
          url: '#',
        },
      ],
      title: 'Playground',
      url: '#',
    },
    {
      icon: Bot,
      items: [
        {
          title: 'Genesis',
          url: '#',
        },
        {
          title: 'Explorer',
          url: '#',
        },
        {
          title: 'Quantum',
          url: '#',
        },
      ],
      title: 'Models',
      url: '#',
    },
    {
      icon: BookOpen,
      items: [
        {
          title: 'Introduction',
          url: '#',
        },
        {
          title: 'Get Started',
          url: '#',
        },
        {
          title: 'Tutorials',
          url: '#',
        },
        {
          title: 'Changelog',
          url: '#',
        },
      ],
      title: 'Documentation',
      url: '#',
    },
    {
      icon: Settings2,
      items: [
        {
          title: 'General',
          url: '#',
        },
        {
          title: 'Team',
          url: '#',
        },
        {
          title: 'Billing',
          url: '#',
        },
        {
          title: 'Limits',
          url: '#',
        },
      ],
      title: 'Settings',
      url: '#',
    },
  ],
  projects: [
    {
      icon: Frame,
      name: 'Design Engineering',
      url: '#',
    },
    {
      icon: PieChart,
      name: 'Sales & Marketing',
      url: '#',
    },
    {
      icon: Map,
      name: 'Travel',
      url: '#',
    },
  ],
  teams: [
    {
      logo: GalleryVerticalEnd,
      name: 'Acme Inc',
      plan: 'Enterprise',
    },
    {
      logo: AudioWaveform,
      name: 'Acme Corp.',
      plan: 'Startup',
    },
    {
      logo: Command,
      name: 'Evil Corp.',
      plan: 'Free',
    },
  ],
  user: {
    avatar: '/avatars/shadcn.jpg',
    email: 'm@example.com',
    name: 'shadcn',
  },
};

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible='icon' {...props}>
      <SidebarHeader>
        <TeamSwitcher teams={data.teams} />
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavProjects projects={data.projects} />
      </SidebarContent>
      <SidebarFooter>
        <CustomerPortalBtn />
        <SignOutBtn />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
