# Curio

Curio is a seven-day interest discovery app. Each interest is one practical activity of about 15 minutes a day. After day seven, you continue, try a related interest, or start something new.

This repository started as Taster, a Next.js App Router catalog of skill days. The original slugs still redirect from `/skill/[slug]` to `/interests/[slug]`.

## Run locally

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Authentication

Copy `.env.example` to `.env.local` when you are ready to use Supabase Auth:

```bash
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

In the Supabase project, enable email and password auth and add `http://localhost:3000/**` and your Vercel domain (for example, `https://your-app.vercel.app/**`) to the redirect allow list. Email confirmation returns to `/onboarding`; password recovery returns to `/login`.

New accounts and returning users without a saved profile go through `/onboarding`. The setup asks about interests, goals, preferred session style, experience, and optional short reads. Supabase preferences are stored in user metadata; demo preferences stay in this browser. Interest suggestions use the central activity tags. The dashboard chart describes the mix of suggested activities and does not represent brain activity or a health assessment.

If those variables are missing, login and signup stay in a labelled local development mode. Demo mode stores a display name in this browser and does not check or store a password.

Challenge progress and reflection notes are saved in `localStorage` on the device. They are not synced to Supabase yet.
