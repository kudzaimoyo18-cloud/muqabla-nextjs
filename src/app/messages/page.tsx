'use client';

import { useState } from 'react';
import BottomNav from '@/components/layout/BottomNav';
import Avatar from '@/components/ui/Avatar';
import AIBadge from '@/components/ui/AIBadge';
import Input from '@/components/ui/Input';
import { Search, MoreVertical, Send, Lightbulb, ArrowRight, Bot } from 'lucide-react';
import { formatDate } from '@/lib/utils';
import type { Conversation, Message } from '@/types';

export default function MessagesPage() {
  const [conversations] = useState<Conversation[]>([
    {
      id: '1',
      application_id: 'app1',
      last_message: {
        id: 'msg1',
        conversation_id: '1',
        sender_id: 'employer1',
        content: 'Thank you for applying! We reviewed your video profile and are impressed.',
        is_read: true,
        created_at: new Date(Date.now() - 5 * 60 * 1000).toISOString(),
      },
      unread_count: 0,
      created_at: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
    },
    {
      id: '2',
      application_id: 'app2',
      last_message: {
        id: 'msg2',
        conversation_id: '2',
        sender_id: 'employer2',
        content: "Your AI match score was excellent! We'd love to schedule an interview.",
        is_read: false,
        created_at: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      },
      unread_count: 1,
      created_at: new Date(Date.now() - 3 * 60 * 60 * 1000).toISOString(),
    },
  ]);

  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(null);
  const [messageText, setMessageText] = useState('');

  const handleSendMessage = () => {
    if (messageText.trim()) {
      // In production, send message to backend
      console.log('Sending message:', messageText);
      setMessageText('');
    }
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {selectedConversation ? (
        <>
          {/* Chat View */}
          <div className="h-screen flex flex-col">
            {/* Chat Header */}
            <div className="sticky top-0 bg-white border-b border-border p-4">
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setSelectedConversation(null)}
                  className="p-2 -ml-2 rounded-full hover:bg-surface-secondary"
                >
                  <ArrowRight className="w-5 h-5 rotate-180" />
                </button>
                <div className="flex-1">
                  <h2 className="text-base font-semibold text-text">
                    TechCorp HR
                  </h2>
                  <p className="text-xs text-text-secondary">Senior Developer Role</p>
                </div>
                <button className="p-2 rounded-full hover:bg-surface-secondary">
                  <MoreVertical className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* AI Suggestion */}
            <div className="mx-4 mt-4">
              <div className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-xl p-3 border border-purple-100">
                <div className="flex items-center gap-2 mb-2">
                  <Bot className="w-4 h-4 text-purple-600" />
                  <span className="text-xs font-semibold text-text">
                    AI Reply Suggestion
                  </span>
                  <AIBadge variant="icon" size="small" />
                </div>
                <p className="text-xs text-text-secondary mb-2">
                  Based on conversation, here are some suggested responses:
                </p>
                <div className="space-y-1.5">
                  <button className="w-full text-left px-3 py-2 bg-white rounded-lg text-xs text-text hover:border hover:border-purple-200 transition-all">
                    "Thank you for reviewing my application! I'm excited about this opportunity."
                  </button>
                  <button className="w-full text-left px-3 py-2 bg-white rounded-lg text-xs text-text hover:border hover:border-purple-200 transition-all">
                    "I'd be happy to schedule an interview at your convenience."
                  </button>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {/* Received Message */}
              <div className="flex gap-2">
                <Avatar
                  initials="TC"
                  size="medium"
                  className="flex-shrink-0"
                />
                <div className="max-w-[70%]">
                  <div className="bg-surface-secondary rounded-2xl rounded-tl-sm px-4 py-2">
                    <p className="text-sm text-text">
                      Thank you for applying! We reviewed your video profile and are impressed with your technical skills.
                    </p>
                  </div>
                  <p className="text-xs text-text-tertiary mt-1 ml-1">
                    10:30 AM
                  </p>
                </div>
              </div>

              {/* Sent Message */}
              <div className="flex gap-2 justify-end">
                <div className="max-w-[70%]">
                  <div className="bg-primary rounded-2xl rounded-tr-sm px-4 py-2">
                    <p className="text-sm text-white">
                      Thank you! I'm very interested in this position and would love to learn more.
                    </p>
                  </div>
                  <p className="text-xs text-text-tertiary mt-1 mr-1 text-right">
                    10:35 AM
                  </p>
                </div>
              </div>

              {/* Received Message */}
              <div className="flex gap-2">
                <Avatar
                  initials="TC"
                  size="medium"
                  className="flex-shrink-0"
                />
                <div className="max-w-[70%]">
                  <div className="bg-surface-secondary rounded-2xl rounded-tl-sm px-4 py-2">
                    <p className="text-sm text-text">
                      Great! Your AI match score was excellent (95%). We'd love to schedule an interview this week. What times work for you?
                    </p>
                  </div>
                  <p className="text-xs text-text-tertiary mt-1 ml-1">
                    10:40 AM
                  </p>
                </div>
              </div>
            </div>

            {/* Message Input */}
            <div className="sticky bottom-0 bg-white border-t border-border p-4">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Type a message..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') handleSendMessage();
                    }}
                  />
                </div>
                <button
                  onClick={handleSendMessage}
                  disabled={!messageText.trim()}
                  className="p-3 rounded-full bg-primary text-white disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary-dark transition-colors"
                >
                  <Send className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </>
      ) : (
        <>
          {/* Conversations List */}
          <div className="sticky top-0 bg-white/95 backdrop-blur-sm border-b border-border z-40">
            <div className="p-4">
              <h1 className="text-xl font-bold text-text mb-3">Messages</h1>
              <Input
                placeholder="Search conversations..."
                leftIcon={<Search className="w-5 h-5" />}
              />
            </div>
          </div>

          <div className="p-4">
            {conversations.length === 0 ? (
              <div className="bg-white rounded-xl p-6 text-center border border-border">
                <Bot className="w-12 h-12 text-text-tertiary mx-auto mb-3" />
                <h3 className="text-sm font-semibold text-text mb-1">
                  No Messages Yet
                </h3>
                <p className="text-xs text-text-secondary">
                  Start applying to jobs to start conversations
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {conversations.map((conversation) => (
                  <button
                    key={conversation.id}
                    onClick={() => setSelectedConversation(conversation)}
                    className="w-full bg-white rounded-xl p-4 border border-border hover:border-primary hover:shadow-md transition-all text-left"
                  >
                    <div className="flex items-start gap-3">
                      <div className="relative">
                        <Avatar
                          initials="TC"
                          size="large"
                        />
                        {conversation.unread_count > 0 && (
                          <div className="absolute -top-1 -right-1 w-5 h-5 rounded-full bg-primary flex items-center justify-center">
                            <span className="text-xs text-white font-semibold">
                              {conversation.unread_count}
                            </span>
                          </div>
                        )}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-start justify-between gap-2 mb-1">
                          <div className="flex-1">
                            <h3 className="text-sm font-semibold text-text">
                              TechCorp HR
                            </h3>
                            <p className="text-xs text-text-secondary">
                              Senior Developer • Dubai
                            </p>
                          </div>
                          <span className="text-xs text-text-tertiary whitespace-nowrap">
                            {formatDate(conversation.last_message?.created_at || conversation.created_at)}
                          </span>
                        </div>

                        <p className="text-sm text-text-secondary truncate">
                          {conversation.last_message?.content}
                        </p>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </>
      )}

      {/* Bottom Navigation */}
      {!selectedConversation && <BottomNav />}
    </div>
  );
}
