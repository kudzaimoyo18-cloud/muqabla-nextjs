import React from 'react';
import Link from 'next/link';
import { MapPin, Briefcase, Laptop, Video, Bookmark, Share2, CheckCircle2 } from 'lucide-react';
import { formatDate, formatSalary, JOB_TYPE_LABELS, WORK_MODE_LABELS } from '@/lib/utils';
import type { Job } from '@/types';

interface JobCardProps {
  job: Job;
  isSaved?: boolean;
  onSave?: () => void;
  onShare?: () => void;
}

export default function JobCard({ job, isSaved, onSave, onShare }: JobCardProps) {
  const salary = job.show_salary ? formatSalary(job.salary_min, job.salary_max, job.salary_currency) : null;

  return (
    <Link href={`/job/${job.id}`}>
      <div className="bg-white border border-border rounded-xl p-4 hover:border-primary transition-colors cursor-pointer">
        {/* Header */}
        <div className="flex gap-3 mb-3">
          {/* Company Logo */}
          <div className="w-12 h-12 rounded-xl bg-surface-secondary flex items-center justify-center">
            <span className="text-xl font-bold text-text-secondary">
              {job.company?.name?.[0] || 'C'}
            </span>
          </div>

          {/* Company Info */}
          <div className="flex-1">
            <h3 className="font-semibold text-base text-text">{job.title}</h3>
            <div className="flex items-center gap-1 mt-1">
              <Briefcase className="w-3.5 h-3.5 text-text-secondary" />
              <span className="text-sm text-text-secondary">{job.company?.name || 'Company'}</span>
              {job.company?.is_verified && (
                <CheckCircle2 className="w-4 h-4 text-verified" />
              )}
            </div>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-3">
          <div className="flex items-center gap-1 bg-surface-secondary px-2 py-1.5 rounded-lg">
            <MapPin className="w-3 h-3 text-text-secondary" />
            <span className="text-xs text-text-secondary">{job.city}, {job.country}</span>
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

        {/* Footer */}
        <div className="flex items-center justify-between">
          {salary ? (
            <span className="text-sm font-semibold text-primary">{salary}</span>
          ) : (
            <span className="text-sm text-text-tertiary">Salary not disclosed</span>
          )}
          <span className="text-xs text-text-tertiary">{formatDate(job.created_at)}</span>
        </div>

        {/* Action Buttons */}
        {(onSave || onShare) && (
          <div className="flex gap-2 mt-3 pt-3 border-t border-border">
            {onSave && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onSave();
                }}
                className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                <Bookmark className={`w-4 h-4 ${isSaved ? 'fill-current text-accent' : ''}`} />
                <span>Save</span>
              </button>
            )}
            {onShare && (
              <button
                onClick={(e) => {
                  e.preventDefault();
                  onShare();
                }}
                className="flex items-center gap-1 text-sm text-text-secondary hover:text-primary transition-colors"
              >
                <Share2 className="w-4 h-4" />
                <span>Share</span>
              </button>
            )}
          </div>
        )}
      </div>
    </Link>
  );
}
