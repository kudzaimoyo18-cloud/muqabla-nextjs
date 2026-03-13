import React from 'react';
import { cn } from '@/lib/utils';
import { User } from 'lucide-react';

export interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: 'small' | 'medium' | 'large' | 'xlarge';
  initials?: string;
  className?: string;
  showStatus?: boolean;
  status?: 'online' | 'offline' | 'away';
}

export default function Avatar({
  src,
  alt = 'Avatar',
  size = 'medium',
  initials,
  className,
  showStatus = false,
  status = 'offline',
}: AvatarProps) {
  const sizes = {
    small: 'w-8 h-8',
    medium: 'w-10 h-10',
    large: 'w-12 h-12',
    xlarge: 'w-16 h-16',
  };

  const statusColors = {
    online: 'bg-success',
    offline: 'bg-gray-400',
    away: 'bg-warning',
  };

  return (
    <div className={cn('relative inline-flex', className)}>
      <div
        className={cn(
          'rounded-full flex items-center justify-center overflow-hidden bg-surface-secondary',
          sizes[size]
        )}
      >
        {src ? (
          <img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        ) : initials ? (
          <span className="font-semibold text-text-secondary">
            {initials}
          </span>
        ) : (
          <User className={cn('text-text-secondary', size === 'small' ? 'w-4 h-4' : 'w-6 h-6')} />
        )}
      </div>

      {showStatus && (
        <span
          className={cn(
            'absolute bottom-0 right-0 w-2.5 h-2.5 rounded-full border-2 border-white',
            statusColors[status]
          )}
        />
      )}
    </div>
  );
}
