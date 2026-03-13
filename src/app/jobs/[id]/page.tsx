'use client';

import { useState, useEffect } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import Button from '@/components/ui/Button';
import AIBadge from '@/components/ui/AIBadge';
import MatchProgress from '@/components/ui/MatchProgress';
import Avatar from '@/components/ui/Avatar';
import { usePathname } from 'next/navigation';
import { getJobById } from '@/lib/supabase';
import { matchCandidateToJob, generateJobInsights, generateInterviewQuestions } from '@/lib/ai';
import type { Job } from '@/types';
import {
  MapPin,
  Briefcase,
  Clock,
  DollarSign,
  CheckCircle2,
  Share2,
  Bookmark,
  ChevronRight,
  Play,
  Sparkles,
  Lightbulb,
  Users,
  Calendar,
} from 'lucide-react';
import {
  formatDate,
  formatSalary,
  JOB_TYPE_LABELS,
  WORK_MODE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from '@/lib/utils';

export default function JobDetailPage() {
  const pathname = usePathname();
  const jobId = pathname.split('/').pop();

  const [job, setJob] = useState<Job | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [matchScore, setMatchScore] = useState<number | null>(null);
  const [showAIDetails, setShowAIDetails] = useState(false);

  useEffect(() => {
    if (jobId) {
      loadJobDetails();
    }
  }, [jobId]);

  const loadJobDetails = async () => {
    setIsLoading(true);
    try {
      const { data } = await getJobById(jobId!);
      if (data) {
        setJob(data as Job);
        // Simulate AI match score (in production, would use real candidate data)
        setMatchScore(85);
      }
    } catch (error) {
      console.error('Error loading job:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !job) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const salary = job.show_salary
    ? formatSalary(job.salary_min, job.salary_max, job.salary_currency)
    : null;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="bg-white border-b border-border">
        <div className="p-4 space-y-4">
          {/* Company Header */}
          <div className="flex items-start gap-3">
            <Avatar
              src={job.company?.logo_url}
              alt={job.company?.name || 'Company'}
              initials={job.company?.name?.[0] || 'C'}
              size="large"
            />
            <div className="flex-1">
              <h1 className="text-xl font-bold text-text">{job.title}</h1>
              <div className="flex items-center gap-1 mt-1">
                <span className="text-sm text-text-secondary">
                  {job.company?.name || 'Company'}
                </span>
                {job.company?.is_verified && (
                  <CheckCircle2 className="w-4 h-4 text-verified" />
                )}
              </div>
            </div>
          </div>

          {/* AI Match Score */}
          {matchScore && (
            <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
              <div className="flex items-center justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <Sparkles className="w-5 h-5 text-purple-600" />
                    <h3 className="text-sm font-semibold text-text">
                      AI Match Analysis
                    </h3>
                    <AIBadge variant="icon" size="small" />
                  </div>
                  <p className="text-xs text-text-secondary mb-3">
                    This job aligns {matchScore}% with your profile
                  </p>
                  <button
                    onClick={() => setShowAIDetails(!showAIDetails)}
                    className="text-sm font-medium text-purple-600 hover:underline"
                  >
                    {showAIDetails ? 'Hide details' : 'View details'}
                  </button>
                </div>
                <MatchProgress score={matchScore} size="medium" />
              </div>

              {showAIDetails && (
                <div className="mt-4 pt-4 border-t border-purple-100 space-y-3">
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-text">
                      Skills match your expertise
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-green-600" />
                    <span className="text-sm text-text">
                      Experience level is a good fit
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-blue-600" />
                    <span className="text-sm text-text">
                      Location preferences aligned
                    </span>
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Quick Info */}
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2 bg-surface-secondary px-3 py-2 rounded-lg">
              <MapPin className="w-4 h-4 text-text-secondary" />
              <span className="text-xs text-text">
                {job.city}, {job.country}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-surface-secondary px-3 py-2 rounded-lg">
              <Briefcase className="w-4 h-4 text-text-secondary" />
              <span className="text-xs text-text">
                {JOB_TYPE_LABELS[job.job_type]}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-surface-secondary px-3 py-2 rounded-lg">
              <Clock className="w-4 h-4 text-text-secondary" />
              <span className="text-xs text-text">
                {WORK_MODE_LABELS[job.work_mode]}
              </span>
            </div>
            <div className="flex items-center gap-2 bg-surface-secondary px-3 py-2 rounded-lg">
              <Users className="w-4 h-4 text-text-secondary" />
              <span className="text-xs text-text">
                {EXPERIENCE_LEVEL_LABELS[job.seniority || 'mid']}
              </span>
            </div>
          </div>

          {/* Salary */}
          {salary && (
            <div className="flex items-center gap-2 bg-green-50 px-4 py-3 rounded-lg">
              <DollarSign className="w-5 h-5 text-green-600" />
              <div>
                <p className="text-xs text-text-secondary">Salary Range</p>
                <p className="text-base font-semibold text-green-700">{salary}</p>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Description */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h2 className="text-base font-semibold text-text mb-2">
            Job Description
          </h2>
          <p className="text-sm text-text-secondary whitespace-pre-wrap">
            {job.description || 'No description provided.'}
          </p>
        </div>

        {/* Requirements */}
        {job.requirements.length > 0 && (
          <div className="bg-white rounded-xl p-4 border border-border">
            <h2 className="text-base font-semibold text-text mb-2">
              Requirements
            </h2>
            <ul className="space-y-2">
              {job.requirements.map((req, index) => (
                <li key={index} className="flex items-start gap-2">
                  <CheckCircle2 className="w-4 h-4 text-primary flex-shrink-0 mt-0.5" />
                  <span className="text-sm text-text-secondary">{req}</span>
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Benefits */}
        {job.benefits.length > 0 && (
          <div className="bg-white rounded-xl p-4 border border-border">
            <h2 className="text-base font-semibold text-text mb-2">Benefits</h2>
            <div className="flex flex-wrap gap-2">
              {job.benefits.map((benefit, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-surface-secondary rounded-lg text-xs text-text"
                >
                  {benefit}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* AI Interview Prep */}
        <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
          <div className="flex items-center gap-2 mb-3">
            <Lightbulb className="w-5 h-5 text-purple-600" />
            <h2 className="text-base font-semibold text-text">
              AI Interview Preparation
            </h2>
            <AIBadge variant="icon" size="small" />
          </div>
          <p className="text-sm text-text-secondary mb-3">
            Get AI-generated interview questions and tips for this role
          </p>
          <Button
            variant="outline"
            size="small"
            fullWidth
            onClick={() => {
              // In production, would open interview prep modal
              alert('AI interview questions coming soon!');
            }}
          >
            <Play className="w-4 h-4 mr-2" />
            Start Practice
          </Button>
        </div>

        {/* Company Info */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h2 className="text-base font-semibold text-text mb-3">
            About the Company
          </h2>
          <div className="flex items-center gap-3 mb-3">
            <Avatar
              src={job.company?.logo_url}
              alt={job.company?.name}
              initials={job.company?.name?.[0] || 'C'}
              size="medium"
            />
            <div>
              <p className="text-sm font-medium text-text">
                {job.company?.name}
              </p>
              {job.company?.industry && (
                <p className="text-xs text-text-secondary">
                  {job.company.industry}
                </p>
              )}
            </div>
          </div>
          {job.company?.description && (
            <p className="text-sm text-text-secondary">
              {job.company.description}
            </p>
          )}
        </div>

        {/* Posted Date */}
        <div className="text-center">
          <p className="text-xs text-text-tertiary">
            Posted {formatDate(job.created_at)}
          </p>
        </div>
      </div>

      {/* Fixed Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-border p-4 z-50">
        <div className="max-w-lg mx-auto flex gap-3">
          <Button variant="ghost" className="flex-1">
            <Share2 className="w-5 h-5 mr-2" />
            Share
          </Button>
          <Button variant="ghost" className="flex-1">
            <Bookmark className="w-5 h-5 mr-2" />
            Save
          </Button>
          <Button className="flex-2" size="large">
            Apply Now
            <ChevronRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      </div>
    </div>
  );
}
