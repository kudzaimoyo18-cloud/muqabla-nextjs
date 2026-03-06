'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Logo } from '@/components/Logo';
import { Mail, Lock, User } from 'lucide-react';

type UserType = 'candidate' | 'employer';

export default function RegisterScreen() {
  const router = useRouter();
  const [userType, setUserType] = useState<UserType>('candidate');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [fieldErrors, setFieldErrors] = useState<Record<string, string>>({});
  const [step, setStep] = useState<'account' | 'details'>('account');

  const { signUpEmail, isLoading, error, setError } = useAuth();

  const validateAccount = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    if (!email.trim()) {
      errors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      errors.email = 'Enter a valid email address';
    }

    if (!password) {
      errors.password = 'Password is required';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters';
    }

    if (password !== confirmPassword) {
      errors.confirmPassword = 'Passwords do not match';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const validateDetails = (): boolean => {
    const errors: Record<string, string> = {};

    if (!fullName.trim()) {
      errors.fullName = 'Full name is required';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleCreateAccount = async () => {
    setError(null);
    if (!validateAccount()) return;

    const result = await signUpEmail(email.trim(), password);

    if (result.success) {
      setStep('details');
    }
  };

  const handleContinue = async () => {
    setError(null);
    if (!validateDetails()) return;

    // Here you would handle onboarding logic
    // For now, redirect to feed as a placeholder
    router.push('/feed');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header with Logo */}
      <div className="bg-white border-b border-border p-4">
        <div className="w-full max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/">
            <Logo variant="small" />
          </Link>
          <div className="flex gap-2">
            <span className="text-sm text-text-secondary">
              Already have an account?{' '}
            </span>
            <Link href="/login" className="text-sm font-semibold text-primary hover:underline">
              Sign in
            </Link>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-md">
          {/* Account Type Selection */}
          {step === 'account' && (
            <>
              <h1 className="text-3xl font-bold text-text mb-2">Create Account</h1>
              <p className="text-base text-text-secondary mb-8">Choose your account type to get started</p>

              <div className="grid grid-cols-2 gap-4 mb-8">
                {/* Candidate Card */}
                <button
                  onClick={() => setUserType('candidate')}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    userType === 'candidate'
                      ? 'border-primary bg-primary'
                      : 'border-border bg-white hover:border-primary-light'
                  }`}
                >
                  <User className="w-12 h-12 mb-3" />
                  <h3 className="text-xl font-bold text-text mb-2">
                    {userType === 'candidate' ? 'I\'m a Candidate' : 'Candidate'}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Find your dream job with video profiles
                  </p>
                </button>

                {/* Employer Card */}
                <button
                  onClick={() => setUserType('employer')}
                  className={`p-6 rounded-2xl border-2 transition-all ${
                    userType === 'employer'
                      ? 'border-accent bg-accent'
                      : 'border-border bg-white hover:border-accent-light'
                  }`}
                >
                  <Mail className="w-12 h-12 mb-3" />
                  <h3 className="text-xl font-bold text-text mb-2">
                    {userType === 'employer' ? 'I\'m an Employer' : 'Employer'}
                  </h3>
                  <p className="text-sm text-text-secondary">
                    Post jobs and discover top talent efficiently
                  </p>
                </button>
              </div>

              {/* Account Form */}
              {userType && (
                <div className="bg-white rounded-2xl p-6 shadow-sm">
                  <h2 className="text-xl font-bold text-text mb-6">
                    Create your {userType} account
                  </h2>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-6">
                      <p className="text-sm text-error text-center">{error}</p>
                    </div>
                  )}

                  <div className="space-y-4">
                    <Input
                      label="Full Name"
                      placeholder="Enter your full name"
                      value={fullName}
                      onChange={(e) => {
                        setFullName(e.target.value);
                        if (fieldErrors.fullName) setFieldErrors(prev => ({ ...prev, fullName: undefined }));
                      }}
                      leftIcon="mail"
                      error={fieldErrors.fullName}
                    />

                    <Input
                      label="Email"
                      placeholder="your@email.com"
                      value={email}
                      onChange={(e) => {
                        setEmail(e.target.value);
                        if (fieldErrors.email) setFieldErrors(prev => ({ ...prev, email: undefined }));
                      }}
                      type="email"
                      leftIcon="mail"
                      error={fieldErrors.email}
                    />

                    <Input
                      label="Password"
                      placeholder="Create a strong password"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password) setFieldErrors(prev => ({ ...prev, password: undefined }));
                      }}
                      type="password"
                      leftIcon="lock"
                      error={fieldErrors.password}
                    />

                    <Input
                      label="Confirm Password"
                      placeholder="Re-enter your password"
                      value={confirmPassword}
                      onChange={(e) => {
                        setConfirmPassword(e.target.value);
                        if (fieldErrors.confirmPassword) setFieldErrors(prev => ({ ...prev, confirmPassword: undefined }));
                      }}
                      type="password"
                      leftIcon="lock"
                      error={fieldErrors.confirmPassword}
                    />
                  </div>

                  <Button
                    title="Create Account"
                    onClick={handleCreateAccount}
                    loading={isLoading}
                    disabled={isLoading}
                    size="large"
                    fullWidth
                  />
                </div>
              )}
            </>
          )}

          {/* Details Step (Placeholder) */}
          {step === 'details' && (
            <div className="bg-white rounded-2xl p-6 shadow-sm">
              <h2 className="text-xl font-bold text-text mb-2">
                {userType === 'candidate' ? 'Complete Your Profile' : 'Company Information'}
              </h2>
              <p className="text-sm text-text-secondary mb-6">
                Tell us more about yourself to help us match you better
              </p>

              {userType === 'candidate' && (
                <div className="space-y-4">
                  <Input
                    label="Headline"
                    placeholder="e.g., Senior Software Engineer"
                    error={fieldErrors.fullName}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="City"
                      placeholder="e.g., Dubai"
                      error={fieldErrors.fullName}
                    />
                    <Input
                      label="Years of Experience"
                      placeholder="Optional"
                      type="number"
                      error={fieldErrors.fullName}
                    />
                  </div>
                </div>
              )}

              {userType === 'employer' && (
                <div className="space-y-4">
                  <Input
                    label="Job Title"
                    placeholder="e.g., Senior Recruiter"
                    error={fieldErrors.fullName}
                  />
                  <Input
                    label="Company Name"
                    placeholder="e.g., Tech Solutions LLC"
                    error={fieldErrors.fullName}
                  />
                  <div className="grid grid-cols-2 gap-4">
                    <Input
                      label="Industry"
                      placeholder="e.g., Technology"
                      error={fieldErrors.fullName}
                    />
                    <Input
                      label="Company Size"
                      placeholder="e.g., 50-200 employees"
                      error={fieldErrors.fullName}
                    />
                  </div>
                </div>
              )}

              <Button
                title="Continue to Dashboard"
                onClick={handleContinue}
                size="large"
                fullWidth
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
