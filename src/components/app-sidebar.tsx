import Link from 'next/link';
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from '@/components/ui/sidebar';

import {
  Cpu,
  ShoppingBag,
  User2,
  MonitorSmartphone,
  Home as HomeIcon,
} from 'lucide-react';

const items = [
  {
    title: 'Dashboard',
    url: '/admin/',
    icon: MonitorSmartphone,
  },
  {
    title: 'Manage Medicine',
    url: '/admin/medicines',
    icon: Cpu,
  },
  {
    title: 'Orders',
    url: '/admin/orders',
    icon: ShoppingBag,
  },
  {
    title: 'Customers',
    url: '/admin/users',
    icon: User2,
  },
  {
    title: 'Storefront',
    url: '/',
    icon: HomeIcon,
  },
];

export function AppSidebar() {
  return (
    <Sidebar className="h-screen bg-[#1E1216] text-white">
      <SidebarHeader>
        <div className="p-4 text-xl font-bold tracking-wide text-[#ff6e18]">
          Gadget Hub Admin
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel className="text-[#ff6e18]">
            Admin Navigation
          </SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {items.map((item) => (
                <SidebarMenuItem key={item.title}>
                  <Link href={item.url} passHref>
                    <SidebarMenuButton
                      asChild
                      className="hover:bg-[#ff6e18] hover:text-white text-[#1E1216] transition-all duration-200 rounded-md"
                    >
                      <div className="flex items-center gap-3 px-2 py-2">
                        <item.icon size={18} />
                        <span>{item.title}</span>
                      </div>
                    </SidebarMenuButton>
                  </Link>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <div className="p-4 text-sm text-gray-400">© Gadget Hub Store</div>
      </SidebarFooter>
    </Sidebar>
  );
}
