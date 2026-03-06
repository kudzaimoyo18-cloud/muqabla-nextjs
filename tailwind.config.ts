import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#0D7377',
          light: '#14919B',
          dark: '#095759',
        },
        accent: {
          DEFAULT: '#C9A227',
          light: '#E5C44D',
          dark: '#9A7B1D',
        },
        background: '#FAFAFA',
        surface: '#FFFFFF',
        'surface-secondary': '#F3F4F6',
        text: {
          DEFAULT: '#1A1A2E',
          secondary: '#6B7280',
          tertiary: '#9CA3AF',
          inverse: '#FFFFFF',
        },
        success: '#2ECC71',
        error: '#E74C3C',
        warning: '#F39C12',
        info: '#3498DB',
        verified: '#0D7377',
        pending: '#F39C12',
        active: '#2ECC71',
        inactive: '#9CA3AF',
        border: '#E5E7EB',
        'border-dark': '#D1D5DB',
      },
      boxShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.1)',
        'md': '0 2px 4px rgba(0, 0, 0, 0.15)',
        'lg': '0 4px 8px rgba(0, 0, 0, 0.2)',
      },
    },
  },
  plugins: [],
};

export default config;
