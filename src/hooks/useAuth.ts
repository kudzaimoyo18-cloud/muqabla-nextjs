import { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  signInWithEmail,
} from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';
import type { UserType, CandidateOnboardingData, EmployerOnboardingData } from '@/types';

export function useAuth() {
  const router = useRouter();
  const { loadUserProfile } = useAuthStore();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Email sign in
  const signInEmail = async (email: string, password: string) => {
    setIsLoading(true);
    setError(null);

    try {
      const { data, error: signInError } = await signInWithEmail(email, password);

      if (signInError) {
        setError(signInError.message);
        return { success: false };
      }

      if (data.user) {
        await loadUserProfile(data.user.id);
        return { success: true };
      }

      return { success: false };
    } catch (err) {
      setError('An unexpected error occurred');
      return { success: false };
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    setError,
    signInEmail,
  };
}
