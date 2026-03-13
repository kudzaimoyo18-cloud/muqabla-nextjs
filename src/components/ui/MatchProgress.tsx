import React from 'react';
import { cn, getMatchScoreColor, getMatchScoreLabel } from '@/lib/utils';

export interface MatchProgressProps {
  score: number;
  size?: 'small' | 'medium' | 'large';
  showLabel?: boolean;
  showDetails?: boolean;
  className?: string;
}

export default function MatchProgress({
  score,
  size = 'medium',
  showLabel = true,
  showDetails = false,
  className,
}: MatchProgressProps) {
  const sizes = {
    small: {
      container: 'h-2',
      text: 'text-xs',
    },
    medium: {
      container: 'h-3',
      text: 'text-sm',
    },
    large: {
      container: 'h-4',
      text: 'text-base',
    },
  };

  const getColorClass = (value: number) => {
    if (value >= 90) return 'bg-green-500';
    if (value >= 70) return 'bg-blue-500';
    if (value >= 50) return 'bg-yellow-500';
    return 'bg-gray-500';
  };

  const getBackgroundGradient = () => {
    return {
      background: `conic-gradient(
        ${getColorClass(score)} ${score}%,
        #E5E7EB ${score}%
      )`,
    };
  };

  return (
    <div className={cn('flex items-center gap-3', className)}>
      {/* Circular Progress */}
      <div
        className={cn(
          'relative rounded-full flex items-center justify-center',
          sizes[size].text,
          size === 'small' ? 'w-12 h-12' : size === 'medium' ? 'w-16 h-16' : 'w-20 h-20'
        )}
        style={getBackgroundGradient()}
      >
        <div className="bg-white rounded-full flex items-center justify-center">
          <div
            className={cn(
              'font-bold',
              sizes[size].text,
              getMatchScoreColor(score),
              size === 'small' ? 'w-8 h-8' : size === 'medium' ? 'w-10 h-10' : 'w-12 h-12'
            )}
          >
            {score}%
          </div>
        </div>
      </div>

      {/* Label */}
      {showLabel && (
        <div className="flex flex-col">
          <span className="font-semibold text-text">{getMatchScoreLabel(score)}</span>
          {showDetails && (
            <div className="mt-1 space-y-0.5">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500" />
                <span className="text-xs text-text-secondary">Skills aligned</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-blue-500" />
                <span className="text-xs text-text-secondary">Experience match</span>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
