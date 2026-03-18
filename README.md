# amandanasario.com

Personal website built with **Next.js 14**, **Keystatic CMS**, **Tailwind CSS**, and deployed on **Vercel** (free tier).

## Tech Stack

| Layer | Technology | Why |
|---|---|---|
| Framework | [Next.js 14](https://nextjs.org) (App Router) | Performance, SSG, great DX |
| CMS | [Keystatic](https://keystatic.com) | Free, Git-backed, beautiful Studio UI |
| Styling | [Tailwind CSS v3](https://tailwindcss.com) | Utility-first, fast |
| Hosting | [Vercel](https://vercel.com) | Free personal tier, auto-deploys |
| Domain | amandanasario.com | Via your registrar |

## Sections

- `/` — Homepage with hero, recent articles, featured projects
- `/about` — Bio, CV download, skills, contact
- `/articles` — CMS-managed blog, grouped by year
- `/services` — CMS-managed service offerings
- `/portfolio` — CMS-managed projects with KPIs
- `/keystatic` — CMS Studio (edit all content here)

---

## Local Development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to view the site.

Open [http://localhost:3000/keystatic](http://localhost:3000/keystatic) to manage content — no setup needed in development (uses "local" mode, saves files directly to your repo).

---

## Deployment to Vercel

### 1 — Push to GitHub

```bash
git remote add origin https://github.com/nasarioamn/amandanasario.com.git
git push -u origin main
```

### 2 — Import to Vercel

1. Go to [vercel.com/new](https://vercel.com/new)
2. Import your GitHub repository
3. Click **Deploy** — Vercel auto-detects Next.js

### 3 — Connect your domain

In Vercel → Project → Settings → Domains, add `amandanasario.com` and follow the DNS instructions for your registrar.

### 4 — Enable the CMS in production (Keystatic GitHub mode)

In production, Keystatic saves article edits as GitHub PRs (Vercel auto-deploys on merge).

**a) Create a GitHub OAuth App**

Go to GitHub → Settings → Developer Settings → OAuth Apps → New OAuth App:
- Homepage URL: `https://amandanasario.com`
- Authorization callback URL: `https://amandanasario.com/api/keystatic/github/oauth/callback`

**b) Add environment variables in Vercel**

| Variable | Value |
|---|---|
| `KEYSTATIC_GITHUB_CLIENT_ID` | Your OAuth App Client ID |
| `KEYSTATIC_GITHUB_CLIENT_SECRET` | Your OAuth App Client Secret |
| `KEYSTATIC_SECRET` | Any random string (run `openssl rand -hex 32`) |

After redeploying, go to `https://amandanasario.com/keystatic` to log in and manage content.

---

## Content Structure

All content lives in the `/content` directory and is version-controlled in Git.

```
content/
├── about.json          ← Your bio, title, skills, social links
├── services.json       ← Your service offerings
├── articles/           ← One JSON file per article
│   └── hello-world.json
└── projects/           ← One JSON file per project
    └── example-project.json
```

### Editing content

**Locally:** `npm run dev` → open `/keystatic`

**In production:** `https://amandanasario.com/keystatic` (requires GitHub OAuth setup above)

---

## Customization

- **Colors**: edit `accent` in `tailwind.config.ts`
- **Fonts**: swap `Inter` in `app/layout.tsx`
- **Layout**: edit `components/Navigation.tsx` and `components/Footer.tsx`
- **Pages**: each page is a single file in `app/`
