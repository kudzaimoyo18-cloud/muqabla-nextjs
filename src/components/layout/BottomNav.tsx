'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import {
  Home,
  Briefcase,
  MessageSquare,
  Bell,
  User,
} from 'lucide-react';

export interface BottomNavProps {
  className?: string;
}

export default function BottomNav({ className }: BottomNavProps) {
  const pathname = usePathname();

  const navItems = [
    {
      href: '/dashboard',
      icon: Home,
      label: 'Home',
    },
    {
      href: '/jobs',
      icon: Briefcase,
      label: 'Jobs',
    },
    {
      href: '/messages',
      icon: MessageSquare,
      label: 'Messages',
    },
    {
      href: '/notifications',
      icon: Bell,
      label: 'Alerts',
    },
    {
      href: '/profile/me',
      icon: User,
      label: 'Profile',
    },
  ];

  return (
    <nav
      className={cn(
        'fixed bottom-0 left-0 right-0 bg-white border-t border-border',
        'safe-area-inset-bottom',
        className
      )}
    >
      <div className="flex items-center justify-around px-2 py-2">
        {navItems.map((item) => {
          const isActive = pathname === item.href;

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[60px] py-1"
            >
              <item.icon
                className={cn(
                  'w-6 h-6 transition-colors',
                  isActive ? 'text-primary' : 'text-text-tertiary'
                )}
              />
              <span
                className={cn(
                  'text-xs mt-1 font-medium transition-colors',
                  isActive ? 'text-primary' : 'text-text-tertiary'
                )}
              >
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
