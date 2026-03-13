'use client';

import { useState } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import Avatar from '@/components/ui/Avatar';
import AIBadge from '@/components/ui/AIBadge';
import Button from '@/components/ui/Button';
import { Search, UserPlus, CheckCircle2, Users, Sparkles, TrendingUp } from 'lucide-react';
import type { Connection } from '@/types';

export default function ConnectionsPage() {
  const [connections] = useState<Connection[]>([
    {
      id: '1',
      user_id: 'user1',
      connected_user_id: 'user2',
      status: 'accepted',
      created_at: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      user_id: 'user1',
      connected_user_id: 'user3',
      status: 'pending',
      created_at: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const [suggestedUsers] = useState([
    {
      id: 'sug1',
      name: 'Sarah Johnson',
      title: 'Senior Product Manager',
      company: 'InnovateTech',
      matchScore: 92,
      mutualConnections: 12,
    },
    {
      id: 'sug2',
      name: 'Ahmed Hassan',
      title: 'Full Stack Developer',
      company: 'Digital Solutions',
      matchScore: 88,
      mutualConnections: 8,
    },
    {
      id: 'sug3',
      name: 'Priya Sharma',
      title: 'UX Designer',
      company: 'Creative Studio',
      matchScore: 85,
      mutualConnections: 5,
    },
  ]);

  const acceptedConnections = connections.filter(c => c.status === 'accepted');
  const pendingConnections = connections.filter(c => c.status === 'pending');

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-40">
        <div className="p-4">
          <h1 className="text-xl font-bold text-text mb-3">Network</h1>
          <div className="flex items-center gap-2 bg-surface-secondary px-4 py-2.5 rounded-lg">
            <Search className="w-5 h-5 text-text-secondary" />
            <input
              type="text"
              placeholder="Search connections..."
              className="flex-1 bg-transparent outline-none text-sm text-text placeholder:text-text-tertiary"
            />
          </div>
        </div>
      </div>

      <div className="p-4 space-y-6">
        {/* AI Suggested Connections */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Sparkles className="w-5 h-5 text-purple-600" />
              <h2 className="text-base font-semibold text-text">
                AI Suggested
              </h2>
              <AIBadge variant="icon" size="small" />
            </div>
            <button className="text-sm text-primary font-medium">
              View All
            </button>
          </div>

          <div className="space-y-3">
            {suggestedUsers.map((user) => (
              <div
                key={user.id}
                className="bg-white rounded-xl p-4 border border-border hover:border-primary hover:shadow-md transition-all"
              >
                <div className="flex items-start gap-3">
                  <Avatar
                    initials={user.name.split(' ').map(n => n[0]).join('').slice(0, 2)}
                    size="large"
                  />

                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h3 className="text-sm font-semibold text-text">
                            {user.name}
                          </h3>
                          <span className="px-2 py-0.5 rounded-full bg-purple-100 text-purple-700 text-xs font-medium">
                            {user.matchScore}% Match
                          </span>
                        </div>
                        <p className="text-xs text-text-secondary mb-1">
                          {user.title} at {user.company}
                        </p>
                        <div className="flex items-center gap-1 text-xs text-text-secondary">
                          <Users className="w-3 h-3" />
                          <span>{user.mutualConnections} mutual connections</span>
                        </div>
                      </div>

                      <Button size="small">
                        <UserPlus className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pending Requests */}
        {pendingConnections.length > 0 && (
          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-base font-semibold text-text">
                Pending Requests ({pendingConnections.length})
              </h2>
            </div>

            <div className="space-y-3">
              {pendingConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="bg-white rounded-xl p-4 border border-border"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Avatar
                        initials="JD"
                        size="large"
                      />
                      <div>
                        <h3 className="text-sm font-semibold text-text">
                          John Doe
                        </h3>
                        <p className="text-xs text-text-secondary">
                          Software Engineer
                        </p>
                      </div>
                    </div>

                    <div className="flex gap-2">
                      <Button size="small" variant="outline">
                        Ignore
                      </Button>
                      <Button size="small">
                        <CheckCircle2 className="w-4 h-4 mr-1" />
                        Accept
                      </Button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Your Connections */}
        <div>
          <div className="flex items-center justify-between mb-3">
            <h2 className="text-base font-semibold text-text">
              Your Connections ({acceptedConnections.length})
            </h2>
            {acceptedConnections.length > 0 && (
              <button className="text-sm text-primary font-medium">
                View All
              </button>
            )}
          </div>

          {acceptedConnections.length === 0 ? (
            <div className="bg-white rounded-xl p-6 text-center border border-border">
              <Users className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
              <h3 className="text-sm font-semibold text-text mb-1">
                No Connections Yet
              </h3>
              <p className="text-xs text-text-secondary mb-4">
                Start connecting with professionals in your industry
              </p>
              <Button variant="outline" size="small" fullWidth>
                <TrendingUp className="w-4 h-4 mr-2" />
                Find People
              </Button>
            </div>
          ) : (
            <div className="grid grid-cols-2 gap-3">
              {acceptedConnections.map((connection) => (
                <div
                  key={connection.id}
                  className="bg-white rounded-xl p-4 border border-border hover:border-primary hover:shadow-md transition-all"
                >
                  <div className="flex flex-col items-center text-center">
                    <Avatar
                      initials="JD"
                      size="xlarge"
                      className="mb-2"
                    />
                    <h3 className="text-sm font-semibold text-text">
                      John Doe
                    </h3>
                    <p className="text-xs text-text-secondary mb-2">
                      Software Engineer
                    </p>
                    <Button size="small" variant="ghost" fullWidth>
                      View Profile
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Bottom Navigation */}
      <BottomNav />
    </div>
  );
}
