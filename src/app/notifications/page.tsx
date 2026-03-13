'use client';

import { useState } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import Avatar from '@/components/ui/Avatar';
import AIBadge from '@/components/ui/AIBadge';
import { Sparkles, Briefcase, User, MessageSquare, CheckCircle2, TrendingUp, ArrowRight, Bell } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Notification } from '@/types';

export default function NotificationsPage() {
  const [notifications] = useState<Notification[]>([
    {
      id: '1',
      user_id: 'user1',
      type: 'match',
      title: 'New Job Match!',
      message: 'A new job matches your profile with 95% similarity',
      is_read: false,
      created_at: new Date(Date.now() - 2 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      user_id: 'user1',
      type: 'job_recommended',
      title: 'AI Recommendation',
      message: 'Based on your skills, we found 5 jobs that might interest you',
      is_read: false,
      created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
    },
    {
      id: '3',
      user_id: 'user1',
      type: 'application_viewed',
      title: 'Application Viewed',
      message: 'TechCorp has viewed your application for Senior Developer',
      is_read: true,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '4',
      user_id: 'user1',
      type: 'ai_insight',
      title: 'Profile Strength Update',
      message: 'Your profile strength increased by 15% after adding your video',
      is_read: true,
      created_at: new Date(Date.now() - 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'match':
        return <TrendingUp className="w-5 h-5" />;
      case 'job_recommended':
        return <Sparkles className="w-5 h-5" />;
      case 'application_viewed':
        return <Briefcase className="w-5 h-5" />;
      case 'interview_invitation':
        return <MessageSquare className="w-5 h-5" />;
      case 'connection_request':
        return <User className="w-5 h-5" />;
      default:
        return <Bell className="w-5 h-5" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'match':
        return 'bg-gradient-to-br from-green-500 to-emerald-500';
      case 'job_recommended':
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
      case 'application_viewed':
        return 'bg-gradient-to-br from-blue-500 to-cyan-500';
      case 'ai_insight':
        return 'bg-gradient-to-br from-purple-500 to-pink-500';
      default:
        return 'bg-gradient-to-br from-primary to-primary-light';
    }
  };

  const unreadCount = notifications.filter(n => !n.is_read).length;

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-40">
        <div className="p-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-xl font-bold text-text">Notifications</h1>
              {unreadCount > 0 && (
                <p className="text-sm text-text-secondary">
                  {unreadCount} new notifications
                </p>
              )}
            </div>
            {unreadCount > 0 && (
              <button className="text-sm text-primary font-medium">
                Mark all read
              </button>
            )}
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="p-4">
        {notifications.length === 0 ? (
          <div className="bg-white rounded-xl p-6 text-center border border-border">
            <Bell className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
            <h3 className="text-sm font-semibold text-text mb-1">
              No Notifications
            </h3>
            <p className="text-xs text-text-secondary">
              You're all caught up!
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {notifications.map((notification) => (
              <div
                key={notification.id}
                className={`bg-white rounded-xl p-4 border transition-all ${
                  !notification.is_read ? 'border-primary shadow-sm' : 'border-border'
                }`}
              >
                <div className="flex items-start gap-3">
                  {/* Icon */}
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${getNotificationColor(
                      notification.type
                    )}`}
                  >
                    {getNotificationIcon(notification.type)}
                  </div>

                  {/* Content */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-text">
                            {notification.title}
                          </h3>
                          {notification.type === 'job_recommended' && (
                            <AIBadge variant="icon" size="small" />
                          )}
                        </div>
                        <p className="text-sm text-text-secondary mb-2">
                          {notification.message}
                        </p>
                      </div>
                      {!notification.is_read && (
                        <div className="w-2 h-2 rounded-full bg-primary flex-shrink-0 mt-2" />
                      )}
                    </div>

                    {/* Action Button */}
                    <button className="flex items-center gap-1 text-sm text-primary font-medium mt-2">
                      View
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    {/* Timestamp */}
                    <p className="text-xs text-text-tertiary mt-2">
                      {formatDate(notification.created_at)}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
