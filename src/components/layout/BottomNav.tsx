'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Home, Search, MessageSquare, User, Plus } from 'lucide-react';

const candidateNav = [
  { href: '/feed', icon: Home, label: 'Home' },
  { href: '/search', icon: Search, label: 'Discover' },
  { href: '/messages', icon: MessageSquare, label: 'Inbox' },
  { href: '/profile', icon: User, label: 'Profile' },
];

const employerNav = [
  { href: '/employer/dashboard', icon: Home, label: 'Home' },
  { href: '/employer/post-job', icon: Plus, label: 'Post' },
  { href: '/employer/candidates', icon: Search, label: 'Candidates' },
  { href: '/messages', icon: MessageSquare, label: 'Inbox' },
  { href: '/profile', icon: User, label: 'Profile' },
];

interface BottomNavProps {
  variant?: 'candidate' | 'employer';
  className?: string;
}

export default function BottomNav({ variant = 'candidate', className }: BottomNavProps) {
  const pathname = usePathname();
  const navItems = variant === 'employer' ? employerNav : candidateNav;

  return (
    <nav className={`fixed bottom-0 left-0 right-0 bg-[#0a0a0a]/95 backdrop-blur-xl border-t border-white/[0.06] safe-area-inset-bottom z-50 ${className || ''}`}>
      <div className="flex items-center justify-around px-2 py-2 max-w-lg mx-auto">
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');

          return (
            <Link
              key={item.href}
              href={item.href}
              className="flex flex-col items-center justify-center min-w-[48px] py-1 group"
            >
              <div className={`relative p-1.5 rounded-xl transition-colors ${isActive ? 'text-emerald-400' : 'text-gray-500 group-hover:text-gray-300'}`}>
                <item.icon className="w-5 h-5" strokeWidth={isActive ? 2.5 : 2} />
                {isActive && (
                  <div className="absolute -bottom-0.5 left-1/2 -translate-x-1/2 w-1 h-1 bg-emerald-400 rounded-full" />
                )}
              </div>
              <span className={`text-[10px] mt-0.5 font-medium ${isActive ? 'text-emerald-400' : 'text-gray-600'}`}>
                {item.label}
              </span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
