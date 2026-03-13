import React from 'react';
import { cn } from '@/lib/utils';

export interface LogoProps {
  variant?: 'default' | 'large' | 'small';
  className?: string;
  showText?: boolean;
}

export default function Logo({
  variant = 'default',
  className,
  showText = true,
}: LogoProps) {
  const sizes = {
    small: 'text-xl',
    default: 'text-2xl',
    large: 'text-4xl',
  };

  return (
    <div className={cn('flex items-center gap-2', className)}>
      {/* Logo Icon */}
      <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-primary to-primary-light">
        <span className="text-white font-bold text-xl">M</span>
      </div>

      {/* Logo Text */}
      {showText && (
        <span className={cn('font-bold text-text', sizes[variant])}>
          Muqabla
        </span>
      )}
    </div>
  );
}
