import React from 'react';
import { cn } from '@/lib/utils';
import { Sparkles } from 'lucide-react';

export interface AIBadgeProps {
  variant?: 'pill' | 'tag' | 'icon';
  size?: 'small' | 'medium' | 'large';
  label?: string;
  className?: string;
  showTooltip?: boolean;
}

export default function AIBadge({
  variant = 'pill',
  size = 'medium',
  label = 'AI Powered',
  className,
  showTooltip = true,
}: AIBadgeProps) {
  const sizes = {
    small: 'text-xs px-2 py-0.5',
    medium: 'text-sm px-2.5 py-1',
    large: 'text-base px-3 py-1.5',
  };

  const iconSizes = {
    small: 'w-3 h-3',
    medium: 'w-4 h-4',
    large: 'w-5 h-5',
  };

  if (variant === 'icon') {
    return (
      <div
        className={cn(
          'inline-flex items-center justify-center rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white',
          sizes[size],
          className
        )}
        title={showTooltip ? label : undefined}
      >
        <Sparkles className={iconSizes[size]} />
      </div>
    );
  }

  if (variant === 'tag') {
    return (
      <div
        className={cn(
          'inline-flex items-center gap-1.5 rounded-md bg-gradient-to-r from-purple-50 to-pink-50 border border-purple-200 text-purple-700',
          sizes[size],
          className
        )}
        title={showTooltip ? label : undefined}
      >
        <Sparkles className={iconSizes[size]} />
        {label}
      </div>
    );
  }

  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-500 text-white shadow-md',
        sizes[size],
        className
      )}
      title={showTooltip ? label : undefined}
    >
      <Sparkles className={iconSizes[size]} />
      <span className="font-medium">{label}</span>
    </div>
  );
}
