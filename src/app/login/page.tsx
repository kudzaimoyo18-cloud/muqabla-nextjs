'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { useAuth } from '@/hooks/useAuth';
import Input from '@/components/ui/Input';
import Button from '@/components/ui/Button';
import { Logo } from '@/components/Logo';

export default function LoginScreen() {
  const router = useRouter();
  const { signInEmail, isLoading, error, setError } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fieldErrors, setFieldErrors] = useState<{ email?: string; password?: string }>({});

  const validate = (): boolean => {
    const errors: { email?: string; password?: string } = {};

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

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSignIn = async () => {
    setError(null);
    if (!validate()) return;

    const result = await signInEmail(email.trim(), password);

    if (result.success) {
      router.push('/feed');
    }
  };

  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <Logo variant="default" />
        </div>
          <h1 className="text-3xl font-bold text-text mb-2">Welcome Back</h1>
          <p className="text-base text-text-secondary">Sign in to continue</p>
        </div>

        {/* Error Banner */}
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-xl p-3 mb-4">
            <p className="text-sm text-error text-center">{error}</p>
          </div>
        )}

        {/* Form */}
        <div className="space-y-4">
          <Input
            label="Email"
            placeholder="your@email.com"
            value={email}
            onChange={(e) => {
              setEmail(e.target.value);
              if (fieldErrors.email) setFieldErrors((prev) => ({ ...prev, email: undefined }));
            }}
            leftIcon="mail"
            error={fieldErrors.email}
            autoComplete="email"
          />

          <Input
            label="Password"
            placeholder="Enter password"
            type="password"
            value={password}
            onChange={(e) => {
              setPassword(e.target.value);
              if (fieldErrors.password) setFieldErrors((prev) => ({ ...prev, password: undefined }));
            }}
            leftIcon="lock"
            error={fieldErrors.password}
            autoComplete="current-password"
          />

          <Button
            title="Sign In"
            onClick={handleSignIn}
            loading={isLoading}
            disabled={isLoading}
            size="large"
            fullWidth
            className="mt-2"
          />
        </div>

        {/* Footer */}
        <div className="flex justify-center mt-6">
          <span className="text-sm text-text-secondary">
            Don't have an account?{' '}
          </span>
          <Link href="/register" className="text-sm text-primary font-semibold hover:underline ml-1">
            Sign Up
          </Link>
        </div>
      </div>
    </div>
  );
}
