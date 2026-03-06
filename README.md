# Muqabla - Next.js Web Version

This is the Next.js web migration of the Muqabla Expo mobile app - a video-first job interview platform for the GCC market.

## 🎯 Project Overview

Muqabla is an AI-powered job interview platform where:
- **Candidates** create video profiles and apply to jobs with recorded video applications
- **Employers** post jobs with video descriptions and screen candidates efficiently
- Focus on the GCC (Gulf Cooperation Council) market

## 🚀 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **State Management**: Zustand
- **Database/Auth**: Supabase
- **Icons**: Lucide React
- **Video Hosting**: Mux (integration ready)

## 📁 Project Structure

```
muqabla-nextjs/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── page.tsx      # Landing page
│   │   ├── login/        # Login page
│   │   └── feed/         # Jobs feed
│   ├── components/        # Reusable components
│   │   ├── ui/           # Button, Input, etc.
│   │   └── JobCard.tsx   # Job card component
│   ├── lib/             # Utilities and API clients
│   │   ├── supabase.ts   # Supabase client & helpers
│   │   └── utils.ts      # Helper functions
│   ├── stores/          # Zustand state management
│   │   └── authStore.ts  # Authentication state
│   ├── hooks/           # Custom React hooks
│   │   └── useAuth.ts    # Authentication hook
│   ├── constants/        # App constants
│   │   └── colors.ts     # Color palette
│   └── types/           # TypeScript definitions
│       └── index.ts      # All type definitions
├── public/             # Static assets
└── package.json
```

## 🛠️ Installation

1. **Clone and install dependencies:**
```bash
cd muqabla-nextjs
npm install
```

2. **Set up environment variables:**
```bash
cp .env.example .env
```

Edit `.env` with your Supabase credentials:
```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

3. **Run development server:**
```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## 📱 Expo to Next.js Migration Guide

### Component Mapping

| Expo/React Native | Next.js/Web |
|------------------|--------------|
| `View` | `div` |
| `Text` | `span` / `p` / `h1-6` |
| `TextInput` | `input` |
| `TouchableOpacity` | `button` / `div` with onClick |
| `Image` | `img` / Next.js `Image` |
| `FlatList` | `map()` with `div` |
| `ScrollView` | `div` with `overflow-auto` |
| `StyleSheet` | Tailwind CSS classes |
| `Ionicons` | `lucide-react` |

### Styling Migration

**Expo (StyleSheet):**
```typescript
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
  }
});
```

**Next.js (Tailwind):**
```typescript
<div className="flex p-5 bg-white">
```

### Navigation Migration

**Expo (expo-router):**
```typescript
import { useRouter } from 'expo-router';
const router = useRouter();
router.push('/feed');
```

**Next.js:**
```typescript
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/feed');
// or use <Link href="/feed"> for client navigation
```

### State Management

Both Expo and Next.js versions use **Zustand** for state management, so the store logic remains the same.

## 🎨 Design System

### Color Palette

- **Primary**: `#0D7377` (Deep Teal)
- **Accent**: `#C9A227` (Warm Gold)
- **Background**: `#FAFAFA` (Off-white)
- **Surface**: `#FFFFFF` (White)

### Tailwind Custom Colors

All Muqabla colors are available as Tailwind utilities:
```tsx
<div className="bg-primary text-white">
<div className="bg-surface border-border">
<span className="text-text text-text-secondary">
```

## 🔐 Authentication

The app uses Supabase Auth with email/password login.

**Flow:**
1. User signs in with email/password
2. Supabase returns session
3. Auth store loads user profile
4. User redirected to feed

**Protected Routes:**
- Create a middleware or client-side check using `useAuthStore()`
- Redirect to `/login` if not authenticated

## 📄 Pages Implemented

- ✅ **Landing Page** (`/`) - App introduction
- ✅ **Login Page** (`/login`) - Email authentication
- ✅ **Feed Page** (`/feed`) - Job listings

### Pages to Migrate

From the Expo app:
- Register (`/(auth)/register`)
- OTP Verification (`/(auth)/verify-otp`)
- Candidate Onboarding (`/(auth)/onboarding/candidate`)
- Employer Onboarding (`/(auth)/onboarding/employer`)
- Search (`/(tabs)/search`)
- Applications (`/(tabs)/applications`)
- Profile (`/(tabs)/profile`)
- Record Video (`/(tabs)/record`)
- Job Details (`/job/[id]`)
- Company Details (`/company/[id]`)

## 🔌 API Integration

Supabase is already configured in `src/lib/supabase.ts` with helpers for:
- User authentication
- Profile management
- Job operations
- Applications
- Saved jobs

## 🚢 Deployment

### Vercel (Recommended)

```bash
npm run build
vercel deploy
```

### Other Platforms

Build the production bundle:
```bash
npm run build
npm run start  # Preview production build
```

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint

## 🤝 Contributing

When migrating Expo components to Next.js:

1. **Read the Expo component first** - Understand the logic and props
2. **Replace native primitives** - Map View/Text/Input to HTML elements
3. **Convert StyleSheet** - Replace styles with Tailwind classes
4. **Test thoroughly** - Verify functionality matches original
5. **Keep Tailwind classes** - Maintain design consistency

## 📄 License

Proprietary - Muqabla Project

## 🙏 Acknowledgments

- [Next.js](https://nextjs.org/) - React framework
- [Supabase](https://supabase.com/) - Backend & Auth
- [Tailwind CSS](https://tailwindcss.com/) - Styling
- [Zustand](https://zustand-demo.pmnd.rs/) - State management
- [Lucide](https://lucide.dev/) - Icon library
