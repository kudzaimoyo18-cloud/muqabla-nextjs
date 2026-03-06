'use client';

import Link from 'next/link';

export default function Logo({ variant = 'default' }: { variant?: 'default' | 'small' | 'large' }) {
  const sizes = {
    default: 'w-24 h-24 text-5xl',
    small: 'w-12 h-12 text-2xl',
    large: 'w-32 h-32 text-6xl',
  };

  const containerSizes = {
    default: 'w-24 h-24 rounded-[25px]',
    small: 'w-12 h-12 rounded-lg',
    large: 'w-32 h-32 rounded-[32px]',
  };

  return (
    <Link href="/" className="flex items-center gap-3 group">
      {/* Logo Container */}
      <div className={`${containerSizes[variant]} bg-primary flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-200`}>
        <span className={`${sizes[variant]} font-bold text-white`}>M</span>
      </div>

      {/* Text (only for default variant) */}
      {variant === 'default' && (
        <div className="flex flex-col">
          <span className="text-4xl font-bold text-text group-hover:text-primary transition-colors">Muqabla</span>
          <span className="text-lg text-text-secondary group-hover:text-primary transition-colors">Your Career, Your Story</span>
        </div>
      )}
    </Link>
  );
}

// Compact version for headers
export function LogoCompact() {
  return (
    <Link href="/" className="flex items-center gap-2">
      <div className="w-10 h-10 rounded-xl bg-primary flex items-center justify-center">
        <span className="text-lg font-bold text-white">M</span>
      </div>
      <span className="text-xl font-bold text-text">Muqabla</span>
    </Link>
  );
}

// Icon-only version for small spaces
export function LogoIcon({ size = 'default' }: { size?: 'small' | 'default' }) {
  const iconSizes = {
    default: 'w-8 h-8 text-xl',
    small: 'w-6 h-6 text-base',
  };

  return (
    <Link href="/" className="flex items-center justify-center">
      <div className={`${iconSizes[size]} rounded-lg bg-primary flex items-center justify-center hover:bg-primary-dark transition-colors`}>
        <span className="font-bold text-white">M</span>
      </div>
    </Link>
  );
}
