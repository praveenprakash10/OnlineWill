# OnlineWill.in

Next.js site for [OnlineWill.in](https://onlinewill.in): educational articles now, will-creation product later.

## Structure

| Route | Purpose |
| --- | --- |
| `/` | Temporary homepage listing latest articles |
| `/articles` | Full articles archive (stable long-term section) |
| `/articles/[slug]` | Individual article pages |
| `/sitemap.xml` | Auto-generated sitemap for search engines |
| `/robots.txt` | Crawler rules |

Articles live as Markdown in `content/articles/`. When the product launches, replace only `src/app/page.tsx` with the product homepage. Keep `/articles` unchanged so URLs and SEO stay intact.

## Add an article

1. Create `content/articles/your-slug.md`
2. Add front matter:

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

3. Visit `/articles/your-slug` (or the homepage list).

### Images

- Put files in `public/images/articles/` (or any `public/` path).
- In Markdown:

```md
![Alt text for accessibility & SEO](/images/articles/example.jpg "Optional caption shown under the image")
```

- Remote images (e.g. Unsplash) also work: `![Alt](https://images.unsplash.com/...)`
- Cover images use `cover` / `coverAlt` in front matter and appear on cards + article headers (Open Graph too).

### YouTube embeds

Paste a YouTube URL alone on its own line (watch, short, or youtu.be links):

```md
https://www.youtube.com/watch?v=VIDEO_ID
```

It renders as a responsive 16:9 embed.

## SEO included

- Per-article title, description, canonical URL
- Open Graph + Twitter cards (with cover image when set)
- JSON-LD `Article` structured data
- `sitemap.xml` and `robots.txt`

## Local development

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Deploy to Vercel

1. Push this repo to GitHub.
2. In [Vercel](https://vercel.com/new), import the repo.
3. Framework preset: **Next.js** (auto-detected).
4. Add domain `onlinewill.in` under Project → Settings → Domains.
5. Point DNS as Vercel instructs.

## Later: product homepage

1. Build the will product under routes such as `/create` or `/app`.
2. Replace the homepage content in `src/app/page.tsx`.
3. Keep nav link to **Articles**.
4. No need to move existing posts—they already use `/articles/...`.

## Stack

- Next.js (App Router) + TypeScript
- Tailwind CSS
- Markdown via `gray-matter` + `remark` / `rehype` (images, YouTube, GFM)
