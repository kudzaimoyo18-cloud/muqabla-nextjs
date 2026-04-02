'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  ArrowLeft, Search, Users, Play, LayoutGrid, LayoutList,
  Loader2, MapPin, Star, Filter, ChevronDown,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import BottomNav from '@/components/layout/BottomNav';

interface CandidateApplication {
  id: string;
  candidate_id: string;
  full_name: string;
  email: string;
  skills: string[];
  experience_years: number;
  location: string;
  video_url?: string;
  job_title: string;
  job_id: string;
  status: string;
  applied_at: string;
  match_score?: number;
}

export default function CandidatesPage() {
  const { profile, initialize } = useAuthStore();
  const [candidates, setCandidates] = useState<CandidateApplication[]>([]);
  const [loading, setLoading] = useState(true);
  const [view, setView] = useState<'list' | 'card'>('card');
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');

  useEffect(() => { initialize(); }, [initialize]);

  useEffect(() => {
    if (profile?.id) fetchCandidates();
  }, [profile]);

  const fetchCandidates = async () => {
    setLoading(true);
    try {
      const { data: jobs } = await supabase
        .from('jobs')
        .select('id, title')
        .eq('employer_id', profile!.id);

      const jobIds = jobs?.map((j) => j.id) || [];
      if (jobIds.length === 0) {
        setCandidates([]);
        setLoading(false);
        return;
      }

      const { data: apps } = await supabase
        .from('applications')
        .select('id, candidate_id, job_id, status, created_at, candidates:candidate_id(full_name, email, skills, experience_years, location, video_url)')
        .in('job_id', jobIds)
        .order('created_at', { ascending: false });

      const formatted: CandidateApplication[] = (apps || []).map((app: any) => {
        const job = jobs?.find((j) => j.id === app.job_id);
        return {
          id: app.id,
          candidate_id: app.candidate_id,
          full_name: app.candidates?.full_name || 'Unknown',
          email: app.candidates?.email || '',
          skills: app.candidates?.skills || [],
          experience_years: app.candidates?.experience_years || 0,
          location: app.candidates?.location || '',
          video_url: app.candidates?.video_url,
          job_title: job?.title || 'Unknown',
          job_id: app.job_id,
          status: app.status,
          applied_at: app.created_at,
        };
      });

      setCandidates(formatted);
    } catch (error) {
      console.error('Fetch candidates error:', error);
    } finally {
      setLoading(false);
    }
  };

  const updateStatus = async (applicationId: string, status: string) => {
    await supabase.from('applications').update({ status }).eq('id', applicationId);
    setCandidates((prev) =>
      prev.map((c) => (c.id === applicationId ? { ...c, status } : c))
    );
  };

  const filtered = candidates.filter((c) => {
    const matchesSearch = c.full_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      c.job_title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === 'all' || c.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const statusColors: Record<string, string> = {
    pending: 'text-yellow-400 bg-yellow-400/10 border-yellow-400/20',
    viewed: 'text-blue-400 bg-blue-400/10 border-blue-400/20',
    shortlisted: 'text-emerald-400 bg-emerald-400/10 border-emerald-400/20',
    interviewing: 'text-purple-400 bg-purple-400/10 border-purple-400/20',
    offered: 'text-cyan-400 bg-cyan-400/10 border-cyan-400/20',
    hired: 'text-green-400 bg-green-400/10 border-green-400/20',
    rejected: 'text-red-400 bg-red-400/10 border-red-400/20',
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <Loader2 className="w-8 h-8 animate-spin text-emerald-400" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-lg font-semibold text-white">Candidates ({filtered.length})</h1>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setView('card')}
              className={`p-2 rounded-lg ${view === 'card' ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-500'}`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView('list')}
              className={`p-2 rounded-lg ${view === 'list' ? 'bg-emerald-500/10 text-emerald-400' : 'text-gray-500'}`}
            >
              <LayoutList className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Search & Filter */}
        <div className="flex gap-2">
          <div className="flex-1 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search candidates..."
              className="w-full bg-[#111] border border-white/[0.06] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0"
            />
          </div>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-[#111] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white focus:border-emerald-500/50 focus:ring-0"
          >
            <option value="all">All</option>
            <option value="pending">Pending</option>
            <option value="shortlisted">Shortlisted</option>
            <option value="interviewing">Interviewing</option>
            <option value="hired">Hired</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>
      </div>

      {/* Candidates */}
      <div className={`px-6 py-4 ${view === 'card' ? 'grid grid-cols-1 sm:grid-cols-2 gap-4' : 'space-y-2'}`}>
        {filtered.length === 0 ? (
          <div className="col-span-2 text-center py-12">
            <Users className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No candidates found</p>
          </div>
        ) : (
          filtered.map((candidate) => (
            view === 'card' ? (
              /* Card View */
              <div key={candidate.id} className="bg-[#111] border border-white/[0.06] rounded-xl p-5 hover:border-white/[0.1] transition-colors">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="w-11 h-11 bg-emerald-500/10 rounded-full flex items-center justify-center">
                      <span className="text-sm font-bold text-emerald-400">{candidate.full_name.charAt(0)}</span>
                    </div>
                    <div>
                      <div className="font-medium text-white text-sm">{candidate.full_name}</div>
                      <div className="text-xs text-gray-500">{candidate.job_title}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-0.5 rounded border capitalize ${statusColors[candidate.status] || ''}`}>
                    {candidate.status}
                  </span>
                </div>

                {candidate.location && (
                  <div className="flex items-center gap-1 text-xs text-gray-500 mb-3">
                    <MapPin className="w-3 h-3" />
                    {candidate.location}
                  </div>
                )}

                {candidate.skills.length > 0 && (
                  <div className="flex flex-wrap gap-1.5 mb-4">
                    {candidate.skills.slice(0, 4).map((skill) => (
                      <span key={skill} className="text-xs bg-white/[0.04] text-gray-400 px-2 py-0.5 rounded">
                        {skill}
                      </span>
                    ))}
                    {candidate.skills.length > 4 && (
                      <span className="text-xs text-gray-600">+{candidate.skills.length - 4}</span>
                    )}
                  </div>
                )}

                <div className="flex gap-2">
                  {candidate.video_url && (
                    <button className="flex-1 flex items-center justify-center gap-1.5 py-2 bg-emerald-500/10 text-emerald-400 rounded-lg text-xs font-medium hover:bg-emerald-500/20 transition-colors">
                      <Play className="w-3.5 h-3.5" />
                      Watch Video
                    </button>
                  )}
                  <select
                    value={candidate.status}
                    onChange={(e) => updateStatus(candidate.id, e.target.value)}
                    className="flex-1 bg-[#1a1a1a] border border-white/[0.06] rounded-lg px-2 py-2 text-xs text-white"
                  >
                    <option value="pending">Pending</option>
                    <option value="viewed">Viewed</option>
                    <option value="shortlisted">Shortlisted</option>
                    <option value="interviewing">Interviewing</option>
                    <option value="offered">Offered</option>
                    <option value="hired">Hired</option>
                    <option value="rejected">Rejected</option>
                  </select>
                </div>
              </div>
            ) : (
              /* List View */
              <div key={candidate.id} className="bg-[#111] border border-white/[0.06] rounded-xl px-4 py-3 flex items-center gap-3">
                <div className="w-9 h-9 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-xs font-bold text-emerald-400">{candidate.full_name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium text-white truncate">{candidate.full_name}</div>
                  <div className="text-xs text-gray-500 truncate">{candidate.job_title} &middot; {candidate.location}</div>
                </div>
                {candidate.video_url && (
                  <button className="p-2 text-emerald-400 hover:bg-emerald-500/10 rounded-lg">
                    <Play className="w-4 h-4" />
                  </button>
                )}
                <span className={`text-xs px-2 py-0.5 rounded border capitalize shrink-0 ${statusColors[candidate.status] || ''}`}>
                  {candidate.status}
                </span>
              </div>
            )
          ))
        )}
      </div>

      <BottomNav variant="employer" />
    </div>
  );
}
