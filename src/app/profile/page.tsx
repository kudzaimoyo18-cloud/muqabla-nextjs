'use client';

import { useEffect, useState, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  Video, Upload, X, Loader2, Edit3, MapPin, Briefcase, Plus, Trash2,
  Check, Camera, LogOut, ChevronRight, Play, Settings,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import BottomNav from '@/components/layout/BottomNav';

export default function ProfilePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const isSetup = searchParams.get('setup') === 'true';
  const { user, profile, initialize, signOut } = useAuthStore();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editing, setEditing] = useState(isSetup);
  const [candidateData, setCandidateData] = useState<any>(null);

  const [form, setForm] = useState({
    full_name: '',
    skills: [''],
    experience_years: 0,
    location: '',
  });

  const [videoFile, setVideoFile] = useState<File | null>(null);
  const [videoPreview, setVideoPreview] = useState('');
  const [existingVideoUrl, setExistingVideoUrl] = useState('');
  const [uploadingVideo, setUploadingVideo] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => { initialize(); }, [initialize]);

  useEffect(() => {
    if (user) loadProfile();
  }, [user]);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const { data: userProfile } = await supabase
        .from('users')
        .select('*')
        .eq('id', user!.id)
        .single();

      if (userProfile) {
        setForm((prev) => ({ ...prev, full_name: userProfile.full_name || '' }));
      }

      if (profile?.user_type === 'candidate') {
        const { data: candidate } = await supabase
          .from('candidates')
          .select('*')
          .eq('user_id', user!.id)
          .single();

        if (candidate) {
          setCandidateData(candidate);
          setForm({
            full_name: userProfile?.full_name || '',
            skills: candidate.skills?.length ? candidate.skills : [''],
            experience_years: candidate.experience_years || 0,
            location: candidate.location || '',
          });
          if (candidate.video_url) setExistingVideoUrl(candidate.video_url);
        }
      }
    } catch (error) {
      console.error('Load profile error:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleVideoSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setVideoFile(file);
      setVideoPreview(URL.createObjectURL(file));
    }
  };

  const handleSave = async () => {
    if (!user) return;
    setSaving(true);

    try {
      // Update user name
      await supabase.from('users').update({ full_name: form.full_name }).eq('id', user.id);

      // Upload video if new one selected
      let videoUrl = existingVideoUrl;
      if (videoFile) {
        setUploadingVideo(true);
        const res = await fetch('/api/upload', { method: 'POST' });
        const { uploadUrl, videoId } = await res.json();
        if (uploadUrl) {
          const formData = new FormData();
          formData.append('file', videoFile);
          await fetch(uploadUrl, { method: 'POST', body: formData });
          videoUrl = videoId;
        }
        setUploadingVideo(false);
      }

      // Update candidate profile
      if (profile?.user_type === 'candidate') {
        const candidateUpdate = {
          skills: form.skills.filter(Boolean),
          experience_years: form.experience_years,
          location: form.location,
          video_url: videoUrl || null,
        };

        if (candidateData) {
          await supabase.from('candidates').update(candidateUpdate).eq('user_id', user.id);
        } else {
          await supabase.from('candidates').insert({ user_id: user.id, ...candidateUpdate });
        }
      }

      setEditing(false);
      await loadProfile();
    } catch (error) {
      console.error('Save profile error:', error);
    } finally {
      setSaving(false);
    }
  };

  const addSkill = () => setForm((p) => ({ ...p, skills: [...p.skills, ''] }));
  const updateSkill = (i: number, v: string) => {
    const s = [...form.skills]; s[i] = v;
    setForm((p) => ({ ...p, skills: s }));
  };
  const removeSkill = (i: number) => setForm((p) => ({ ...p, skills: p.skills.filter((_, idx) => idx !== i) }));

  const handleSignOut = async () => {
    await signOut();
    router.push('/');
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
      <div className="px-6 pt-6 pb-4 flex items-center justify-between">
        <h1 className="text-xl font-bold text-white">
          {isSetup ? 'Set Up Your Profile' : 'Profile'}
        </h1>
        <div className="flex items-center gap-2">
          {!editing && (
            <button onClick={() => setEditing(true)} className="p-2 text-gray-400 hover:text-white rounded-lg hover:bg-white/[0.04]">
              <Edit3 className="w-5 h-5" />
            </button>
          )}
          <button onClick={handleSignOut} className="p-2 text-gray-400 hover:text-red-400 rounded-lg hover:bg-white/[0.04]">
            <LogOut className="w-5 h-5" />
          </button>
        </div>
      </div>

      <div className="px-6 max-w-2xl mx-auto">
        {/* Avatar & Name */}
        <div className="flex items-center gap-4 mb-8">
          <div className="w-20 h-20 bg-emerald-500/10 rounded-full flex items-center justify-center">
            <span className="text-2xl font-bold text-emerald-400">
              {(form.full_name || 'U').charAt(0).toUpperCase()}
            </span>
          </div>
          <div>
            {editing ? (
              <input
                type="text"
                value={form.full_name}
                onChange={(e) => setForm((p) => ({ ...p, full_name: e.target.value }))}
                placeholder="Your name"
                className="bg-transparent text-xl font-semibold text-white border-b border-white/[0.1] focus:border-emerald-500/50 pb-1 outline-none w-full"
              />
            ) : (
              <h2 className="text-xl font-semibold text-white">{form.full_name || 'Your Name'}</h2>
            )}
            <p className="text-sm text-gray-500 mt-0.5">{user?.email}</p>
            <span className="text-xs text-emerald-400 capitalize mt-1 inline-block">{profile?.user_type}</span>
          </div>
        </div>

        {/* Video Intro Section */}
        {profile?.user_type === 'candidate' && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Video Introduction</h3>
            {isSetup && (
              <p className="text-xs text-gray-500 mb-3">
                Record a short video introducing yourself. This is your video resume — it applies to all jobs you swipe on.
              </p>
            )}

            {videoPreview ? (
              <div className="relative rounded-xl overflow-hidden bg-[#111] border border-white/[0.06]">
                <video src={videoPreview} className="w-full aspect-video object-cover" controls />
                {editing && (
                  <button
                    onClick={() => { setVideoFile(null); setVideoPreview(''); }}
                    className="absolute top-2 right-2 w-8 h-8 bg-black/60 rounded-full flex items-center justify-center"
                  >
                    <X className="w-4 h-4 text-white" />
                  </button>
                )}
              </div>
            ) : existingVideoUrl ? (
              <div className="relative rounded-xl overflow-hidden bg-[#111] border border-white/[0.06]">
                <div className="aspect-video bg-gradient-to-br from-emerald-900/20 to-gray-900 flex items-center justify-center">
                  <div className="text-center">
                    <Play className="w-10 h-10 text-emerald-400 mx-auto mb-2" />
                    <span className="text-sm text-gray-400">Video intro recorded</span>
                  </div>
                </div>
                {editing && (
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-3 right-3 flex items-center gap-1.5 px-3 py-1.5 bg-black/60 backdrop-blur-sm rounded-lg text-xs text-white"
                  >
                    <Camera className="w-3.5 h-3.5" />
                    Replace
                  </button>
                )}
              </div>
            ) : editing ? (
              <label className="flex flex-col items-center justify-center aspect-video bg-[#111] border border-dashed border-white/[0.1] rounded-xl cursor-pointer hover:border-emerald-500/30 transition-colors">
                <Upload className="w-8 h-8 text-gray-600 mb-2" />
                <span className="text-sm text-gray-500">Upload your video intro</span>
                <span className="text-xs text-gray-600 mt-1">This is your video resume for all applications</span>
                <input ref={fileInputRef} type="file" accept="video/*" onChange={handleVideoSelect} className="hidden" />
              </label>
            ) : (
              <div className="bg-[#111] border border-white/[0.06] rounded-xl p-6 text-center">
                <Video className="w-8 h-8 text-gray-600 mx-auto mb-2" />
                <p className="text-sm text-gray-500">No video intro yet</p>
                <button onClick={() => setEditing(true)} className="text-emerald-400 text-sm mt-2 hover:text-emerald-300">
                  Add one now
                </button>
              </div>
            )}
            <input ref={fileInputRef} type="file" accept="video/*" onChange={handleVideoSelect} className="hidden" />
          </div>
        )}

        {/* Skills */}
        {profile?.user_type === 'candidate' && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Skills</h3>
            {editing ? (
              <div className="space-y-2">
                {form.skills.map((skill, i) => (
                  <div key={i} className="flex gap-2">
                    <input
                      type="text"
                      value={skill}
                      onChange={(e) => updateSkill(i, e.target.value)}
                      placeholder={`Skill ${i + 1}`}
                      className="flex-1 bg-[#111] border border-white/[0.06] rounded-lg px-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0"
                    />
                    {form.skills.length > 1 && (
                      <button onClick={() => removeSkill(i)} className="text-gray-600 hover:text-red-400">
                        <Trash2 className="w-4 h-4" />
                      </button>
                    )}
                  </div>
                ))}
                <button onClick={addSkill} className="flex items-center gap-1.5 text-sm text-emerald-400 hover:text-emerald-300">
                  <Plus className="w-4 h-4" /> Add skill
                </button>
              </div>
            ) : (
              <div className="flex flex-wrap gap-2">
                {(candidateData?.skills || []).length > 0 ? (
                  (candidateData?.skills || []).map((skill: string) => (
                    <span key={skill} className="px-3 py-1.5 bg-[#111] border border-white/[0.06] rounded-lg text-sm text-gray-300">
                      {skill}
                    </span>
                  ))
                ) : (
                  <p className="text-sm text-gray-600">No skills added</p>
                )}
              </div>
            )}
          </div>
        )}

        {/* Experience */}
        {profile?.user_type === 'candidate' && (
          <div className="mb-6">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Experience</h3>
            {editing ? (
              <div className="flex items-center gap-3">
                <input
                  type="number"
                  value={form.experience_years}
                  onChange={(e) => setForm((p) => ({ ...p, experience_years: parseInt(e.target.value) || 0 }))}
                  min={0}
                  max={50}
                  className="w-20 bg-[#111] border border-white/[0.06] rounded-lg px-3 py-2.5 text-sm text-white text-center focus:border-emerald-500/50 focus:ring-0"
                />
                <span className="text-sm text-gray-400">years of experience</span>
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-300">
                <Briefcase className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{candidateData?.experience_years || 0} years</span>
              </div>
            )}
          </div>
        )}

        {/* Location */}
        {profile?.user_type === 'candidate' && (
          <div className="mb-8">
            <h3 className="text-sm font-medium text-gray-400 uppercase tracking-wider mb-3">Location</h3>
            {editing ? (
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
                <input
                  type="text"
                  value={form.location}
                  onChange={(e) => setForm((p) => ({ ...p, location: e.target.value }))}
                  placeholder="e.g. Dubai, UAE"
                  className="w-full bg-[#111] border border-white/[0.06] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0"
                />
              </div>
            ) : (
              <div className="flex items-center gap-2 text-gray-300">
                <MapPin className="w-4 h-4 text-gray-500" />
                <span className="text-sm">{candidateData?.location || 'Not set'}</span>
              </div>
            )}
          </div>
        )}

        {/* Save / Cancel */}
        {editing && (
          <div className="flex gap-3">
            <button
              onClick={handleSave}
              disabled={saving}
              className="flex-1 flex items-center justify-center gap-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-50 text-white font-medium py-3 rounded-lg transition-colors text-sm"
            >
              {saving ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  {uploadingVideo ? 'Uploading video...' : 'Saving...'}
                </>
              ) : (
                <>
                  <Check className="w-4 h-4" />
                  Save Profile
                </>
              )}
            </button>
            {!isSetup && (
              <button
                onClick={() => { setEditing(false); loadProfile(); }}
                className="px-6 py-3 border border-white/[0.06] text-gray-400 hover:text-white rounded-lg transition-colors text-sm"
              >
                Cancel
              </button>
            )}
          </div>
        )}
      </div>

      <BottomNav variant={profile?.user_type === 'employer' ? 'employer' : 'candidate'} />
    </div>
  );
}
