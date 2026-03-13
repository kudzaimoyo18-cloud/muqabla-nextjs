'use client';

import { useState } from 'react';
import { signUpWithEmail, createUserProfile } from '@/lib/supabase';
import Button from '@/components/ui/Button';
import Input from '@/components/ui/Input';
import Logo from '@/components/Logo';
import { Mail, Lock, User, AlertCircle, Building2, Briefcase } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function SignupPage() {
  const router = useRouter();
  const [step, setStep] = useState<'account' | 'role'>('account');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [userType, setUserType] = useState<'candidate' | 'employer'>('candidate');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleCreateAccount = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const { data, error } = await signUpWithEmail(email, password);
      if (error) {
        setError(error.message);
      } else if (data.user) {
        // Create user profile
        await createUserProfile(data.user.id, userType, fullName, null, email);
        setStep('role');
      }
    } catch (err) {
      setError('An unexpected error occurred');
    } finally {
      setLoading(false);
    }
  };

  const handleRoleSelection = () => {
    if (userType === 'candidate') {
      router.push('/onboarding/candidate');
    } else {
      router.push('/onboarding/employer');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-light/10 to-purple-50 flex flex-col">
      {/* Header */}
      <div className="p-4">
        <Logo />
      </div>

      {/* Signup Form */}
      <div className="flex-1 flex items-center justify-center p-4">
        <div className="w-full max-w-md">
          <div className="bg-white rounded-2xl p-6 md:p-8 shadow-lg">
            {step === 'account' ? (
              <>
                <h1 className="text-2xl font-bold text-text mb-2">
                  Create Account
                </h1>
                <p className="text-text-secondary mb-6">
                  Join thousands of professionals on Muqabla
                </p>

                {error && (
                  <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                    <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                    <p className="text-sm text-red-700">{error}</p>
                  </div>
                )}

                <form onSubmit={handleCreateAccount} className="space-y-4">
                  <Input
                    type="text"
                    label="Full Name"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    leftIcon={<User className="w-5 h-5" />}
                    required
                  />

                  <Input
                    type="email"
                    label="Email Address"
                    placeholder="you@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    leftIcon={<Mail className="w-5 h-5" />}
                    required
                    autoComplete="email"
                  />

                  <Input
                    type="password"
                    label="Password"
                    placeholder="Create a strong password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    leftIcon={<Lock className="w-5 h-5" />}
                    required
                    autoComplete="new-password"
                    helperText="Minimum 6 characters"
                  />

                  <Button type="submit" size="large" fullWidth loading={loading}>
                    Continue
                  </Button>
                </form>

                <div className="mt-6 text-center">
                  <p className="text-text-secondary">
                    Already have an account?{' '}
                    <Link href="/auth/login" className="text-primary font-semibold hover:underline">
                      Sign in
                    </Link>
                  </p>
                </div>
              </>
            ) : (
              <>
                <h1 className="text-2xl font-bold text-text mb-2">
                  Choose Your Role
                </h1>
                <p className="text-text-secondary mb-6">
                  How do you want to use Muqabla?
                </p>

                <div className="space-y-3">
                  <button
                    type="button"
                    onClick={() => setUserType('candidate')}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      userType === 'candidate'
                        ? 'border-primary bg-primary-light/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Briefcase className={`w-6 h-6 flex-shrink-0 ${
                        userType === 'candidate' ? 'text-primary' : 'text-text-secondary'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-text mb-1">
                          I'm a Candidate
                        </h3>
                        <p className="text-sm text-text-secondary">
                          Find jobs, build profile, connect with employers
                        </p>
                      </div>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setUserType('employer')}
                    className={`w-full p-4 rounded-xl border-2 text-left transition-all ${
                      userType === 'employer'
                        ? 'border-primary bg-primary-light/10'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      <Building2 className={`w-6 h-6 flex-shrink-0 ${
                        userType === 'employer' ? 'text-primary' : 'text-text-secondary'
                      }`} />
                      <div>
                        <h3 className="font-semibold text-text mb-1">
                          I'm an Employer
                        </h3>
                        <p className="text-sm text-text-secondary">
                          Post jobs, find candidates, manage applications
                        </p>
                      </div>
                    </div>
                  </button>
                </div>

                <Button
                  size="large"
                  fullWidth
                  className="mt-6"
                  onClick={handleRoleSelection}
                >
                  Continue
                </Button>

                <div className="mt-6 text-center">
                  <button
                    type="button"
                    onClick={() => setStep('account')}
                    className="text-sm text-text-secondary hover:text-primary"
                  >
                    ← Go back
                  </button>
                </div>
              </>
            )}

            <div className="mt-6 pt-6 border-t border-border">
              <p className="text-xs text-center text-text-tertiary">
                By continuing, you agree to our{' '}
                <Link href="/terms" className="text-primary hover:underline">
                  Terms of Service
                </Link>{' '}
                and{' '}
                <Link href="/privacy" className="text-primary hover:underline">
                  Privacy Policy
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
