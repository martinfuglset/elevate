# SaaS MVP Template

A production-ready boilerplate for **Next.js 14 (App Router)**, **TypeScript**, **Tailwind CSS** & **shadcn/ui**.  
Start demoing in minutes with built-in **mock authentication** and upgrade to **Supabase** (or any backend) whenever you're ready – no breaking changes required.

> **Note:** This is a **private, proprietary template** used internally for building client MVPs. It is **not open-source**.

---

## ✨ Features

• **Zero-Config Start-Up** – runs without a database thanks to mocked auth & data.  
• **Opt-in Supabase** – add real auth, Postgres & Storage by dropping credentials in `.env.local`.  
• **Beautiful UI** – pre-built responsive dashboard using shadcn/ui & Lucide icons.  
• **Type-Safe** – strict TypeScript across server & client.  
• **Testing Ready** – Jest & React-Testing-Library pre-configured.  
• **CI/CD** – GitHub Actions workflow for automatic Vercel deployments.  
• **Error Boundaries & Loading States** baked in.

---

## 🗂️ Project Structure

```text
src/
└─ app/                     # Next.js app router
   ├─ (auth)/               # Public auth routes
   │   ├─ login/
   │   └─ register/
   ├─ (dashboard)/          # Protected routes (mock-guarded)
   │   ├─ dashboard/
   │   ├─ help/
   │   ├─ settings/
   │   └─ users/
   ├─ api/                  # Route handlers – example auth endpoint
   ├─ globals.css           # Tailwind base styles
   ├─ layout.tsx            # Root layout (includes fonts & ThemeProvider)
   └─ page.tsx              # Landing page

components/
├─ layout/                  # Sidebar & Header
├─ dashboard/               # Charts & tables
└─ ui/                      # Re-exported shadcn/ui primitives

lib/                        # Server / shared utilities
└─ auth.ts, db.ts, utils.ts
```

---

## 🚀 Getting Started

1. **Clone & Install**

   ```bash
   git clone https://github.com/your-org/saas-mvp-template.git
   cd saas-mvp-template
   npm install
   # or: pnpm install / yarn
   ```

2. **Run Dev Server**

   ```bash
   npm run dev
   # visit http://localhost:3000
   ```

   • Sign-in with any e-mail / password (mock auth).  
   • Explore the dashboard – all data is placeholder JSON.

---

## 🔑 Environment Variables

Create a local copy and fill the keys you need:

```bash
cp env.example .env.local
```

**Required for mocked mode**: none 🙌  
**Add when you want real Supabase**:

```env
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...
SUPABASE_SERVICE_ROLE_KEY=...
```

The rest of the keys in `env.example` are optional integrations (OAuth, Stripe, etc.). Remove anything you don't use.

---

## 🧩 Scripts

```bash
npm run dev           # Start dev server
npm run build         # Production build
npm run start         # Start production server
npm run lint          # ESLint
npm run test          # Jest test suite
```

---

## 🛫 Deploying to Vercel

1. Push your repo to GitHub.  
2. In Vercel, **New Project → Import** the repo.  
3. Add the same environment variables under **Settings → Environment Variables**.  
4. Click **Deploy** – done 🎉.

---

## 🧪 Testing

```bash
npm test            # run all tests once
npm run test:watch  # watch mode
```

---

## 🤝 Contributing / Customising

• Update navigation links in `src/lib/navigation.ts`.  
• Add new dashboard pages by creating folders under `src/app/(dashboard)/`.  
• Switch to another backend by replacing calls in `lib/db.ts` & `lib/auth.ts` – the rest of the code stays the same.

Internal improvements are welcome—open a pull request within this private repository.

---

## 📄 License & Usage

This codebase is **proprietary and confidential**. You may use, modify, and deploy it for projects undertaken by your organisation and its clients. **Redistribution or public disclosure of any part of the source code is prohibited without explicit written permission.** 