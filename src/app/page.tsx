import Link from 'next/link';
import {
  Video,
  Sparkles,
  BarChart3,
  ArrowRight,
  Zap,
  Users,
  Shield,
  Star,
} from 'lucide-react';

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white">
      {/* Navigation */}
      <nav className="border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl sticky top-0 z-50">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
              <Video className="w-4 h-4 text-white" />
            </div>
            <span className="text-[17px] font-semibold tracking-tight">Muqabla</span>
          </div>
          <Link
            href="/auth/signup"
            className="text-emerald-400 hover:text-emerald-300 text-sm font-medium transition-colors"
          >
            Get Early Access
          </Link>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative px-6 pt-20 pb-28 max-w-7xl mx-auto">
        {/* Background glow */}
        <div className="absolute -top-20 -left-32 w-[600px] h-[600px] bg-emerald-500/8 rounded-full blur-[150px] pointer-events-none" />

        <div className="relative max-w-3xl">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-500/10 border border-emerald-500/20 rounded-full text-emerald-400 text-sm font-medium mb-8">
            <Star className="w-3.5 h-3.5 fill-emerald-400" />
            EARLY ACCESS OPEN
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-[1.08] tracking-tight mb-6">
            AI-Powered{' '}
            <span className="text-emerald-400">Video</span>
            <br />
            <span className="text-emerald-400">Interviews</span> for
            <br />
            Modern Hiring
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg leading-relaxed max-w-xl mb-10">
            Screen candidates faster with AI-driven video assessments. Save time, reduce bias, and find the right talent — effortlessly.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-wrap gap-4 mb-16">
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-2 px-7 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors text-sm"
            >
              Get Started Free
              <ArrowRight className="w-4 h-4" />
            </Link>
            <Link
              href="#how-it-works"
              className="inline-flex items-center gap-2 px-7 py-3 border border-gray-700 hover:border-gray-500 text-gray-300 hover:text-white rounded-lg font-medium transition-colors text-sm"
            >
              See How It Works
            </Link>
          </div>

          {/* Stats Row */}
          <div className="flex flex-wrap gap-10 sm:gap-14">
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400">3x</div>
              <div className="text-sm text-gray-500 mt-1">Faster Screening</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-emerald-400">85%</div>
              <div className="text-sm text-gray-500 mt-1">Time Saved</div>
            </div>
            <div>
              <div className="text-3xl sm:text-4xl font-bold text-white">Zero</div>
              <div className="text-sm text-gray-500 mt-1">Scheduling Hassle</div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/[0.06] mx-6" />

      {/* How It Works */}
      <section id="how-it-works" className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <div className="text-emerald-400 text-sm font-medium tracking-widest uppercase mb-4">
            HOW IT WORKS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
            Hire smarter in three steps
          </h2>
        </div>

        <div className="grid md:grid-cols-3 gap-6">
          {/* Step 1 */}
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.1] transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Video className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xs text-gray-600 font-mono tracking-wider">01</span>
            </div>
            <h3 className="text-lg font-semibold mb-3">Create Video Questions</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Set up custom interview questions tailored to your roles. Record intro videos or use text prompts — your call.
            </p>
          </div>

          {/* Step 2 */}
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.1] transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <Sparkles className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xs text-gray-600 font-mono tracking-wider">02</span>
            </div>
            <h3 className="text-lg font-semibold mb-3">Candidates Respond on Their Time</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Share a link. Candidates record video answers when it suits them — no scheduling, no back-and-forth.
            </p>
          </div>

          {/* Step 3 */}
          <div className="bg-[#111] border border-white/[0.06] rounded-2xl p-8 hover:border-white/[0.1] transition-colors">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-emerald-500/10 rounded-xl flex items-center justify-center">
                <BarChart3 className="w-5 h-5 text-emerald-400" />
              </div>
              <span className="text-xs text-gray-600 font-mono tracking-wider">03</span>
            </div>
            <h3 className="text-lg font-semibold mb-3">AI Scores & Ranks Talent</h3>
            <p className="text-gray-400 text-sm leading-relaxed">
              Our AI analyses responses for communication, confidence, and relevance — giving you ranked shortlists instantly.
            </p>
          </div>
        </div>
      </section>

      {/* Features Row */}
      <section className="px-6 py-16 max-w-7xl mx-auto">
        <div className="grid md:grid-cols-3 gap-10 text-center">
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Zap className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">Lightning Fast</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Review 100 candidates in the time it takes to interview 5
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Users className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">Team Collaboration</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              Share candidate videos with your entire hiring team
            </p>
          </div>
          <div className="flex flex-col items-center">
            <div className="w-14 h-14 bg-emerald-500/10 rounded-2xl flex items-center justify-center mb-4">
              <Shield className="w-7 h-7 text-emerald-400" />
            </div>
            <h3 className="font-semibold mb-2">Enterprise Secure</h3>
            <p className="text-gray-500 text-sm leading-relaxed">
              SOC 2 compliant with end-to-end encryption
            </p>
          </div>
        </div>
      </section>

      {/* Interview Preview */}
      <section className="px-6 py-24 max-w-7xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
            Built for the way you hire
          </h2>
          <p className="text-gray-400 max-w-lg mx-auto">
            A seamless experience from posting your first question to making the final offer.
          </p>
        </div>

        <div className="relative rounded-2xl overflow-hidden bg-[#111] border border-white/[0.06]">
          <div className="aspect-video bg-gradient-to-br from-emerald-900/20 via-gray-900/50 to-gray-900 flex items-center justify-center relative">
            {/* Mock interview UI overlay */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-56 sm:w-72 h-40 sm:h-52 bg-gray-800/40 rounded-xl border border-gray-700/30 backdrop-blur-sm flex items-center justify-center">
                <div className="text-center">
                  <div className="text-xs text-gray-500 mb-3">No card in camera</div>
                  <div className="w-20 h-20 sm:w-24 sm:h-24 bg-gray-700/40 rounded-full mx-auto" />
                </div>
              </div>
            </div>

            {/* Timer badge */}
            <div className="absolute top-4 right-4 bg-black/50 backdrop-blur-sm px-3 py-1 rounded-md">
              <span className="text-xs text-gray-400 font-mono">02:45</span>
            </div>

            {/* Live badge */}
            <div className="absolute bottom-4 left-4 flex items-center gap-2 bg-black/50 backdrop-blur-sm px-3 py-1.5 rounded-full">
              <div className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse" />
              <span className="text-sm text-gray-300">Live interview in progress</span>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div className="border-t border-white/[0.06] mx-6" />

      {/* CTA Section */}
      <section className="px-6 py-24 text-center max-w-7xl mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
          Ready to transform your hiring?
        </h2>
        <p className="text-gray-400 mb-10 max-w-lg mx-auto">
          Join forward-thinking companies already on the waitlist. Early users get lifetime priority access.
        </p>
        <Link
          href="/auth/signup"
          className="inline-flex items-center gap-2 px-8 py-3 bg-emerald-500 hover:bg-emerald-600 text-white rounded-lg font-medium transition-colors text-sm"
        >
          Claim Your Spot
          <ArrowRight className="w-4 h-4" />
        </Link>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] px-6 py-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 bg-emerald-500 rounded flex items-center justify-center">
              <Video className="w-3 h-3 text-white" />
            </div>
            <span className="text-sm text-gray-400">Muqabla</span>
          </div>
          <span className="text-sm text-gray-600">
            &copy; 2026 Muqabla. All rights reserved.
          </span>
        </div>
      </footer>
    </div>
  );
}
