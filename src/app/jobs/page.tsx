'use client';

import { useState, useEffect } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import JobCard from '@/components/job/JobCard';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import { Search, Filter, MapPin, Briefcase, SlidersHorizontal } from 'lucide-react';
import { getJobsFeed, searchJobs } from '@/lib/supabase';
import type { Job, JobFilters } from '@/types';
import {
  JOB_TYPE_LABELS,
  WORK_MODE_LABELS,
  EXPERIENCE_LEVEL_LABELS,
} from '@/lib/utils';

export default function JobsPage() {
  const [jobs, setJobs] = useState<Job[]>([]);
  const [filteredJobs, setFilteredJobs] = useState<Job[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [showFilters, setShowFilters] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');

  const [filters, setFilters] = useState<JobFilters>({
    query: '',
    job_type: undefined,
    work_mode: undefined,
    seniority: undefined,
  });

  useEffect(() => {
    loadJobs();
  }, []);

  const loadJobs = async () => {
    setIsLoading(true);
    try {
      const { data } = await getJobsFeed(undefined, 50);
      if (data) {
        setJobs(data as Job[]);
        setFilteredJobs(data as Job[]);
      }
    } catch (error) {
      console.error('Error loading jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSearch = async () => {
    setIsLoading(true);
    try {
      const { data } = await searchJobs({
        ...filters,
        query: searchQuery,
      });
      if (data) {
        setFilteredJobs(data as Job[]);
      }
    } catch (error) {
      console.error('Error searching jobs:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFilterChange = (key: keyof JobFilters, value: string) => {
    setFilters({ ...filters, [key]: value || undefined });
  };

  const clearFilters = () => {
    setFilters({
      query: '',
      job_type: undefined,
      work_mode: undefined,
      seniority: undefined,
    });
    setSearchQuery('');
    setFilteredJobs(jobs);
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
        <div className="p-4 space-y-3">
          <div className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-text">Jobs</h1>
            <button
              onClick={() => setShowFilters(!showFilters)}
              className="flex items-center gap-2 px-3 py-2 rounded-lg bg-surface-secondary text-text"
            >
              <SlidersHorizontal className="w-4 h-4" />
              <span className="text-sm font-medium">Filters</span>
            </button>
          </div>

          {/* Search Bar */}
          <div className="relative">
            <Input
              placeholder="Search jobs, companies, skills..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              leftIcon={<Search className="w-5 h-5" />}
              onKeyPress={(e) => {
                if (e.key === 'Enter') handleSearch();
              }}
            />
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="space-y-3 p-4 bg-surface-secondary rounded-xl">
              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Job Type
                </label>
                <select
                  value={filters.job_type || ''}
                  onChange={(e) => handleFilterChange('job_type', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text"
                >
                  <option value="">All Types</option>
                  {Object.entries(JOB_TYPE_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Work Mode
                </label>
                <select
                  value={filters.work_mode || ''}
                  onChange={(e) => handleFilterChange('work_mode', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text"
                >
                  <option value="">All Modes</option>
                  {Object.entries(WORK_MODE_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-text mb-1.5">
                  Experience Level
                </label>
                <select
                  value={filters.seniority || ''}
                  onChange={(e) => handleFilterChange('seniority', e.target.value)}
                  className="w-full px-4 py-2.5 rounded-lg border border-border bg-white text-text"
                >
                  <option value="">All Levels</option>
                  {Object.entries(EXPERIENCE_LEVEL_LABELS).map(([key, label]) => (
                    <option key={key} value={key}>
                      {label}
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex gap-2">
                <Button onClick={handleSearch} className="flex-1">
                  Apply Filters
                </Button>
                <Button variant="ghost" onClick={clearFilters}>
                  Clear
                </Button>
              </div>
            </div>
          )}
        </div>

        {/* Results Count */}
        <div className="px-4 pb-2">
          <p className="text-sm text-text-secondary">
            {filteredJobs.length} jobs found
          </p>
        </div>
      </div>

      {/* Jobs List */}
      <div className="p-4">
        {filteredJobs.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <Search className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-text mb-1">
              No Jobs Found
            </h3>
            <p className="text-xs text-text-secondary">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {filteredJobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
                matchScore={70 + Math.floor(Math.random() * 25)}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
