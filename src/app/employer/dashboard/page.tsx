'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { Briefcase, Users, Eye, TrendingUp, Plus, ChevronRight, Clock, Loader2, Video } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import BottomNav from '@/components/layout/BottomNav';

interface DashboardStats {
  activeJobs: number;
  totalApplicants: number;
  newToday: number;
  viewsThisWeek: number;
}

interface RecentApplicant {
  id: string;
  full_name: string;
  applied_at: string;
  job_title: string;
  status: string;
}

export default function EmployerDashboard() {
  const { profile, initialize } = useAuthStore();
  const [stats, setStats] = useState<DashboardStats>({ activeJobs: 0, totalApplicants: 0, newToday: 0, viewsThisWeek: 0 });
  const [recentApplicants, setRecentApplicants] = useState<RecentApplicant[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    initialize();
  }, [initialize]);

  useEffect(() => {
    if (profile?.id) loadDashboard();
  }, [profile]);

  const loadDashboard = async () => {
    setLoading(true);
    try {
      // Fetch employer's jobs
      const { data: jobs } = await supabase
        .from('jobs')
        .select('id, title, status')
        .eq('employer_id', profile!.id);

      const activeJobs = jobs?.filter((j) => j.status === 'active').length || 0;
      const jobIds = jobs?.map((j) => j.id) || [];

      // Fetch applications
      let totalApplicants = 0;
      let newToday = 0;
      const applicants: RecentApplicant[] = [];

      if (jobIds.length > 0) {
        const { data: apps } = await supabase
          .from('applications')
          .select('id, candidate_id, job_id, status, created_at, users:candidate_id(full_name)')
          .in('job_id', jobIds)
          .order('created_at', { ascending: false })
          .limit(10);

        totalApplicants = apps?.length || 0;
        const today = new Date().toISOString().split('T')[0];
        newToday = apps?.filter((a) => a.created_at?.startsWith(today)).length || 0;

        apps?.slice(0, 5).forEach((app: any) => {
          const job = jobs?.find((j) => j.id === app.job_id);
          applicants.push({
            id: app.id,
            full_name: app.users?.full_name || 'Unknown',
            applied_at: app.created_at,
            job_title: job?.title || 'Unknown Job',
            status: app.status,
          });
        });
      }

      setStats({ activeJobs, totalApplicants, newToday, viewsThisWeek: 0 });
      setRecentApplicants(applicants);
    } catch (error) {
      console.error('Dashboard error:', error);
    } finally {
      setLoading(false);
    }
  };

  const statusColors: Record<string, string> = {
    pending: 'text-yellow-400 bg-yellow-400/10',
    viewed: 'text-blue-400 bg-blue-400/10',
    shortlisted: 'text-emerald-400 bg-emerald-400/10',
    rejected: 'text-red-400 bg-red-400/10',
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
      <div className="px-6 pt-6 pb-4">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-xl font-bold text-white">Dashboard</h1>
            <p className="text-sm text-gray-500 mt-0.5">Manage your hiring</p>
          </div>
          <Link
            href="/employer/post-job"
            className="flex items-center gap-2 px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white text-sm font-medium rounded-lg transition-colors"
          >
            <Plus className="w-4 h-4" />
            Post Job
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-3">
          {[
            { label: 'Active Jobs', value: stats.activeJobs, icon: Briefcase, color: 'emerald' },
            { label: 'Total Applicants', value: stats.totalApplicants, icon: Users, color: 'blue' },
            { label: 'New Today', value: stats.newToday, icon: TrendingUp, color: 'purple' },
            { label: 'Views This Week', value: stats.viewsThisWeek, icon: Eye, color: 'amber' },
          ].map((stat) => (
            <div key={stat.label} className="bg-[#111] border border-white/[0.06] rounded-xl p-4">
              <div className={`w-8 h-8 bg-${stat.color}-500/10 rounded-lg flex items-center justify-center mb-3`}>
                <stat.icon className={`w-4 h-4 text-${stat.color}-400`} />
              </div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-xs text-gray-500 mt-0.5">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Quick Actions */}
      <div className="px-6 py-4">
        <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Quick Actions</h2>
        <div className="grid grid-cols-2 gap-3">
          <Link href="/employer/post-job" className="bg-[#111] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors">
            <Video className="w-5 h-5 text-emerald-400 mb-2" />
            <div className="text-sm font-medium text-white">Post with Video</div>
            <div className="text-xs text-gray-500 mt-0.5">Record a job intro</div>
          </Link>
          <Link href="/employer/candidates" className="bg-[#111] border border-white/[0.06] rounded-xl p-4 hover:border-white/[0.1] transition-colors">
            <Users className="w-5 h-5 text-blue-400 mb-2" />
            <div className="text-sm font-medium text-white">Review Candidates</div>
            <div className="text-xs text-gray-500 mt-0.5">Watch video responses</div>
          </Link>
        </div>
      </div>

      {/* Recent Applicants */}
      <div className="px-6 py-4">
        <div className="flex items-center justify-between mb-3">
          <h2 className="text-sm font-medium text-gray-400 uppercase tracking-wider">Recent Applicants</h2>
          <Link href="/employer/candidates" className="text-xs text-emerald-400 hover:text-emerald-300 flex items-center gap-1">
            View all <ChevronRight className="w-3 h-3" />
          </Link>
        </div>

        {recentApplicants.length === 0 ? (
          <div className="bg-[#111] border border-white/[0.06] rounded-xl p-8 text-center">
            <Users className="w-8 h-8 text-gray-600 mx-auto mb-2" />
            <p className="text-sm text-gray-500">No applicants yet</p>
            <p className="text-xs text-gray-600 mt-1">Post a job to start receiving applications</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentApplicants.map((applicant) => (
              <div key={applicant.id} className="bg-[#111] border border-white/[0.06] rounded-xl p-4 flex items-center justify-between">
                <div className="flex items-center gap-3 min-w-0">
                  <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                    <span className="text-sm font-semibold text-emerald-400">
                      {applicant.full_name.charAt(0).toUpperCase()}
                    </span>
                  </div>
                  <div className="min-w-0">
                    <div className="text-sm font-medium text-white truncate">{applicant.full_name}</div>
                    <div className="text-xs text-gray-500 truncate">{applicant.job_title}</div>
                  </div>
                </div>
                <span className={`text-xs px-2 py-1 rounded-md font-medium capitalize shrink-0 ${statusColors[applicant.status] || 'text-gray-400 bg-gray-400/10'}`}>
                  {applicant.status}
                </span>
              </div>
            ))}
          </div>
        )}
      </div>

      <BottomNav variant="employer" />
    </div>
  );
}
