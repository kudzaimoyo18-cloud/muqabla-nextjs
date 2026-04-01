import Image from "next/image";
import Link from "next/link";
import {
  Video,
  Sparkles,
  BarChart3,
  ArrowRight,
  Zap,
  Users,
  Lock,
  Play,
  CheckCircle,
  Briefcase,
  Globe,
  Building2,
  Star,
  Shield,
  MapPin,
} from "lucide-react";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white overflow-x-hidden">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/[0.06] bg-[#0a0a0a]/80 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-2.5">
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-emerald-500 text-white">
              <Video className="h-4 w-4" />
            </div>
            <span className="text-[17px] font-semibold text-white tracking-tight">
              Muqabla
            </span>
          </div>
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#how-it-works"
              className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors"
            >
              How It Works
            </a>
            <a
              href="#features"
              className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors"
            >
              Features
            </a>
            <a
              href="#platform"
              className="text-[13px] font-medium text-gray-400 hover:text-white transition-colors"
            >
              Platform
            </a>
          </nav>
          <div className="flex items-center gap-3">
            <Link
              href="/auth/login"
              className="hidden sm:inline-flex text-[13px] font-medium text-gray-400 hover:text-white transition-colors"
            >
              Sign In
            </Link>
            <Link
              href="/auth/signup"
              className="inline-flex items-center gap-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-4 py-2 text-[13px] font-medium text-white transition-colors"
            >
              Get Started
              <ArrowRight className="h-3.5 w-3.5" />
            </Link>
          </div>
        </div>
      </header>

      {/* Hero */}
      <section className="relative min-h-screen flex items-center pt-16">
        {/* Background glow effects */}
        <div className="absolute top-[-10%] left-[-5%] w-[500px] h-[500px] bg-emerald-500/[0.07] rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute bottom-[10%] right-[-5%] w-[350px] h-[350px] bg-emerald-500/[0.04] rounded-full blur-[100px] pointer-events-none" />

        <div className="relative mx-auto max-w-7xl px-5 sm:px-6 lg:px-8 py-20 sm:py-24 lg:py-32 w-full">
          <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
            {/* Left - Copy */}
            <div>
              <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/[0.08] px-3.5 py-1.5 text-[13px] text-emerald-400 font-medium">
                <Sparkles className="h-3.5 w-3.5" />
                <span>AI-POWERED PLATFORM</span>
              </div>
              <h1 className="mb-5 text-[40px] sm:text-[52px] lg:text-[60px] font-bold tracking-tight leading-[1.08]">
                AI-Powered{" "}
                <span className="text-emerald-400">Video</span>
                <br />
                <span className="text-emerald-400">Interviews</span> for
                <br />
                Modern Hiring
              </h1>
              <p className="mb-8 text-[15px] sm:text-base text-gray-400 max-w-[440px] leading-[1.7]">
                Screen candidates faster with AI-driven video assessments. Save
                time, reduce bias, and find the right talent — effortlessly.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mb-10">
                <Link
                  href="/auth/signup"
                  className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 px-6 py-3 text-[14px] font-medium text-white transition-colors"
                >
                  Get Started Free
                  <ArrowRight className="h-4 w-4" />
                </Link>
                <a
                  href="#how-it-works"
                  className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] px-6 py-3 text-[14px] font-medium text-gray-300 transition-colors"
                >
                  <Play className="h-4 w-4" />
                  See How It Works
                </a>
              </div>

              {/* Stats */}
              <div className="flex items-center gap-8 sm:gap-10">
                <div>
                  <div className="text-[26px] sm:text-[30px] font-bold text-emerald-400">
                    3x
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5 font-medium">
                    Faster Screening
                  </div>
                </div>
                <div className="h-8 w-px bg-white/[0.08]" />
                <div>
                  <div className="text-[26px] sm:text-[30px] font-bold text-white">
                    85%
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5 font-medium">
                    Time Saved
                  </div>
                </div>
                <div className="h-8 w-px bg-white/[0.08]" />
                <div>
                  <div className="text-[26px] sm:text-[30px] font-bold text-white">
                    Zero
                  </div>
                  <div className="text-[11px] text-gray-500 mt-0.5 font-medium">
                    Scheduling Hassle
                  </div>
                </div>
              </div>
            </div>

            {/* Right - Hero Visual */}
            <div className="hidden lg:block relative">
              <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
                <div className="relative aspect-[4/3]">
                  <Image
                    src="/images/gcc-boardroom.jpg"
                    alt="Modern hiring with AI-powered video interviews"
                    fill
                    sizes="(max-width: 1024px) 0vw, 50vw"
                    className="object-cover opacity-70"
                    priority
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/20 to-transparent" />
                  <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/40 to-transparent" />

                  {/* Floating UI elements */}
                  <div className="absolute top-6 right-6 rounded-xl bg-white/[0.08] backdrop-blur-md border border-white/[0.1] p-3">
                    <div className="flex items-center gap-2 text-xs text-white">
                      <BarChart3 className="h-4 w-4 text-emerald-400" />
                      <span className="font-medium">AI Analysis</span>
                    </div>
                    <div className="mt-2 flex gap-1">
                      {[85, 92, 78, 95, 88].map((v, i) => (
                        <div
                          key={i}
                          className="w-2 bg-emerald-500/30 rounded-full overflow-hidden"
                          style={{ height: "32px" }}
                        >
                          <div
                            className="w-full bg-emerald-400 rounded-full"
                            style={{
                              height: `${v}%`,
                              marginTop: `${100 - v}%`,
                            }}
                          />
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className="absolute bottom-6 left-6 flex items-center gap-3">
                    <div className="flex items-center gap-2 rounded-full bg-red-500/90 px-3 py-1.5 text-[11px] font-medium text-white">
                      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Live interview in progress
                    </div>
                  </div>

                  <div className="absolute bottom-6 right-6 rounded-lg bg-white/[0.08] backdrop-blur-md border border-white/[0.1] px-3 py-2">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded-full bg-emerald-500/20 flex items-center justify-center">
                        <CheckCircle className="h-3.5 w-3.5 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-[10px] font-medium text-white">
                          Score: 94/100
                        </div>
                        <div className="text-[9px] text-gray-400">
                          Top candidate
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Social Proof */}
      <section className="py-10 border-t border-b border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
            {[
              { value: "10,000+", label: "Active Job Seekers", icon: Users },
              { value: "500+", label: "Verified Companies", icon: Building2 },
              { value: "6", label: "GCC Countries", icon: Globe },
              { value: "95%", label: "Response Rate", icon: Star },
            ].map((stat) => (
              <div
                key={stat.label}
                className="flex items-center gap-3 justify-center"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-emerald-500/[0.08] text-emerald-400">
                  <stat.icon className="h-4 w-4" />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">
                    {stat.value}
                  </div>
                  <div className="text-[11px] text-gray-500 font-medium">
                    {stat.label}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 sm:py-24 relative">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="mb-14 text-center">
            <p className="text-[12px] font-semibold text-emerald-400 uppercase tracking-[0.15em] mb-3">
              HOW IT WORKS
            </p>
            <h2 className="text-[28px] sm:text-[36px] font-bold text-white leading-tight">
              Hire smarter in three steps
            </h2>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {[
              {
                step: "01",
                icon: Video,
                title: "Create Video Questions",
                description:
                  "Set up custom interview questions tailored to your roles. Record intro videos or use text prompts — your call.",
              },
              {
                step: "02",
                icon: Sparkles,
                title: "Candidates Respond on Their Time",
                description:
                  "Share a link. Candidates record video answers when it suits them — no scheduling, no back-and-forth.",
              },
              {
                step: "03",
                icon: BarChart3,
                title: "AI Scores & Ranks Talent",
                description:
                  "Our AI analyses responses for communication, confidence, and relevance — giving you ranked shortlists instantly.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="group relative rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-8 transition-all duration-300 hover:border-white/[0.1] hover:bg-white/[0.04]"
              >
                <div className="flex items-center gap-3 mb-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/[0.1] text-emerald-400">
                    <feature.icon className="h-5 w-5" />
                  </div>
                  <span className="text-[11px] font-semibold text-gray-500 uppercase tracking-[0.12em]">
                    {feature.step}
                  </span>
                </div>
                <h3 className="mb-2.5 text-[17px] font-semibold text-white leading-snug">
                  {feature.title}
                </h3>
                <p className="text-[13.5px] text-gray-400 leading-[1.7]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Row */}
      <section
        id="features"
        className="py-14 sm:py-16 border-t border-white/[0.04]"
      >
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid gap-8 sm:gap-6 md:grid-cols-3 text-center">
            {[
              {
                icon: Zap,
                title: "Lightning Fast",
                description:
                  "Review 100 candidates in the time it takes to interview 5.",
              },
              {
                icon: Users,
                title: "Team Collaboration",
                description:
                  "Share candidate videos with your entire hiring team.",
              },
              {
                icon: Lock,
                title: "Enterprise Secure",
                description: "SOC 2 compliant with end-to-end encryption.",
              },
            ].map((feature) => (
              <div
                key={feature.title}
                className="flex flex-col items-center px-4"
              >
                <div className="flex h-12 w-12 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] mb-4">
                  <feature.icon className="h-5 w-5 text-emerald-400" />
                </div>
                <h4 className="text-[14px] font-semibold text-white mb-1.5">
                  {feature.title}
                </h4>
                <p className="text-[12.5px] text-gray-500 max-w-[220px] leading-[1.6]">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Built for the way you hire */}
      <section id="platform" className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-10 sm:mb-12">
            <h2 className="text-[28px] sm:text-[36px] font-bold text-white mb-3 leading-tight">
              Built for the way you hire
            </h2>
            <p className="text-[14px] sm:text-[15px] text-gray-400 max-w-xl mx-auto leading-[1.7]">
              A seamless experience from posting your first question to making
              the final offer.
            </p>
          </div>

          {/* Video/Interview Preview */}
          <div className="relative rounded-2xl overflow-hidden border border-white/[0.06] bg-white/[0.02]">
            <div className="relative aspect-[16/9] sm:aspect-[2/1] lg:aspect-[2.4/1] w-full">
              <Image
                src="/images/gcc-boardroom.jpg"
                alt="Live interview in progress on Muqabla platform"
                fill
                sizes="(max-width: 768px) 100vw, 80vw"
                className="object-cover opacity-70"
                quality={85}
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0a0a] via-[#0a0a0a]/30 to-transparent" />
              <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0a]/50 via-transparent to-[#0a0a0a]/30" />

              {/* Overlay UI - Simulated interview view */}
              <div className="absolute inset-4 sm:inset-8 flex flex-col justify-between">
                <div className="flex items-center justify-between">
                  <div className="rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/[0.08] px-3 py-1.5 text-[11px] text-gray-300 font-medium">
                    Interview Session
                  </div>
                  <div className="hidden sm:flex items-center gap-2">
                    <div className="rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/[0.08] px-3 py-1.5 text-[11px] text-gray-300">
                      00:42 / 02:00
                    </div>
                  </div>
                </div>

                <div className="flex items-end justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex items-center gap-2 rounded-full bg-red-500/90 px-3 py-1.5 text-[11px] font-medium text-white shadow-lg shadow-red-500/20">
                      <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse" />
                      Live interview in progress
                    </div>
                  </div>
                  <div className="hidden sm:block rounded-lg bg-white/[0.06] backdrop-blur-md border border-white/[0.08] p-2.5">
                    <div className="text-[10px] text-gray-400 mb-1">
                      AI Confidence
                    </div>
                    <div className="flex items-center gap-1.5">
                      <div className="h-1.5 flex-1 rounded-full bg-white/[0.1] w-20 overflow-hidden">
                        <div className="h-full w-[87%] rounded-full bg-emerald-400" />
                      </div>
                      <span className="text-[11px] font-semibold text-emerald-400">
                        87%
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* For Candidates & Employers */}
      <section className="py-20 sm:py-24 border-t border-white/[0.04]">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-6">
            {/* For Candidates */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-8 transition-all hover:border-white/[0.1] hover:bg-white/[0.04]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/[0.1] text-emerald-400 mb-5">
                <Briefcase className="h-5 w-5" />
              </div>
              <h3 className="text-[20px] font-semibold text-white mb-2">
                For Job Seekers
              </h3>
              <p className="text-[13.5px] text-gray-400 leading-[1.7] mb-5">
                Your video is your resume. Record a 60-second profile, browse
                jobs across 6 GCC countries, and apply instantly.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "Record your video profile in minutes",
                  "Browse thousands of verified jobs",
                  "Track applications in real-time",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-[13px] text-gray-300"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Create your profile
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>

            {/* For Employers */}
            <div className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-7 sm:p-8 transition-all hover:border-white/[0.1] hover:bg-white/[0.04]">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/[0.1] text-emerald-400 mb-5">
                <Building2 className="h-5 w-5" />
              </div>
              <h3 className="text-[20px] font-semibold text-white mb-2">
                For Employers
              </h3>
              <p className="text-[13.5px] text-gray-400 leading-[1.7] mb-5">
                Go beyond the CV. Watch video profiles to assess communication,
                cultural fit, and professionalism before the first interview.
              </p>
              <ul className="space-y-2.5 mb-6">
                {[
                  "AI-powered candidate scoring",
                  "Team collaboration & sharing",
                  "Streamlined hiring dashboard",
                ].map((item) => (
                  <li
                    key={item}
                    className="flex items-center gap-2.5 text-[13px] text-gray-300"
                  >
                    <CheckCircle className="h-4 w-4 text-emerald-400 shrink-0" />
                    {item}
                  </li>
                ))}
              </ul>
              <Link
                href="/auth/signup"
                className="inline-flex items-center gap-1.5 text-[13px] font-medium text-emerald-400 hover:text-emerald-300 transition-colors"
              >
                Start hiring
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / Why Muqabla */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="text-center mb-14">
            <p className="text-[12px] font-semibold text-emerald-400 uppercase tracking-[0.15em] mb-3">
              WHY MUQABLA
            </p>
            <h2 className="text-[28px] sm:text-[36px] font-bold text-white leading-tight">
              Trusted across the Gulf region
            </h2>
          </div>
          <div className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {[
              {
                icon: Shield,
                title: "Verified Companies",
                desc: "All employers are verified with trade licenses. No spam, no scams — only real opportunities.",
              },
              {
                icon: Globe,
                title: "Built for the GCC",
                desc: "Designed for the Gulf job market with visa sponsorship indicators and regional salary benchmarks.",
              },
              {
                icon: Video,
                title: "Video-First Approach",
                desc: "Show your personality and communication skills. Let employers see who you really are.",
              },
              {
                icon: Sparkles,
                title: "AI-Powered Insights",
                desc: "Smart candidate scoring, automated shortlisting, and intelligent job matching.",
              },
              {
                icon: MapPin,
                title: "6 GCC Countries",
                desc: "UAE, Saudi Arabia, Qatar, Kuwait, Bahrain, and Oman — all covered.",
              },
              {
                icon: Star,
                title: "Premium Experience",
                desc: "Intuitive design, fast performance, and a seamless hiring workflow end-to-end.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-white/[0.06] bg-white/[0.02] p-6 sm:p-7 transition-all hover:border-white/[0.1] hover:bg-white/[0.04]"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/[0.1] text-emerald-400 mb-4">
                  <item.icon className="h-5 w-5" />
                </div>
                <h4 className="text-[15px] font-semibold text-white mb-1.5">
                  {item.title}
                </h4>
                <p className="text-[13px] text-gray-400 leading-[1.7]">
                  {item.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-24 border-t border-white/[0.04]">
        <div className="mx-auto max-w-3xl px-5 sm:px-6 lg:px-8 text-center">
          <h2 className="mb-4 text-[28px] sm:text-[36px] font-bold text-white leading-tight">
            Ready to transform your hiring?
          </h2>
          <p className="mb-8 text-[14px] sm:text-[15px] text-gray-400 max-w-md mx-auto leading-[1.7]">
            Join forward-thinking companies already using Muqabla to hire
            smarter, faster, and more fairly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/auth/signup"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-white font-medium px-8 py-3 text-[14px] transition-colors"
            >
              Get Started Free
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/auth/login"
              className="inline-flex items-center justify-center gap-2 rounded-lg border border-white/[0.1] bg-white/[0.03] hover:bg-white/[0.06] text-gray-300 font-medium px-8 py-3 text-[14px] transition-colors"
            >
              Sign In
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/[0.06] py-8">
        <div className="mx-auto max-w-7xl px-5 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-emerald-500 text-white">
                <Video className="h-3.5 w-3.5" />
              </div>
              <span className="text-[14px] font-semibold text-white tracking-tight">
                Muqabla
              </span>
            </div>
            <span className="text-[12px] text-gray-500">
              &copy; 2026 Muqabla. All rights reserved.
            </span>
          </div>
        </div>
      </footer>
    </div>
  );
}
