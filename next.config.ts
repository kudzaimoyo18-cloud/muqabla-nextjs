import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.supabase.co',
      },
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: '**.mux.com',
      },
    ],
  },
  env: {
    HUGGINGFACE_API_KEY: process.env.HUGGINGFACE_API_KEY,
  },
};

export default nextConfig;
