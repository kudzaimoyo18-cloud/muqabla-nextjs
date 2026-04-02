'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import {
  ArrowLeft, Video, Upload, X, Loader2, MapPin, DollarSign,
  Briefcase, Clock, FileText, Plus, Trash2, Check,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import BottomNav from '@/components/layout/BottomNav';

export default function PostJobPage() {
  const router = useRouter();
  const { profile } = useAuthStore();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const [form, setForm] = useState({
    title: '',
    description: '',
    location: '',
    salary_min: '',
    salary_max: '',
    salary_currency: 'AED',
    job_type: 'full_time',
    work_mode: 'on_site',
    experience_level: 'mid',
    requirements: [''],
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState('');

  const updateField = (key: string, value: string) => {
    setForm((prev) => ({ ...prev, [key]: value }));
  };

  const addRequirement = () => {
    setForm((prev) => ({ ...prev, requirements: [...prev.requirements, ''] }));
  };

  const updateRequirement = (index: number, value: string) => {
    const updated = [...form.requirements];
    updated[index] = value;
    setForm((prev) => ({ ...prev, requirements: updated }));
  };

  const removeRequirement = (index: number) => {
    setForm((prev) => ({
      ...prev,
      requirements: prev.requirements.filter((_, i) => i !== index),
    }));
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!profile?.id) return;
    setLoading(true);
    setError('');

    try {
      // Upload video to Cloudflare if provided
      let videoUrl = null;
      if (videoFile) {
        const res = await fetch('/api/upload', { method: 'POST' });
        const { uploadUrl, videoId } = await res.json();
        if (uploadUrl) {
          const formData = new FormData();
          formData.append('file', videoFile);
          await fetch(uploadUrl, { method: 'POST', body: formData });
          videoUrl = videoId; // Store the Cloudflare video ID
        }
      }

      const { error: dbError } = await supabase.from('jobs').insert({
        employer_id: profile.id,
        title: form.title,
        description: form.description,
        location: form.location,
        salary_min: form.salary_min ? parseInt(form.salary_min) : null,
        salary_max: form.salary_max ? parseInt(form.salary_max) : null,
        salary_currency: form.salary_currency,
        job_type: form.job_type,
        work_mode: form.work_mode,
        experience_level: form.experience_level,
        requirements: form.requirements.filter(Boolean),
        video_url: videoUrl,
        status: 'active',
      });

      if (dbError) throw dbError;
      setSuccess(true);
      setTimeout(() => router.push('/employer/dashboard'), 1500);
    } catch (err: any) {
      setError(err.message || 'Failed to post job');
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <Check className="w-8 h-8 text-emerald-400" />
          </div>
          <h2 className="text-xl font-bold text-white mb-2">Job Posted!</h2>
          <p className="text-gray-400 text-sm">Redirecting to dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      {/* Header */}
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4 flex items-center gap-3">
        <Link href="/employer/dashboard" className="text-gray-400 hover:text-white">
          <ArrowLeft className="w-5 h-5" />
        </Link>
        <h1 className="text-lg font-semibold text-white">Post a New Job</h1>
      </div>

      <form onSubmit={handleSubmit} className="px-6 py-6 space-y-6 max-w-2xl mx-auto">
        {error && (
          <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3">
            {error}
          </div>
        )}

        {/* Video Upload */}
        <div>
          <label className="block text-sm text-gray-400 mb-2">Job Intro Video (optional)</label>
          {videoPreview ? (
            <div className="relative rounded-xl overflow-hidden bg-[#111] border border-white/[0.06]">
              <video src={videoPreview} className="w-full aspect-video object-cover" controls />
              <button
                type="button"
                onClick={() => { setVideoFile(null); setVideoPreview(''); }}
                className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center"
              >
                <X className="w-4 h-4 text-white" />
              </button>
            </div>
          ) : (
            <label className="flex flex-col items-center justify-center aspect-video bg-[#111] border border-dashed border-white/[0.1] rounded-xl cursor-pointer hover:border-emerald-500/30 transition-colors">
              <Upload className="w-8 h-8 text-gray-600 mb-2" />
              <span className="text-sm text-gray-500">Record or upload a video intro</span>
              <span className="text-xs text-gray-600 mt-1">MP4, MOV up to 5 min</span>
              <input type="file" accept="video/*" onChange={handleVideoSelect} className="hidden" />
            </label>
          )}
        </div>

        {/* Title */}
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Job Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={(e) => updateField('title', e.target.value)}
            placeholder="e.g. Senior Frontend Developer"
            required
            className="w-full bg-[#111] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0 transition-colors"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Description *</label>
          <textarea
            value={form.description}
            onChange={(e) => updateField('description', e.target.value)}
            placeholder="Describe the role, responsibilities, and what makes it unique..."
            required
            rows={5}
            className="w-full bg-[#111] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0 transition-colors resize-none"
          />
        </div>

        {/* Location */}
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Location *</label>
          <div className="relative">
            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              type="text"
              value={form.location}
              onChange={(e) => updateField('location', e.target.value)}
              placeholder="e.g. Dubai, UAE"
              required
              className="w-full bg-[#111] border border-white/[0.06] rounded-lg pl-10 pr-4 py-3 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0 transition-colors"
            />
          </div>
        </div>

        {/* Salary */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Min Salary</label>
            <input
              type="number"
              value={form.salary_min}
              onChange={(e) => updateField('salary_min', e.target.value)}
              placeholder="e.g. 15000"
              className="w-full bg-[#111] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0 transition-colors"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Max Salary</label>
            <input
              type="number"
              value={form.salary_max}
              onChange={(e) => updateField('salary_max', e.target.value)}
              placeholder="e.g. 25000"
              className="w-full bg-[#111] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0 transition-colors"
            />
          </div>
        </div>

        {/* Job Type & Work Mode */}
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Job Type</label>
            <select
              value={form.job_type}
              onChange={(e) => updateField('job_type', e.target.value)}
              className="w-full bg-[#111] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:ring-0 transition-colors"
            >
              <option value="full_time">Full Time</option>
              <option value="part_time">Part Time</option>
              <option value="contract">Contract</option>
              <option value="freelance">Freelance</option>
              <option value="internship">Internship</option>
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-1.5">Work Mode</label>
            <select
              value={form.work_mode}
              onChange={(e) => updateField('work_mode', e.target.value)}
              className="w-full bg-[#111] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:ring-0 transition-colors"
            >
              <option value="on_site">On-site</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
            </select>
          </div>
        </div>

        {/* Experience Level */}
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Experience Level</label>
          <select
            value={form.experience_level}
            onChange={(e) => updateField('experience_level', e.target.value)}
            className="w-full bg-[#111] border border-white/[0.06] rounded-lg px-4 py-3 text-sm text-white focus:border-emerald-500/50 focus:ring-0 transition-colors"
          >
            <option value="entry">Entry Level</option>
            <option value="mid">Mid Level</option>
            <option value="senior">Senior</option>
            <option value="lead">Lead</option>
            <option value="executive">Executive</option>
          </select>
        </div>

        {/* Requirements */}
        <div>
          <label className="block text-sm text-gray-400 mb-1.5">Requirements</label>
          <div className="space-y-2">
            {form.requirements.map((req, i) => (
              <div key={i} className="flex gap-2">
                <input
                  type="text"
                  value={req}
                  onChange={(e) => updateRequirement(i, e.target.value)}
                  placeholder={`Requirement ${i + 1}`}
                  className="flex-1 bg-[#111] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0 transition-colors"
                />
                {form.requirements.length > 1 && (
                  <button type="button" onClick={() => removeRequirement(i)} className="text-gray-600 hover:text-red-400">
                    <Trash2 className="w-4 h-4" />
                  </button>
                )}
              </div>
            ))}
            <button
              type="button"
              onClick={addRequirement}
              className="flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300"
            >
              <Plus className="w-4 h-4" />
              Add requirement
            </button>
          </div>
        </div>

        {/* Submit */}
        <button
          type="submit"
          disabled={loading}
          className="w-full flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors text-sm"
        >
          {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <>Post Job <Briefcase className="w-4 h-4" /></>}
        </button>
      </form>

      <BottomNav variant="employer" />
    </div>
  );
}
