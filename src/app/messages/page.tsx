'use client';

import { useEffect, useState } from 'react';
import { MessageSquare, Search, Loader2 } from 'lucide-react';
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/auth-store';
import BottomNav from '@/components/layout/BottomNav';

interface Conversation {
  id: string;
  other_user_name: string;
  last_message: string;
  last_message_at: string;
  unread: boolean;
}

function timeAgo(dateStr: string) {
  const diff = Date.now() - new Date(dateStr).getTime();
  const mins = Math.floor(diff / 60000);
  if (mins < 60) return `${mins}m`;
  const hrs = Math.floor(mins / 60);
  if (hrs < 24) return `${hrs}h`;
  const days = Math.floor(hrs / 24);
  return `${days}d`;
}

export default function MessagesPage() {
  const { user, profile, initialize } = useAuthStore();
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => { initialize(); }, [initialize]);

  useEffect(() => {
    if (user) loadConversations();
  }, [user]);

  const loadConversations = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('conversations')
        .select('*')
        .or(`user1_id.eq.${user!.id},user2_id.eq.${user!.id}`)
        .order('updated_at', { ascending: false });

      if (error) throw error;

      const formatted: Conversation[] = (data || []).map((conv: any) => ({
        id: conv.id,
        other_user_name: conv.user1_id === user!.id ? 'User' : 'User',
        last_message: conv.last_message || 'No messages yet',
        last_message_at: conv.updated_at || conv.created_at,
        unread: false,
      }));

      setConversations(formatted);
    } catch (error) {
      console.error('Load conversations error:', error);
    } finally {
      setLoading(false);
    }
  };

  const filtered = conversations.filter((c) =>
    c.other_user_name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-[#0a0a0a] pb-24">
      <div className="sticky top-0 z-40 bg-[#0a0a0a]/95 backdrop-blur-xl border-b border-white/[0.06] px-6 py-4">
        <h1 className="text-lg font-semibold text-white mb-3">Messages</h1>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search conversations..."
            className="w-full bg-[#111] border border-white/[0.06] rounded-lg pl-10 pr-4 py-2.5 text-sm text-white placeholder-gray-600 focus:border-emerald-500/50 focus:ring-0"
          />
        </div>
      </div>

      <div className="px-6 py-4">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-6 h-6 animate-spin text-emerald-400" />
          </div>
        ) : filtered.length === 0 ? (
          <div className="text-center py-20">
            <MessageSquare className="w-10 h-10 text-gray-600 mx-auto mb-3" />
            <h2 className="text-lg font-semibold text-white mb-1">No messages yet</h2>
            <p className="text-sm text-gray-500">
              {profile?.user_type === 'candidate'
                ? 'Messages from employers will appear here'
                : 'Start conversations with candidates'}
            </p>
          </div>
        ) : (
          <div className="space-y-1">
            {filtered.map((conv) => (
              <button
                key={conv.id}
                className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-white/[0.02] transition-colors text-left"
              >
                <div className="w-11 h-11 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
                  <span className="text-sm font-bold text-emerald-400">{conv.other_user_name.charAt(0)}</span>
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-medium ${conv.unread ? 'text-white' : 'text-gray-300'}`}>{conv.other_user_name}</span>
                    <span className="text-xs text-gray-600">{timeAgo(conv.last_message_at)}</span>
                  </div>
                  <p className={`text-xs truncate mt-0.5 ${conv.unread ? 'text-gray-300' : 'text-gray-500'}`}>{conv.last_message}</p>
                </div>
                {conv.unread && <div className="w-2 h-2 bg-emerald-400 rounded-full shrink-0" />}
              </button>
            ))}
          </div>
        )}
      </div>

      <BottomNav variant={profile?.user_type === 'employer' ? 'employer' : 'candidate'} />
    </div>
  );
}
