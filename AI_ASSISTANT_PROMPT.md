# Muqabla - AI Assistant Prompt for Lovable/Base44

---

## 🎯 Context

You are helping build **Muqabla**, a video-first job interview platform for the GCC market. We've successfully migrated the Expo mobile app to Next.js and deployed it to Vercel.

## 📊 Current Status

### ✅ What's Complete
- **Project**: Next.js 15 with TypeScript, Tailwind CSS, Zustand
- **Deployment**: Live at `https://muqabla-nextjs.vercel.app`
- **Infrastructure**: Supabase for auth/database, Mux for video
- **Core Pages**: Landing, Login, Feed (3/17 pages migrated)
- **Components**: Button, Input, JobCard (3/5 components migrated)
- **Documentation**: README, MIGRATION_SUMMARY, DEPLOYMENT guides

### 📋 What Needs to Be Built

**Remaining Pages (14):**
1. Register page (`/register`)
2. OTP Verification page (`/verify-otp`)
3. Candidate Onboarding (`/onboarding/candidate`)
4. Employer Onboarding (`/onboarding/employer`)
5. Search page (`/search`)
6. Applications page (`/applications`)
7. Profile page (`/profile`)
8. Record Video page (`/record`)
9. Job Details page (`/job/[id]`)
10. Company Details page (`/company/[id]`)
11. Settings page
12. Notifications page
13. Messages page
14. Help/Support page

**Remaining Components (2):**
1. VideoRecorder component
2. VideoPlayer component

**Features to Implement:**
- Video recording with MediaRecorder API (web)
- Video playback with HTML5 video or Mux player
- File uploads (profile picture, videos)
- Protected route middleware
- Push notifications (Service Workers)
- Real-time updates (if needed)

---

## 🎨 Design System & Styling

### Color Palette
```css
Primary: #0D7377 (Deep Teal)
Accent: #C9A227 (Warm Gold)
Background: #FAFAFA (Off-white)
Surface: #FFFFFF (White)
Text: #1A1A2E (Dark gray)
Text Secondary: #6B7280 (Medium gray)
Border: #E5E7EB (Light border)
```

### Tailwind Classes Available
All Muqabla colors are configured in `tailwind.config.ts`:
```tsx
className="bg-primary text-white"           // Primary button
className="bg-surface border-border"        // Card
className="text-text text-text-secondary"     // Typography
```

### Component Library
Use existing components from `src/components/`:
- `Button` - Primary, secondary, outline, ghost variants
- `Input` - With icons, password toggle, error states
- `JobCard` - Job listing with save/share actions

---

## 🔧 Project Structure

```
muqabla-nextjs/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── page.tsx           # Landing (✅ done)
│   │   ├── login/              # Login (✅ done)
│   │   ├── feed/               # Jobs feed (✅ done)
│   │   ├── register/            # TODO
│   │   ├── verify-otp/          # TODO
│   │   ├── onboarding/          # TODO
│   │   ├── search/              # TODO
│   │   ├── applications/        # TODO
│   │   ├── profile/             # TODO
│   │   ├── record/              # TODO
│   │   ├── job/[id]/            # TODO
│   │   └── company/[id]/        # TODO
│   ├── components/             # Reusable components
│   │   ├── ui/               # Button, Input (✅ done)
│   │   ├── JobCard.tsx        # ✅ done
│   │   ├── VideoRecorder.tsx   # TODO
│   │   └── VideoPlayer.tsx     # TODO
│   ├── lib/                   # Utilities & API
│   │   ├── supabase.ts        # ✅ Configured
│   │   └── utils.ts           # ✅ Created
│   ├── stores/                # Zustand state
│   │   └── authStore.ts       # ✅ Migrated
│   ├── hooks/                 # Custom hooks
│   │   └── useAuth.ts         # ✅ Created
│   ├── constants/             # Config
│   │   └── colors.ts          # ✅ Migrated
│   └── types/                # TypeScript types
│       └── index.ts           # ✅ Migrated
```

---

## 📱 Expo → Next.js Component Mapping

When building new pages, follow this mapping:

