'use client';

import { useState, useEffect } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import JobCard from '@/components/job/JobCard';
import AIBadge from '@/components/ui/AIBadge';
import { getJobsFeed } from '@/lib/supabase';
import { RefreshCw, Filter, Sparkles, TrendingUp, Briefcase } from 'lucide-react';
import type { Job } from '@/types';

export default function DashboardPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [recommendedJobs, setRecommendedJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [showRecommended, setShowRecommended] = useState(true);

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);

    try {
      const { data } = await getJobsFeed(undefined, 10);
      if (data) {
        setJobs(data as Job[]);
        // Simulate AI recommendations (first 3)
        setRecommendedJobs((data as Job[]).slice(0, 3));
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setIsLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleRefresh = () => {
    loadJobs(true);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-40">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-text">Discover</h1>
              <p className="text-sm text-text-secondary">
                AI-powered job recommendations
              </p>
            </div>
            <button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="p-2 rounded-full hover:bg-surface-secondary transition-colors"
            >
              <RefreshCw
                className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`}
              />
            </button>
          </div>

          {/* Filter Tabs */}
          <div className="flex gap-2 mt-4">
            <button
              onClick={() => setShowRecommended(true)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                showRecommended
                  ? 'bg-primary text-white'
                  : 'bg-surface-secondary text-text-secondary'
              }`}
            >
              For You
            </button>
            <button
              onClick={() => setShowRecommended(false)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                !showRecommended
                  ? 'bg-primary text-white'
                  : 'bg-surface-secondary text-text-secondary'
              }`}
            >
              All Jobs
            </button>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4">
        {showRecommended ? (
          <>
            {/* AI Recommendations Section */}
            <div className="mb-6">
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text">
                    AI Recommended
                  </h2>
                  <p className="text-xs text-text-secondary">
                    Based on your profile
                  </p>
                </div>
                <AIBadge variant="icon" size="small" />
              </div>

              {recommendedJobs.length === 0 ? (
                <div className="bg-white rounded-xl p-6 text-center border border-border">
                  <TrendingUp className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
                  <h3 className="text-sm font-semibold text-text mb-1">
                    No Recommendations Yet
                  </h3>
                  <p className="text-xs text-text-secondary">
                    Complete your profile to get personalized job recommendations
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {recommendedJobs.map((job) => (
                    <JobCard
                      key={job.id}
                      job={job}
                      isRecommended={true}
                      matchScore={85 + Math.floor(Math.random() * 15)}
                    />
                  ))}
                </div>
              )}
            </div>

            {/* Trending Section */}
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-accent to-accent-light flex items-center justify-center">
                  <TrendingUp className="w-4 h-4 text-white" />
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-text">Trending Jobs</h2>
                  <p className="text-xs text-text-secondary">
                    Most popular this week
                  </p>
                </div>
              </div>

              {jobs.length === 0 ? (
                <div className="bg-white rounded-xl p-6 text-center border border-border">
                  <p className="text-sm text-text-secondary">
                    No jobs available right now
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  {jobs.slice(3).map((job) => (
                    <JobCard key={job.id} job={job} />
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <>
            {/* All Jobs Feed */}
            {jobs.length === 0 ? (
              <div className="bg-white rounded-xl p-6 text-center border border-border">
                <Briefcase className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-text mb-1">
                  No Jobs Found
                </h3>
                <p className="text-xs text-text-secondary">
                  Check back later for new opportunities
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {jobs.map((job) => (
                  <JobCard key={job.id} job={job} />
                ))}
              </div>
            )}
          </>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
