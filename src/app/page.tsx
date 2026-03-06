import Link from 'next/link';
import Button from '@/components/ui/Button';
import { Logo } from '@/components/Logo';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="mb-6">
        <Logo variant="large" />
      </div>

      {/* CTA Button */}
      <Link href="/login" className="mt-12">
        <Button
          title="Get Started"
          size="large"
          fullWidth
        />
      </Link>

      {/* Additional Info */}
      <div className="mt-8 text-center">
        <p className="text-sm text-text-secondary">
          Video-first job interviews for the GCC market
        </p>
      </div>
    </div>
  );
}