| Expo/React Native | Next.js/Web |
|------------------|--------------|
| `View` | `div` |
| `Text` | `span`, `p`, `h1-6` |
| `TextInput` | `input` |
| `TouchableOpacity` | `button`, `div` with onClick |
| `Image` | `img`, Next.js `Image` component |
| `FlatList` | `map()` with `div` |
| `ScrollView` | `div` with `overflow-auto` |
| `StyleSheet` | Tailwind CSS classes |
| `Ionicons` | `lucide-react` icons |
| `expo-router` | `next/navigation` |
| `useRouter()` | `useRouter()` from next/navigation |
| `Link` | `Link` from next/link |
| `ActivityIndicator` | Tailwind spinner or loading component |
| `SafeAreaView` | Just use `div` (web doesn't need safe area) |

### Example Conversions

**Button:**
```tsx
// Expo
<TouchableOpacity style={styles.button} onPress={onPress}>
  <Text style={styles.text}>Click Me</Text>
</TouchableOpacity>

// Next.js
<button className="bg-primary text-white py-3 px-6 rounded-xl font-semibold" onClick={onPress}>
  Click Me
</button>
```

**Input:**
```tsx
// Expo
<TextInput
  style={styles.input}
  placeholder="Enter email"
  onChangeText={onChangeText}
/>

// Next.js
<input
  className="flex-1 h-13 text-base bg-transparent outline-none"
  placeholder="Enter email"
  onChange={(e) => onChange(e.target.value)}
/>
```

**Navigation:**
```tsx
// Expo
import { useRouter } from 'expo-router';
const router = useRouter();
router.push('/feed');

// Next.js
import { useRouter } from 'next/navigation';
const router = useRouter();
router.push('/feed');
// OR for client navigation
import Link from 'next/link';
<Link href="/feed">Go to Feed</Link>
```

---

## 🔐 Authentication Flow

### Current Implementation
- ✅ Email/password login (`src/app/login/page.tsx`)
- ✅ Supabase client configured
- ✅ Zustand auth store
- ✅ Protected route logic ready

### What to Build
**Registration Flow:**
1. `/register` - Email/password or Phone registration
2. `/verify-otp` - OTP verification for phone signup
3. `/onboarding/candidate` - Candidate profile setup
4. `/onboarding/employer` - Employer/company setup

**Auth Helpers Available:**
```typescript
import { supabase } from '@/lib/supabase';
import { useAuthStore } from '@/stores/authStore';

// Sign up with email
await supabase.auth.signUp({ email, password });

// Sign in with email
await supabase.auth.signInWithPassword({ email, password });

// Sign out
await supabase.auth.signOut();

// Check auth state
const { user, isLoading } = useAuthStore();
```

---

## 📂 Data Management (Supabase)

### Supabase Helpers Available
All helpers are in `src/lib/supabase.ts`:

**Auth:**
- `signUpWithEmail(email, password)`
- `signInWithEmail(email, password)`
- `signOut()`
- `getCurrentUser()`
- `getCurrentSession()`

**Users:**
- `createUserProfile(userId, type, fullName, phone, email)`
- `getUserProfile(userId)`
- `updateUserProfile(userId, updates)`

**Candidates:**
- `createCandidateProfile(userId, profileData)`
- `getCandidateProfile(userId)`
- `updateCandidateProfile(userId, updates)`

**Jobs:**
- `getJobsFeed(cursor?, limit)`
- `getJobById(jobId)`
- `searchJobs(filters, cursor?, limit)`

**Applications:**
- `createApplication(applicationData)`
- `getCandidateApplications(candidateId)`

**Saved Jobs:**
- `saveJob(candidateId, jobId)`
- `unsaveJob(candidateId, jobId)`
- `getSavedJobs(candidateId)`

### Supabase Environment Variables
**These are already configured in Vercel:**
```
NEXT_PUBLIC_SUPABASE_URL=https://bqjmqgdsrjzjgmkjvz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNzdHRwczovL2FwaS9henJvcmVuLWZpbHVpbmluYS1wcg9iYXNjb25hdXRob2l0LWFwaS9henJvcmVuLWZpbHVpbmluYS1zZXJ2aWNlcm9sZSJ9.ImFub2ciLCJleHAiOiI6MjAxNDI1NDYsImE1IjoxNzM3NzcsImV4cCI6MTc3ODg1NzAsImlhdCI6InNzAyMDI1NDYsImlzcyI6dHlwZS5kZWZhdWx0LWFwaS5oZWZhdXRob2l0LWFwaS9henJvcmVuLWZpbHVpbmluYS1pc3MiOiJwdHlwZS5kZWZhdWx0LWFwaS5oZWZhdXRob2l0LWFwaS9henJvcmVuLWZpbHVpbmluYS16In0.
```

---

## 🎬 Video Implementation (Most Complex Feature)

### MediaRecorder API (Web Video Recording)
**Video recording on web differs from mobile:**

```tsx
'use client';

import { useState, useRef } from 'react';

export function VideoRecorder() {
  const [isRecording, setIsRecording] = useState(false);
  const [recordingUrl, setRecordingUrl] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });

      const mediaRecorder = new MediaRecorder(stream);
      const chunks: Blob[] = [];

      mediaRecorder.ondataavailable = (e) => {
        chunks.push(e.data);
      };

      mediaRecorder.onstop = () => {
        const blob = new Blob(chunks, { type: 'video/webm' });
        const url = URL.createObjectURL(blob);
        setRecordingUrl(url);
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (error) {
      console.error('Error accessing camera:', error);
    }
  };

  const stopRecording = () => {
    if (mediaRecorder) {
      mediaRecorder.stop();
      setIsRecording(false);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <video ref={videoRef} autoPlay muted className="w-full max-w-lg" />
      {recordingUrl && (
        <video src={recordingUrl} controls className="w-full max-w-lg mt-4" />
      )}
      <button
        onClick={isRecording ? stopRecording : startRecording}
        className="bg-primary text-white py-3 px-6 rounded-xl"
      >
        {isRecording ? 'Stop Recording' : 'Start Recording'}
      </button>
    </div>
  );
}
```

### Mux Video Player
**For playing uploaded videos (from Mux):**

```tsx
'use client';

import Script from 'next/script';

export function VideoPlayer({ playbackId }: { playbackId: string }) {
  return (
    <>
      <Script src="https://cdn.jsdelivr.net/npm/@mux/mux-player@latest/dist/mux-player.js" />
      <mux-video
        playback-id={playbackId}
        metadata-video-title="Muqabla Video"
        theme="minimal"
        playbackRates="[0.5, 1, 1.5, 2]"
      />
    </>
  );
}
```

---

## 🚀 Recommended Build Order

### Phase 1: Authentication Complete (2-3 hours)
1. Build `/register` page
2. Build `/verify-otp` page
3. Test complete auth flow

### Phase 2: Onboarding (2-3 hours)
1. Build `/onboarding/candidate` page
2. Build `/onboarding/employer` page
3. Connect to Supabase database

### Phase 3: Core Features (3-4 hours)
1. Build `/job/[id]` detail page
2. Build `/company/[id]` detail page
3. Build `/search` page with filters
4. Test job discovery flow

### Phase 4: User Features (2-3 hours)
1. Build `/applications` page
2. Build `/profile` page
3. Add profile editing
4. Test user management

### Phase 5: Video Features (4-5 hours) - **Hardest**
1. Implement VideoRecorder with MediaRecorder API
2. Implement VideoPlayer with Mux integration
3. Handle video uploads to Supabase Storage
4. Create `/record` page
5. Test complete video flow

### Phase 6: Polish (1-2 hours)
1. Add protected route middleware
2. Add loading states
3. Add error handling
4. Add notifications
5. Test all user flows

---

## 📄 Best Practices

### Code Style
- Use TypeScript for type safety
- Follow existing component patterns
- Use Tailwind CSS for styling
- Keep components small and focused
- Use existing UI components (Button, Input)

### State Management
- Use Zustand stores for global state
- Use React state for component-local state
- Keep auth state in `authStore.ts`
- Create new stores for complex features (if needed)

### Performance
- Use Next.js Image for images
- Implement lazy loading for large lists
- Use proper React keys for lists
- Optimize images before upload
- Use React.memo for expensive components

### Accessibility
- Use semantic HTML elements
- Add ARIA labels where needed
- Ensure keyboard navigation works
- Test screen readers
- Use proper heading hierarchy

### SEO
- Use Next.js metadata API in layouts
- Add OpenGraph tags
- Add Twitter Card tags
- Create sitemap.xml
- Add robots.txt

---

## 🐛 Common Issues & Solutions

### "Module not found" errors
**Solution:** Run `npm install [package-name]` or check if file path is correct

### "Property does not exist on type" errors
**Solution:** Check imports from `@/types`, verify type definitions exist

### Tailwind classes not working
**Solution:**
- Check `tailwind.config.ts` includes all colors
- Verify `@tailwindcss/postcss` is installed
- Check `globals.css` imports Tailwind

### Supabase errors
**Solution:**
- Verify environment variables in Vercel
- Check Supabase project is active
- Review Supabase Row Level Security (RLS) policies
- Check network connectivity

### Build failures in Vercel
**Solution:**
- Check deployment logs
- Fix TypeScript errors locally first
- Verify all dependencies are in package.json
- Check for missing environment variables

---

## 🔌 File Upload Implementation

**Uploading files to Supabase Storage:**

```tsx
import { supabase } from '@/lib/supabase';

async function uploadVideo(file: File) {
  const fileName = `${Date.now()}_${file.name}`;

  const { data, error } = await supabase.storage
    .from('videos')
    .upload(fileName, file);

  if (error) {
    console.error('Upload error:', error);
    throw error;
  }

  const { data: { publicUrl } } = supabase.storage
    .from('videos')
    .getPublicUrl(fileName);

  return publicUrl;
}
```

---

## 📊 Progress Tracking

Use this checklist to track completion:

### Authentication (3/5)
- [x] Login page
- [ ] Register page
- [ ] OTP verification
- [ ] Candidate onboarding
- [ ] Employer onboarding

### Main Features (1/10)
- [x] Feed page
- [ ] Search page
- [ ] Job details page
- [ ] Company details page
- [ ] Applications page
- [ ] Profile page
- [ ] Video recording page
- [ ] Settings page
- [ ] Notifications page

### Components (3/5)
- [x] Button
- [x] Input
- [x] JobCard
- [ ] VideoRecorder
- [ ] VideoPlayer

### Infrastructure (2/2)
- [x] Supabase integration
- [x] State management
- [ ] Protected routes
- [ ] Error handling

---

## 🎯 Current Deployment

- **Live URL**: https://muqabla-nextjs.vercel.app
- **Framework**: Next.js 15
- **Environment**: Production
- **Region**: Automatic (Vercel)
- **Status**: Live with basic pages

---

## 🚀 Next Actions

**Immediate (Next 30 minutes):**
1. Implement `/register` page
2. Test auth flow end-to-end
3. Deploy updates

**Short-term (Today):**
1. Complete onboarding pages
2. Build job/company detail pages
3. Implement search functionality

**Medium-term (This Week):**
1. Implement video recording
2. Add file uploads
3. Add protected routes
4. Complete all remaining pages

**Long-term (Next Sprint):**
1. Add push notifications
2. Add real-time features
3. Performance optimization
4. SEO improvements

---

## 💡 Key Learnings from Migration

1. **Tailwind CSS is powerful** - Replaces most StyleSheet usage
2. **Next.js App Router** is intuitive - File-based routing is easy
3. **Zustand works everywhere** - No changes needed for web
4. **Supabase is web-ready** - Just removed AsyncStorage
5. **Lucide React** is great for web - Modern, tree-shakable icons
6. **Video on web is different** - MediaRecorder API vs expo-camera

---

## 📞 Support Resources

- **Next.js Docs**: https://nextjs.org/docs
- **Tailwind Docs**: https://tailwindcss.com/docs
- **Supabase Docs**: https://supabase.com/docs
- **Mux Docs**: https://docs.mux.com/guides/video/introduction-to-mux-player
- **Zustand Docs**: https://zustand-demo.pmnd.rs/
- **Lucide Icons**: https://lucide.dev/

---

## 🎉 Final Notes

The foundation is solid. You have:
- ✅ Working Next.js setup
- ✅ Vercel deployment
- ✅ Core infrastructure
- ✅ Design system
- ✅ Authentication base
- ✅ Database integration

**Estimated time to complete**: 15-20 hours of development

**Recommended approach**: Build in phases (Auth → Onboarding → Core Features → Video → Polish)

**Test frequently**: Deploy to Vercel preview branches to test features live

---

**Current Status**: Foundation complete. Ready to build features! 🚀
