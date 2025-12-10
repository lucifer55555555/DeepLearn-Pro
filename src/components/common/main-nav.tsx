'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { BookOpen, Home, LayoutGrid, Pencil, Bot, Route, FlaskConical, User, MessageSquare } from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarTrigger,
  SidebarFooter,
} from '@/components/ui/sidebar';
import { Button } from '@/components/ui/button';
import { useUser } from '@/firebase';

const menuItems = [
  { href: '/', label: 'Home', icon: Home },
  { href: '/learn', label: 'Learn', icon: BookOpen },
  { href: '/quiz', label: 'Quiz', icon: Pencil },
  { href: '/courses', label: 'Courses', icon: LayoutGrid },
  { href: '/roadmaps', label: 'Roadmaps', icon: Route },
  { href: '/projects', label: 'Projects', icon: FlaskConical },
  { href: '/discussions', label: 'Discussions', icon: MessageSquare },
];

const authMenuItem = { href: '/profile', label: 'Profile', icon: User };

export function MainNav() {
  const pathname = usePathname();
  const { user } = useUser();

  const allMenuItems = user ? [...menuItems, authMenuItem] : menuItems;

  return (
    <Sidebar side="left" collapsible="icon" variant="sidebar">
      <SidebarHeader className="flex items-center justify-between p-2">
        <Button variant="ghost" className="h-10 w-full justify-start px-2 font-headline text-lg" asChild>
          <Link href="/">
            <Bot className="mr-2 h-6 w-6 shrink-0 text-primary" />
            <span className="group-data-[collapsible=icon]:hidden">DeepLearn Pro</span>
          </Link>
        </Button>
        <div className="group-data-[collapsible=icon]:hidden">
          <SidebarTrigger />
        </div>
      </SidebarHeader>
      <SidebarMenu className="flex-1">
        {allMenuItems.map((item) => (
          <SidebarMenuItem key={item.href}>
            <SidebarMenuButton
              asChild
              isActive={pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))}
              tooltip={{ children: item.label }}
            >
              <Link href={item.href}>
                <item.icon />
                <span>{item.label}</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        ))}
      </SidebarMenu>
      <SidebarFooter className="p-2">
        <div className='group-data-[collapsible=icon]:hidden text-center text-xs text-sidebar-foreground/50'>
            &copy; {new Date().getFullYear()}
        </div>
      </SidebarFooter>
    </Sidebar>
  );
}
