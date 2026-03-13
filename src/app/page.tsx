import Link from 'next/link';
import Button from '@/components/ui/Button';
import Logo from '@/components/Logo';
import { ArrowRight, Sparkles, Video, Target, Zap } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 to-purple-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <div className="flex justify-center mb-6">
            <Logo variant="large" />
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-text mb-4">
            Video-First Interviews
            <br />
            <span className="text-primary">Powered by AI</span>
          </h1>
          <p className="text-lg text-text-secondary max-w-2xl mx-auto">
            Find your dream job in the GCC with intelligent matching, video profiles,
            and AI-powered insights. Like Instagram for jobs, with LinkedIn professionalism.
          </p>
        </div>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
          <Link href="/auth/login" className="w-full sm:w-auto">
            <Button size="large" fullWidth>
              Get Started Free
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
          <Link href="/jobs" className="w-full sm:w-auto">
            <Button variant="outline" size="large" fullWidth>
              Browse Jobs
            </Button>
          </Link>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Feature 1: AI Matching */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-text mb-2">
              AI-Powered Matching
            </h3>
            <p className="text-text-secondary">
              Our AI analyzes your skills and experience to find jobs that match you
              perfectly. Get match scores up to 98% accuracy.
            </p>
          </div>

          {/* Feature 2: Video Profiles */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center mb-4">
              <Video className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-text mb-2">
              Video-First Profiles
            </h3>
            <p className="text-text-secondary">
              Showcase your personality and skills with video introductions. Let employers
              see the real you, not just a resume.
            </p>
          </div>

          {/* Feature 3: Smart Discovery */}
          <div className="bg-white rounded-2xl p-6 shadow-sm border border-border">
            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-accent to-accent-light flex items-center justify-center mb-4">
              <Target className="w-6 h-6 text-white" />
            </div>
            <h3 className="text-xl font-semibold text-text mb-2">
              Smart Job Discovery
            </h3>
            <p className="text-text-secondary">
              Swipe through jobs like Instagram. Get AI-recommended opportunities
              tailored to your unique profile.
            </p>
          </div>
        </div>

        {/* Stats Section */}
        <div className="mt-16 text-center">
          <h2 className="text-3xl font-bold text-text mb-8">
            Trusted by 10,000+ Professionals
          </h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            <div>
              <div className="text-3xl font-bold text-primary">5K+</div>
              <div className="text-sm text-text-secondary">Jobs Posted</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">3K+</div>
              <div className="text-sm text-text-secondary">Companies</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">10K+</div>
              <div className="text-sm text-text-secondary">Candidates</div>
            </div>
            <div>
              <div className="text-3xl font-bold text-primary">98%</div>
              <div className="text-sm text-text-secondary">Match Accuracy</div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mt-16 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-text mb-8 text-center">
            How It Works
          </h2>
          <div className="space-y-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                1
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-1">
                  Create Your Video Profile
                </h3>
                <p className="text-text-secondary">
                  Record a 60-second intro video. AI will analyze and extract your
                  skills automatically.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                2
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-1">
                  Get AI-Matched Jobs
                </h3>
                <p className="text-text-secondary">
                  Browse jobs with match scores. See why each job is a fit for you.
                </p>
              </div>
            </div>

            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 w-10 h-10 rounded-full bg-primary text-white flex items-center justify-center font-bold">
                3
              </div>
              <div>
                <h3 className="text-lg font-semibold text-text mb-1">
                  Apply & Get Hired
                </h3>
                <p className="text-text-secondary">
                  Send video applications, chat with employers, and land your dream job.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Final CTA */}
        <div className="mt-16 text-center">
          <div className="bg-gradient-to-r from-purple-600 to-pink-600 rounded-2xl p-8 md:p-12">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-4">
              Ready to Find Your Dream Job?
            </h2>
            <p className="text-white/90 mb-6 text-lg">
              Join thousands of professionals already using Muqabla
            </p>
            <Link href="/auth/login">
              <Button size="large" variant="secondary" fullWidth>
                Get Started Now
                <Zap className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
