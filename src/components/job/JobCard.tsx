'use client';

import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/utils';
import { MapPin, Briefcase, Laptop, CheckCircle2 } from 'lucide-react';
import { formatDate, formatSalary, JOB_TYPE_LABELS, WORK_MODE_LABELS } from '@/lib/utils';
import type { Job } from '@/types';
import Avatar from '@/components/ui/Avatar';
import AIBadge from '@/components/ui/AIBadge';

export interface JobCardProps {
  job: Job;
  matchScore?: number;
  isRecommended?: boolean;
  isSaved?: boolean;
  onSave?: () => void;
  onShare?: () => void;
  className?: string;
  variant?: 'default' | 'compact';
}

export default function JobCard({
  job,
  matchScore,
  isRecommended = false,
  isSaved = false,
  onSave,
  onShare,
  className,
  variant = 'default',
}: JobCardProps) {
  const salary = job.show_salary
    ? formatSalary(job.salary_min, job.salary_max, job.salary_currency)
    : null;

  const getMatchColor = (score: number) => {
    if (score >= 90) return 'text-green-600 bg-green-50';
    if (score >= 70) return 'text-blue-600 bg-blue-50';
    if (score >= 50) return 'text-yellow-600 bg-yellow-50';
    return 'text-gray-600 bg-gray-50';
  };

  return (
    <Link href={`/jobs/${job.id}`}>
      <div
        className={cn(
          'bg-white border border-border rounded-xl p-4',
          'hover:shadow-md hover:border-primary transition-all cursor-pointer',
          className
        )}
      >
        {/* Header */}
        <div className="flex gap-3 mb-3">
          {/* Company Logo */}
          <Avatar
            src={job.company?.logo_url}
            alt={job.company?.name || 'Company'}
            initials={job.company?.name?.[0] || 'C'}
            size={variant === 'compact' ? 'medium' : 'large'}
          />

          {/* Company Info */}
          <div className="flex-1 min-w-0">
            <div className="flex items-start justify-between gap-2">
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-base text-text truncate">
                  {job.title}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <Briefcase className="w-3.5 h-3.5 text-text-secondary flex-shrink-0" />
                  <span className="text-sm text-text-secondary truncate">
                    {job.company?.name || 'Company'}
                  </span>
                  {job.company?.is_verified && (
                    <CheckCircle2 className="w-4 h-4 text-verified flex-shrink-0" />
                  )}
                </div>
              </div>

              {/* Match Score Badge */}
              {matchScore !== undefined && (
                <div
                  className={cn(
                    'flex-shrink-0 px-2 py-1 rounded-full text-xs font-semibold',
                    getMatchColor(matchScore)
                  )}
                >
                  {matchScore}% Match
                </div>
              )}
            </div>

            {/* AI Recommendation Badge */}
            {isRecommended && (
              <div className="mt-2">
                <AIBadge variant="tag" size="small" label="AI Recommended" />
              </div>
            )}
          </div>
        </div>

        {/* Tags */}
        {variant === 'default' && (
          <div className="flex flex-wrap gap-2 mb-3">
            <div className="flex items-center gap-1 bg-surface-secondary px-2 py-1.5 rounded-lg">
              <MapPin className="w-3 h-3 text-text-secondary" />
              <span className="text-xs text-text-secondary">
                {job.city}, {job.country}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-surface-secondary px-2 py-1.5 rounded-lg">
              <Briefcase className="w-3 h-3 text-text-secondary" />
              <span className="text-xs text-text-secondary">
                {JOB_TYPE_LABELS[job.job_type] || job.job_type}
              </span>
            </div>

            <div className="flex items-center gap-1 bg-surface-secondary px-2 py-1.5 rounded-lg">
              <Laptop className="w-3 h-3 text-text-secondary" />
              <span className="text-xs text-text-secondary">
                {WORK_MODE_LABELS[job.work_mode] || job.work_mode}
              </span>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="flex items-center justify-between">
          {salary ? (
            <span className="text-sm font-semibold text-primary">{salary}</span>
          ) : (
            <span className="text-sm text-text-tertiary">Salary not disclosed</span>
          )}
          <span className="text-xs text-text-tertiary">
            {formatDate(job.created_at)}
          </span>
        </div>
      </div>
    </Link>
  );
}
