'use client';

import { useState, useEffect } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import Button from '@/components/ui/Button';
import AIBadge from '@/components/ui/AIBadge';
import Avatar from '@/components/ui/Avatar';
import { usePathname } from 'next/navigation';
import { getUserProfile, getCandidateProfile } from '@/lib/supabase';
import { generateProfileSummary } from '@/lib/ai';
import type { User, CandidateProfile } from '@/types';
import {
  MapPin,
  Briefcase,
  Calendar,
  Mail,
  Phone,
  Link as LinkIcon,
  Edit2,
  Play,
  Sparkles,
  TrendingUp,
  Award,
  Users,
  Video,
  CheckCircle2,
} from 'lucide-react';

export default function ProfilePage() {
  const pathname = usePathname();
  const userId = pathname.split('/').pop();

  const [user, setUser] = useState<User | null>(null);
  const [candidate, setCandidate] = useState<CandidateProfile | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showAISummary, setShowAISummary] = useState(true);

  useEffect(() => {
    if (userId) {
      loadProfile();
    }
  }, [userId]);

  const loadProfile = async () => {
    setIsLoading(true);
    try {
      const { data: userData } = await getUserProfile(userId!);
      if (userData) {
        setUser(userData as User);
        // Load candidate profile if user is a candidate
        if (userData.type === 'candidate') {
          const { data: candidateData } = await getCandidateProfile(userId!);
          setCandidate(candidateData as CandidateProfile);
        }
      }
    } catch (error) {
      console.error('Error loading profile:', error);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading || !user) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center pt-20">
          <div className="animate-spin rounded-full h-10 w-10 border-b-2 border-primary"></div>
        </div>
      </div>
    );
  }

  const isOwnProfile = userId === 'me'; // In production, check against current user ID
  const isCandidate = user.type === 'candidate';

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Profile Header */}
      <div className="bg-white border-b border-border">
        {/* Cover Image */}
        <div className="h-32 bg-gradient-to-br from-primary to-primary-light" />

        {/* Profile Info */}
        <div className="px-4 pb-4 -mt-12">
          <div className="flex items-end gap-4">
            <Avatar
              src={user.avatar_url}
              alt={user.full_name}
              initials={user.full_name.split(' ').map(n => n[0]).join('').slice(0, 2)}
              size="xlarge"
              className="border-4 border-white"
            />
            <div className="flex-1 mb-2">
              {isOwnProfile && (
                <Button size="small" variant="outline">
                  <Edit2 className="w-4 h-4 mr-2" />
                  Edit
                </Button>
              )}
            </div>
          </div>

          <div className="mt-3">
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-text">{user.full_name}</h1>
              {user.is_verified && (
                <CheckCircle2 className="w-5 h-5 text-verified" />
              )}
            </div>
            {candidate?.headline && (
              <p className="text-sm text-text-secondary mt-1">
                {candidate.headline}
              </p>
            )}
          </div>

          {/* Quick Stats */}
          <div className="flex gap-4 mt-4">
            <div className="text-center">
              <p className="text-lg font-semibold text-text">
                {candidate?.profile_views || 0}
              </p>
              <p className="text-xs text-text-secondary">Profile Views</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-semibold text-text">
                {candidate?.applications_count || 0}
              </p>
              <p className="text-xs text-text-secondary">Applications</p>
            </div>
            {candidate?.years_experience && (
              <div className="text-center">
                <p className="text-lg font-semibold text-text">
                  {candidate.years_experience}
                </p>
                <p className="text-xs text-text-secondary">Years Exp</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* AI Generated Summary */}
        {isCandidate && showAISummary && (
          <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-xl p-4 border border-purple-100">
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-purple-600" />
                <h2 className="text-sm font-semibold text-text">
                  AI Profile Summary
                </h2>
                <AIBadge variant="icon" size="small" />
              </div>
              <button
                onClick={() => setShowAISummary(false)}
                className="text-text-secondary hover:text-text"
              >
                ✕
              </button>
            </div>
            <p className="text-sm text-text-secondary mb-3">
              {candidate?.ai_summary ||
                'Experienced professional with strong technical skills and a passion for innovation. Proven track record of delivering high-quality work and collaborating effectively with teams.'}
            </p>
            <div className="flex flex-wrap gap-2">
              <span className="px-3 py-1.5 bg-white rounded-lg text-xs text-purple-700 border border-purple-200">
                Technical Expertise
              </span>
              <span className="px-3 py-1.5 bg-white rounded-lg text-xs text-purple-700 border border-purple-200">
                Strong Communication
              </span>
              <span className="px-3 py-1.5 bg-white rounded-lg text-xs text-purple-700 border border-purple-200">
                Team Player
              </span>
            </div>
          </div>
        )}

        {/* Contact Info */}
        <div className="bg-white rounded-xl p-4 border border-border">
          <h2 className="text-base font-semibold text-text mb-3">Contact</h2>
          <div className="space-y-3">
            {user.email && (
              <div className="flex items-center gap-3">
                <Mail className="w-5 h-5 text-text-secondary" />
                <span className="text-sm text-text">{user.email}</span>
              </div>
            )}
            {user.phone && (
              <div className="flex items-center gap-3">
                <Phone className="w-5 h-5 text-text-secondary" />
                <span className="text-sm text-text">{user.phone}</span>
              </div>
            )}
            {candidate && (
              <>
                {candidate.city && (
                  <div className="flex items-center gap-3">
                    <MapPin className="w-5 h-5 text-text-secondary" />
                    <span className="text-sm text-text">
                      {candidate.city}, {candidate.country}
                    </span>
                  </div>
                )}
                {candidate.current_company && (
                  <div className="flex items-center gap-3">
                    <Briefcase className="w-5 h-5 text-text-secondary" />
                    <span className="text-sm text-text">
                      {candidate.current_company}
                    </span>
                  </div>
                )}
              </>
            )}
          </div>
        </div>

        {/* Skills Section */}
        {isCandidate && candidate?.ai_extracted_skills && candidate.ai_extracted_skills.length > 0 && (
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="flex items-center gap-2 mb-3">
              <Award className="w-5 h-5 text-primary" />
              <h2 className="text-base font-semibold text-text">Skills</h2>
              <AIBadge variant="tag" size="small" label="AI Extracted" />
            </div>
            <div className="flex flex-wrap gap-2">
              {candidate.ai_extracted_skills.map((skill, index) => (
                <span
                  key={index}
                  className="px-3 py-1.5 bg-surface-secondary rounded-lg text-sm text-text"
                >
                  {skill}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Video Portfolio */}
        {isCandidate && (
          <div className="bg-white rounded-xl p-4 border border-border">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                <Video className="w-5 h-5 text-primary" />
                <h2 className="text-base font-semibold text-text">Video Portfolio</h2>
              </div>
              {isOwnProfile && (
                <Button size="small" variant="outline">
                  <Play className="w-4 h-4 mr-2" />
                  Add Video
                </Button>
              )}
            </div>

            {candidate?.profile_video_id ? (
              <div className="relative aspect-video bg-surface-secondary rounded-lg flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-purple-500/20" />
                <div className="relative z-10 flex items-center gap-3">
                  <div className="w-16 h-16 rounded-full bg-white/90 flex items-center justify-center">
                    <Play className="w-8 h-8 text-primary ml-1" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-text">
                      Profile Introduction
                    </p>
                    <p className="text-xs text-text-secondary">60 seconds</p>
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-8">
                <Video className="w-12 h-12 text-text-tertiary mx-auto mb-2" />
                <p className="text-sm text-text-secondary">
                  No video yet. Add a video to showcase your personality!
                </p>
              </div>
            )}
          </div>
        )}

        {/* Action Buttons */}
        {!isOwnProfile && (
          <div className="flex gap-3">
            <Button variant="outline" className="flex-1">
              <Users className="w-5 h-5 mr-2" />
              Connect
            </Button>
            <Button className="flex-1">
              <Mail className="w-5 h-5 mr-2" />
              Message
            </Button>
          </div>
        )}

        {/* Last Updated */}
        <div className="text-center py-4">
          <p className="text-xs text-text-tertiary">
            Profile updated {new Date(user.updated_at).toLocaleDateString()}
          </p>
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
