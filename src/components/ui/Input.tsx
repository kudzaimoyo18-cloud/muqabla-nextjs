import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  hint?: string;
  leftIcon?: 'mail' | 'lock';
}

export default function Input({
  label,
  error,
  hint,
  leftIcon,
  type = 'text',
  className,
  ...props
}: InputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const isPassword = type === 'password';
  const showPassword = isPassword && isPasswordVisible;

  const inputType = isPassword && !showPassword ? 'password' : type;

  const icons = {
    mail: <Mail className="w-5 h-5" />,
    lock: <Lock className="w-5 h-5" />,
  };

  return (
    <div className="mb-4">
      {label && (
        <label className="block text-sm font-semibold text-text mb-2">
          {label}
        </label>
      )}

      <div
        className={cn(
          'flex items-center bg-surface border border-border rounded-xl px-4 transition-all',
          isFocused && 'border-primary border-2',
          error && 'border-error',
          'focus-within:border-primary focus-within:border-2'
        )}
      >
        {leftIcon && (
          <div className={cn(
            'text-text-secondary mr-2',
            isFocused && 'text-primary'
          )}>
            {icons[leftIcon]}
          </div>
        )}

        <input
          type={inputType}
          className={cn(
            'flex-1 h-13 text-base text-text outline-none bg-transparent',
            leftIcon && 'ml-1'
          )}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          {...props}
        />

        {isPassword && (
          <button
            type="button"
            onClick={() => setIsPasswordVisible(!isPasswordVisible)}
            className="p-1 text-text-secondary hover:text-text"
          >
            {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
          </button>
        )}
      </div>

      {error && (
        <p className="text-xs text-error mt-1">{error}</p>
      )}
      {hint && !error && (
        <p className="text-xs text-text-secondary mt-1">{hint}</p>
      )}
    </div>
  );
}

// Phone input with country code
export function PhoneInput({
  value,
  onChange,
  error,
  ...props
}: {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  error?: string;
} & Omit<InputProps, 'value' | 'onChange' | 'type'>) {
  return (
    <div className="flex gap-2">
      <div className="bg-surface-secondary rounded-xl px-4 flex items-center justify-center border border-border">
        <span className="text-base font-semibold text-text">+971</span>
      </div>
      <div className="flex-1">
        <Input
          value={value}
          onChange={onChange}
          placeholder="50 123 4567"
          type="tel"
          error={error}
          className="mb-0"
          {...props}
        />
      </div>
    </div>
  );
}
