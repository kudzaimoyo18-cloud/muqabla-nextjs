import Link from 'next/link';
import Button from '@/components/ui/Button';

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col items-center justify-center p-6">
      {/* Logo */}
      <div className="w-24 h-24 rounded-[25px] bg-primary flex items-center justify-center mb-6">
        <span className="text-5xl font-bold text-white">M</span>
      </div>

      {/* Title */}
      <h1 className="text-4xl font-bold text-text mb-2">Muqabla</h1>
      <p className="text-lg text-text-secondary mb-12">Your Career, Your Story</p>

      {/* CTA Button */}
      <Link href="/login">
        <Button
          title="Get Started"
          size="large"
          className="py-4 px-12"
        />
      </Link>
    </div>
  );
}
