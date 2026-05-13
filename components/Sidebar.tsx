'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LayoutDashboard, Users, Mail, Settings, BarChart3 } from 'lucide-react';

const navItems = [
  { icon: LayoutDashboard, label: 'Dashboard', href: '/' },
  { icon: Users, label: 'Contacts', href: '/contacts' },
  { icon: Mail, label: 'Campaigns', href: '/campaigns' },
  { icon: BarChart3, label: 'Analytics', href: '/analytics' },
  { icon: Settings, label: 'Settings', href: '/settings' },
];

export const Sidebar = () => {
  const pathname = usePathname();

  return (
    <aside className="w-64 border-r bg-white h-screen flex flex-col p-4 fixed left-0 top-0">
      <div className="text-2xl font-bold text-indigo-600 mb-8 px-2">Globopersona</div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link 
              key={item.label} 
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-all ${
                isActive 
                ? 'bg-indigo-50 text-indigo-600 shadow-sm' 
                : 'text-gray-600 hover:bg-gray-50 hover:text-indigo-600'
              }`}
            >
              <item.icon size={20} />
              <span className="font-medium">{item.label}</span>
            </Link>
          );
        })}
      </nav>
    </aside>
  );
};