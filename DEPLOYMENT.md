# Muqabla - GitHub & Vercel Deployment Guide

## ✅ Step 1: Create GitHub Repository

### Option A: Using GitHub Website (Easiest)

1. **Go to GitHub**
   - Visit [https://github.com/new](https://github.com/new)

2. **Create repository**
   - Repository name: `muqabla-nextjs`
   - Description: `Muqabla - Next.js Web Version - AI-powered job interview platform`
   - Make it **Public** (recommended)
   - **Don't** initialize with README, .gitignore, or license
   - Click "Create repository"

3. **Push your code**
   ```bash
   # Navigate to your project directory
   cd "C:\AI TOOLS (ANTIGRAVITY)\muqabla-nextjs"

   # Add remote (replace YOUR_USERNAME with your GitHub username)
   git remote add origin https://github.com/YOUR_USERNAME/muqabla-nextjs.git

   # Push to GitHub
   git push -u origin master
   ```

### Option B: Using GitHub CLI

If you have `gh` CLI installed:
```bash
gh repo create muqabla-nextjs --public --description "Muqabla - Next.js Web Version - AI-powered job interview platform"
git remote add origin https://github.com/YOUR_USERNAME/muqabla-nextjs.git
git push -u origin master
```

## ✅ Step 2: Deploy to Vercel

### Option A: Vercel Dashboard (Easiest)

1. **Go to Vercel**
   - Visit [https://vercel.com/new](https://vercel.com/new)

2. **Import from GitHub**
   - Click "Add New Project"
   - Select "Continue with GitHub"
   - Authorize Vercel to access your GitHub repositories
   - Select `muqabla-nextjs` repository
   - Click "Import"

3. **Configure project**
   - **Framework Preset**: Next.js (auto-detected)
   - **Root Directory**: `./` (default)
   - **Build Command**: `npm run build` (auto-detected)
   - **Output Directory**: `.next` (auto-detected)
   - Click "Deploy"

### Option B: Using Vercel CLI

If you have Vercel CLI installed:
```bash
# Install Vercel CLI (if not installed)
npm install -g vercel

# Login to Vercel
vercel login

# Deploy
cd "C:\AI TOOLS (ANTIGRAVITY)\muqabla-nextjs"
vercel
```

## ⚙️ Step 3: Add Environment Variables in Vercel

**Important!** Your app won't work without Supabase credentials.

1. **Go to Vercel project settings**
   - After deployment, go to your project in Vercel
   - Click "Settings" tab
   - Click "Environment Variables"

2. **Add Supabase credentials**
   Click "Add New" and add these variables:

   ```
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   ```

   **Where to get these:**
   - Go to your Supabase project: [https://supabase.com/dashboard](https://supabase.com/dashboard)
   - Navigate to Settings → API
   - Copy Project URL and Anon Public Key

3. **Redeploy**
   - After adding environment variables, Vercel will auto-redeploy
   - Or manually redeploy: Click "Deployments" → Click dots on latest → "Redeploy"

## ✅ Step 4: Verify Deployment

1. **Visit your deployed site**
   - Vercel will provide a URL like: `https://muqabla-nextjs.vercel.app`

2. **Test key functionality**
   - Landing page loads
   - Navigate to `/login`
   - Test authentication (you'll need valid Supabase credentials)
   - Navigate to `/feed`
   - Verify job cards display correctly

3. **Check Vercel dashboard**
   - Go to your project in Vercel
   - Click "Deployments" tab
   - Verify build completed successfully
   - Check for any errors in logs

## 🎯 Custom Domain (Optional)

If you want a custom domain:

1. **In Vercel Dashboard**
   - Go to Settings → Domains
   - Click "Add Domain"
   - Enter your domain (e.g., `muqabla.app`)

2. **Configure DNS**
   - Vercel will provide DNS records
   - Add them to your domain registrar (GoDaddy, Namecheap, etc.)
   - Wait for DNS propagation (usually 5-30 minutes)

## 🐛 Troubleshooting

### Build Errors

**"supabaseUrl is required"**
- Add environment variables in Vercel (see Step 3)
- Redeploy after adding variables

**TypeScript errors**
- Check the build logs in Vercel
- Fix issues locally, push, and redeploy

### Runtime Errors

**"Not a function" errors**
- Make sure all components have default exports
- Check that `export default` is used correctly

**Supabase connection issues**
- Verify NEXT_PUBLIC_SUPABASE_URL is correct
- Check NEXT_PUBLIC_SUPABASE_ANON_KEY is valid
- Ensure Supabase project is active

## 📊 Deployment Checklist

- [ ] Code pushed to GitHub
- [ ] GitHub repository created
- [ ] Vercel project created from GitHub
- [ ] Environment variables added in Vercel
- [ ] Supabase URL configured
- [ ] Supabase anon key configured
- [ ] Build successful in Vercel
- [ ] Site loads correctly
- [ ] Auth flow works (with valid credentials)
- [ ] Feed page loads jobs
- [ ] Styling looks correct

## 🚀 Quick Commands Reference

```bash
# Push to GitHub
git push

# Deploy to Vercel (from CLI)
vercel

# View deployment logs
vercel logs

# Check Vercel environment variables
vercel env ls
```

## 🎉 After Deployment

Once deployed:

1. **Monitor your Vercel project**
   - Check build logs
   - Monitor deployment history
   - Set up notifications for failed builds

2. **Continue development**
   - Develop locally with `npm run dev`
   - Push changes to GitHub
   - Vercel auto-deploys on push

3. **Scale as needed**
   - Vercel handles scaling automatically
   - Monitor performance in Vercel dashboard
   - Configure custom domains if needed

---

**Need Help?**
- [Next.js Deployment Docs](https://nextjs.org/docs/app/building-your-application/deploying)
- [Vercel Docs](https://vercel.com/docs)
- [Supabase Integration](https://supabase.com/docs/guides/with-nextjs)
