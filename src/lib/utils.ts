import { type ClassValue, clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

// ============ CLASSNAME UTILITIES ============

export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

// ============ DATE FORMATTING ============

export function formatDate(date: string): string {
  const now = new Date();
  const past = new Date(date);
  const diffInMs = now.getTime() - past.getTime();
  const diffInMinutes = Math.floor(diffInMs / 60000);
  const diffInHours = Math.floor(diffInMinutes / 60);
  const diffInDays = Math.floor(diffInHours / 24);

  if (diffInMinutes < 1) return 'Just now';
  if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
  if (diffInHours < 24) return `${diffInHours}h ago`;
  if (diffInDays < 7) return `${diffInDays}d ago`;

  return past.toLocaleDateString('en-US', {
    month: 'short',
    day: 'numeric',
  });
}

export function formatFullDate(date: string): string {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}

// ============ SALARY FORMATTING ============

export function formatSalary(
  min?: number,
  max?: number,
  currency: string = 'AED'
): string {
  if (!min && !max) return 'Not disclosed';

  const formatNumber = (num: number) =>
    new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(num);

  if (min && max) {
    return `${formatNumber(min)} - ${formatNumber(max)}`;
  }

  return formatNumber(min || max);
}

// ============ LABEL CONSTANTS ============

export const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: 'Full-time',
  part_time: 'Part-time',
  contract: 'Contract',
  freelance: 'Freelance',
  internship: 'Internship',
};

export const WORK_MODE_LABELS: Record<string, string> = {
  on_site: 'On-site',
  remote: 'Remote',
  hybrid: 'Hybrid',
};

export const EXPERIENCE_LEVEL_LABELS: Record<string, string> = {
  entry: 'Entry Level',
  mid: 'Mid Level',
  senior: 'Senior Level',
  lead: 'Lead',
  executive: 'Executive',
};

export const JOB_STATUS_LABELS: Record<string, string> = {
  draft: 'Draft',
  active: 'Active',
  paused: 'Paused',
  closed: 'Closed',
};

export const APPLICATION_STATUS_LABELS: Record<string, string> = {
  pending: 'Pending',
  viewed: 'Viewed',
  shortlisted: 'Shortlisted',
  interviewing: 'Interviewing',
  offered: 'Offered',
  hired: 'Hired',
  rejected: 'Rejected',
};

// ============ VALIDATION ============

export function validateEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

export function validatePhone(phone: string): boolean {
  const phoneRegex = /^[\d\s\-\+\(\)]+$/;
  return phoneRegex.test(phone) && phone.replace(/\D/g, '').length >= 10;
}

export function validateURL(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

// ============ STRING UTILITIES ============

export function truncate(text: string, maxLength: number): string {
  if (text.length <= maxLength) return text;
  return text.slice(0, maxLength).trim() + '...';
}

export function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');
}

// ============ MATCH SCORE UTILITIES ============

export function getMatchScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600 bg-green-50';
  if (score >= 70) return 'text-blue-600 bg-blue-50';
  if (score >= 50) return 'text-yellow-600 bg-yellow-50';
  return 'text-gray-600 bg-gray-50';
}

export function getMatchScoreLabel(score: number): string {
  if (score >= 90) return 'Excellent Match';
  if (score >= 70) return 'Good Match';
  if (score >= 50) return 'Fair Match';
  return 'Low Match';
}

// ============ VIDEO UTILITIES ============

export function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
}

// ============ NUMBER FORMATTING ============

export function formatNumber(num: number): string {
  if (num >= 1000000) {
    return `${(num / 1000000).toFixed(1)}M`;
  }
  if (num >= 1000) {
    return `${(num / 1000).toFixed(1)}K`;
  }
  return num.toString();
}

// ============ ANIMATION UTILITIES ============

export function staggerChildren(delay: number = 100): Record<string, string> {
  return {
    animation: `fadeInUp 0.5s ease-out forwards`,
    animationDelay: `${delay}ms`,
  };
}

export function shimmer(
  w: number,
  h: number
): { backgroundSize: string; backgroundImage: string } {
  return {
    backgroundSize: `${w * 1.5}px ${h * 1.5}px`,
    backgroundImage: `linear-gradient(
      to right,
      transparent 0%,
      rgba(255, 255, 255, 0.05) 50%,
      transparent 100%
    )`,
  };
}

// Add custom keyframe animations in CSS
export const globalStyles = `
  @keyframes fadeInUp {
    from {
      opacity: 0;
      transform: translateY(20px);
    }
    to {
      opacity: 1;
      transform: translateY(0);
    }
  }

  @keyframes pulse {
    0%, 100% {
      opacity: 1;
    }
    50% {
      opacity: 0.5;
    }
  }

  @keyframes spin {
    from {
      transform: rotate(0deg);
    }
    to {
      transform: rotate(360deg);
    }
  }
`;
