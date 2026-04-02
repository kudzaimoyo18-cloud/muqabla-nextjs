'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search, MapPin, DollarSign, Briefcase, Building2, Filter, X,
  Loader2, ChevronDown, Bookmark, BookmarkCheck,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import { useFeedStore } from '@/stores/feed-store';
import BottomNav from '@/components/layout/BottomNav';

interface SearchJob {
  id: string;
  title: string;
  company_name: string;
  location: string;
  salary_min?: number;
  salary_max?: number;
  salary_currency: string;
  job_type: string;
  work_mode: string;
  experience_level: string;
  created_at: string;
}

const JOB_TYPE_LABELS: Record<string, string> = {
  full_time: 'Full Time', part_time: 'Part Time', contract: 'Contract',
  freelance: 'Freelance', internship: 'Internship',
};

function formatSalary(min?: number, max?: number, currency = 'AED') {
  const fmt = (n: number) => n >= 1000 ? `${(n / 1000).toFixed(0)}K` : n.toString();
  if (min && max) return `${currency} ${fmt(min)} - ${fmt(max)}`;
  if (min) return `${currency} ${fmt(min)}+`;
  if (max) return `Up to ${currency} ${fmt(max)}`;
  return 'Competitive';
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m ago`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h ago`;
  const days = Math.floor(hrs / 24);
  return `${days}d ago`;
}

export default function SearchPage() {
  const { profile, initialize } = useAuthStore();
  const { savedJobs, saveJob, unsaveJob } = useFeedStore();
  const [query, setQuery] = useState('');
  const [jobs, setJobs] = useState<SearchJob[]>([]);
  const [loading, setLoading] = useState(false);
  const [showFilters, setShowFilters] = useState(false);
  const [filters, setFilters] = useState({
    job_type: '',
    work_mode: '',
    location: '',
  });

  useEffect(() => { initialize(); }, [initialize]);

  useEffect(() => {
    const timer = setTimeout(() => searchJobs(), 300);
    return () => clearTimeout(timer);
  }, [query, filters]);

  const searchJobs = async () => {
    setLoading(true);
    try {
      let q = supabase
        .from('jobs')
        .select('id, title, location, salary_min, salary_max, salary_currency, job_type, work_mode, experience_level, created_at, companies:company_id(name)')
        .eq('status', 'active')
        .order('created_at', { ascending: false })
        .limit(30);

      if (query) {
        q = q.or(`title.ilike.%${query}%,description.ilike.%${query}%`);
      }
      if (filters.job_type) q = q.eq('job_type', filters.job_type);
      if (filters.work_mode) q = q.eq('work_mode', filters.work_mode);
      if (filters.location) q = q.ilike('location', `%${filters.location}%`);

      const { data, error } = await q;
      if (error) throw error;

      setJobs((data || []).map((j: any) => ({
        ...j,
        company_name: j.companies?.name || 'Unknown',
      })));
    } catch (error) {
      console.error('Search error:', error);
    } finally {
      setLoading(false);
    }
  };

  const toggleSave = async (jobId: string) => {
    if (!profile?.id) return;
    if (savedJobs.has(jobId)) {
      await unsaveJob(jobId, profile.id);
    } else {
      await saveJob(jobId, profile.id);
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Search Header */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <div className="flex gap-2 mb-3">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search jobs, companies..."
              className="w-full bg-[#111] border border-white/[0.06] rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0"
            />
            {query && (
              <button onClick={() => setQuery('')} className="absolute right-3 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4 text-gray-500" />
              </button>
            )}
          </div>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className={`p-3 rounded-lg border transition-colors ${showFilters ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-[#111] border-white/[0.06] text-gray-400'}`}
          >
            <Filter className="w-4 h-4" />
          </button>
        </div>

        {/* Filters */}
        {showFilters && (
          <div className="flex gap-2 animate-fadeIn">
            <select
              value={filters.job_type}
              onChange={(e) => setFilters((f) => ({ ...f, job_type: e.target.value }))}
              className="bg-[#111] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500/50 focus:ring-0"
            >
              <option value="">All Types</option>
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="remote">Remote</option>
            </select>
            <select
              value={filters.work_mode}
              onChange={(e) => setFilters((f) => ({ ...f, work_mode: e.target.value }))}
              className="bg-[#111] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white focus:border-emerald-500/50 focus:ring-0"
            >
              <option value="">All Modes</option>
              <option value="on_site">On-site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
            <input
              type="text"
              value={filters.location}
              onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
              placeholder="Location"
              className="flex-1 bg-[#111] border border-white/[0.06] rounded-lg px-3 py-2 text-xs text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0"
            />
          </div>
        )}
      </div>

      {/* Results */}
      <div className="px-6 py-4">
        {loading && jobs.length === 0 ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          </div>
        ) : jobs.length === 0 ? (
          <div className="text-center py-20">
            <Search className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">{query ? 'No jobs found' : 'Search for jobs'}</p>
          </div>
        ) : (
          <div className="space-y-3">
            <p className="text-xs text-gray-500 mb-2">{jobs.length} results</p>
            {jobs.map((job) => (
              <div key={job.id} className="bg-[#111] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors">
                <div className="flex items-start justify-between mb-2">
                  <div className="min-w-0 flex-1">
                    <h3 className="font-medium text-white text-sm truncate">{job.title}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-gray-500 mt-1">
                      <Building2 className="w-3 h-3" />
                      <span>{job.company_name}</span>
                      <span className="text-gray-700">&middot;</span>
                      <span>{timeAgo(job.created_at)}</span>
                    </div>
                  </div>
                  <button onClick={() => toggleSave(job.id)} className="ml-2 p-1.5 rounded-lg hover:bg-white/[0.04]">
                    {savedJobs.has(job.id) ? (
                      <BookmarkCheck className="w-4 h-4 text-emerald-400" />
                    ) : (
                      <Bookmark className="w-4 h-4 text-gray-500" />
                    )}
                  </button>
                </div>

                <div className="flex flex-wrap gap-1.5">
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/[0.04] rounded text-xs text-gray-400">
                    <MapPin className="w-2.5 h-2.5" />
                    {job.location}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/[0.04] rounded text-xs text-gray-400">
                    <DollarSign className="w-2.5 h-2.5" />
                    {formatSalary(job.salary_min, job.salary_max, job.salary_currency)}
                  </span>
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-white/[0.04] rounded text-xs text-gray-400">
                    <Briefcase className="w-2.5 h-2.5" />
                    {JOB_TYPE_LABELS[job.job_type] || job.job_type}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
