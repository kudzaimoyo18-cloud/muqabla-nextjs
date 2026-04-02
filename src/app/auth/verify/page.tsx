'use client';

import { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { Video, ArrowRight, Loader2, ArrowLeft } from 'lucide-react';
import { supabase } from '@/lib/supabase';

export default function VerifyOtpPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const email = searchParams.get('email') || '';
  const redirect = searchParams.get('redirect') || '/feed';

  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [resendCooldown, setResendCooldown] = useState(0);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (resendCooldown > 0) {
      const timer = setTimeout(() => setResendCooldown(resendCooldown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [resendCooldown]);

  const handleChange = (index: number, value: string) => {
    if (value.length > 1) value = value[value.length - 1];
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-advance
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }

    // Auto-submit
    if (newOtp.every((d) => d !== '')) {
      verifyOtp(newOtp.join(''));
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (pasted.length === 6) {
      const newOtp = pasted.split('');
      setOtp(newOtp);
      verifyOtp(pasted);
    }
  };

  const verifyOtp = async (token: string) => {
    setLoading(true);
    setError('');

    try {
      const { error: authError } = await supabase.auth.verifyOtp({
        email,
        token,
        type: 'email',
      });
      if (authError) throw authError;
      router.push(redirect);
    } catch (err: any) {
      setError(err.message || 'Invalid code. Please try again.');
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
    } finally {
      setLoading(false);
    }
  };

  const handleResend = async () => {
    if (resendCooldown > 0) return;

    try {
      const { error: authError } = await supabase.auth.signInWithOtp({ email });
      if (authError) throw authError;
      setResendCooldown(60);
    } catch (err: any) {
      setError(err.message || 'Failed to resend code');
    }
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
      {/* Header */}
      <div className="px-6 py-4">
        <Link href="/" className="flex items-center gap-2.5 w-fit">
          <div className="w-8 h-8 bg-emerald-500 rounded-lg flex items-center justify-center">
            <Video className="w-4 h-4 text-white" />
          </div>
          <span className="text-[17px] font-semibold text-white tracking-tight">Muqabla</span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center px-6 py-12">
        <div className="w-full max-w-sm text-center">
          <div className="w-16 h-16 bg-emerald-500/10 rounded-2xl flex items-center justify-center mx-auto mb-6">
            <Video className="w-8 h-8 text-emerald-400" />
          </div>

          <h1 className="text-2xl font-bold text-white mb-2">Check your email</h1>
          <p className="text-gray-400 text-sm mb-8">
            We sent a 6-digit code to{' '}
            <span className="text-white font-medium">{email}</span>
          </p>

          {error && (
            <div className="bg-red-500/10 border border-red-500/20 text-red-400 text-sm rounded-lg px-4 py-3 mb-6">
              {error}
            </div>
          )}

          {/* OTP Input */}
          <div className="flex justify-center gap-3 mb-8" onPaste={handlePaste}>
            {otp.map((digit, index) => (
              <input
                key={index}
                ref={(el) => { inputRefs.current[index] = el; }}
                type="text"
                inputMode="numeric"
                maxLength={1}
                value={digit}
                onChange={(e) => handleChange(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-14 bg-[#111] border border-white/[0.06] rounded-lg text-center text-xl font-semibold text-white focus:border-emerald-500/50 focus:ring-0 transition-colors"
              />
            ))}
          </div>

          {loading && (
            <div className="flex items-center justify-center mb-6">
              <Loader2 className="w-5 h-5 animate-spin text-emerald-400" />
              <span className="ml-2 text-sm text-gray-400">Verifying...</span>
            </div>
          )}

          <button
            onClick={handleResend}
            disabled={resendCooldown > 0}
            className="text-sm text-gray-400 hover:text-emerald-400 disabled:text-gray-600 transition-colors"
          >
            {resendCooldown > 0 ? `Resend in ${resendCooldown}s` : 'Resend code'}
          </button>

          <div className="mt-8">
            <Link
              href="/auth/login"
              className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-white transition-colors"
            >
              <ArrowLeft className="w-4 h-4" />
              Back to sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
