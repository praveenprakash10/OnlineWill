# OnlineWill.in

Next.js site for [OnlineWill.in](https://onlinewill.in): educational articles now, will-creation product later.

## Structure

| Route | Purpose |
| --- | --- |
| `/` | Temporary homepage listing latest articles |
| `/articles` | Full articles archive |
| `/articles/[slug]` | Individual article pages |
| `/faq`, `/contact` | Editable pages (`content/pages/`) |
| `/admin` | TinaCMS editor |
| `/sitemap.xml` | Sitemap |
| `/robots.txt` | Crawler rules |

Content lives as Markdown in `content/articles/` and `content/pages/`. When the product launches, replace only `src/app/page.tsx`. Keep `/articles` unchanged.

## Edit with TinaCMS (recommended)

### Local

```bash
npm install
npm run dev
```

Open [http://localhost:3000/admin](http://localhost:3000/admin) — no login required in local mode.

- **Articles** → create/edit posts (saved to `content/articles/`)
- **Pages** → edit FAQ, Contact, or add new pages (saved to `content/pages/`)

### Production (Vercel)

1. Create a project at [app.tina.io](https://app.tina.io) and connect `praveenprakash10/OnlineWill`.
2. Copy **Client ID** and **Read-only token** into Vercel env vars (and a local `.env` from `.env.example`):

```bash
NEXT_PUBLIC_TINA_CLIENT_ID=...
TINA_TOKEN=...
```

3. Redeploy. Editors sign in at `https://onlinewill.in/admin`.

Tina commits changes to GitHub; Vercel rebuilds the site.

> Commit `tina/tina-lock.json` whenever the schema changes so TinaCloud can index your content.

## Edit Markdown by hand (optional)

Same as before: edit files under `content/`, commit, push.

### Article front matter

```md
---
title: Your title
description: One or two sentences for listings and SEO.
date: 2026-09-23
updated: 2026-09-26
cover: /images/articles/your-cover.jpg
coverAlt: Short description of the cover image
author: OnlineWill.in
tags:
  - basics
---

Markdown body here.
```

### Images & YouTube

```md
![Alt text](/images/articles/example.jpg "Optional caption")

https://www.youtube.com/watch?v=VIDEO_ID
```

(YouTube URL must be alone on its own line.)

## SEO included

- Per-article/page metadata, Open Graph, Twitter cards
- JSON-LD for articles
- `sitemap.xml` and `robots.txt`

## Deploy to Vercel

1. Import the GitHub repo in [Vercel](https://vercel.com/new).
2. Add Tina env vars when you enable TinaCloud.
3. Add domain `onlinewill.in`.

## Stack

- Next.js (App Router) + TypeScript + Tailwind
- Markdown via `gray-matter` + `remark` / `rehype`
- TinaCMS for browser-based editing
