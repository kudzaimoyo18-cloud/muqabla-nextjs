'use client';

import { useState, useEffect, useCallback } from 'react';
import { RefreshCw, Compass } from 'lucide-react';
import { getJobsFeed } from '@/lib/supabase';
import JobCard from '@/components/JobCard';
import type { Job } from '@/types';
import { colors } from '@/constants/colors';

export default function FeedScreen() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const loadJobs = useCallback(async (refresh = false) => {
    if (refresh) setIsRefreshing(true);
    else setIsLoading(true);
    const { data } = await getJobsFeed(undefined, 10);
    setJobs((data || []) as Job[]);
    setIsLoading(false);
    setIsRefreshing(false);
  }, []);

  useEffect(() => { loadJobs(); }, [loadJobs]);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-white border-b border-border p-5">
        <h1 className="text-2xl font-bold text-text">Discover Jobs</h1>
        <p className="text-sm text-text-secondary mt-1">Latest opportunities in the GCC</p>
      </div>

      {/* Content */}
      {isLoading ? (
        <div className="flex items-center justify-center py-12">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      ) : jobs.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16">
          <Compass className="w-16 h-16 text-border mb-4" />
          <h2 className="text-lg font-semibold text-text-secondary">No jobs found</h2>
          <p className="text-sm text-text-tertiary mt-1">Check back later for new opportunities</p>
        </div>
      ) : (
        <div className="p-4 space-y-3">
          {jobs.map((job) => (
            <JobCard key={job.id} job={job} />
          ))}
        </div>
      )}

      {/* Refresh Button */}
      {!isLoading && (
        <button
          onClick={() => loadJobs(true)}
          disabled={isRefreshing}
          className="fixed bottom-6 right-6 bg-primary text-white p-3 rounded-full shadow-lg hover:bg-primary-dark transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-6 h-6 ${isRefreshing ? 'animate-spin' : ''}`} />
        </button>
      )}
    </div>
  );
}
