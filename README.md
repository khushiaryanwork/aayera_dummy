# Aayera website

Marketing site for [Aayera](https://www.aayera.com), built with [Astro](https://astro.build) and React. Content is managed in [Sanity](https://www.sanity.io), with the editing Studio built into the site at `/studio`.

**Preview:** [website](https://khushiaryanwork.github.io/aayera_dummy/) · [Sanity Studio](https://khushiaryanwork.github.io/aayera_dummy/studio/) (GitHub Pages, redeploys on every push to `main`)

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
npm run dev       # site at http://localhost:4321, Studio at http://localhost:4321/studio
npm run build     # type-check, then build the static site into dist/
npm run preview   # serve the built site locally
```

## Editing content

Open `/studio` (locally or on the live site) and log in with your Sanity account. The sidebar has:

- **Home page** – every section of the page, one tab per section, in page order
- **Site settings** – contact details, SEO and sharing, and the search-engine visibility switch
- **Events** – the past events carousel, sorted newest first automatically
- **Clients** – client organisations and their logos. Choose which ones appear (and in what order) under Home page → Clients, and Home page → Hero → Logos on the ring

Edits appear on the live site after the next build (see *Publishing* below).

What stays in code: the navigation links, the four industry illustrations, the world map, the hero orbit chips, and the enquiry form options (`src/content/site-config.ts`).

## Project structure

```
public/images/              Static images (also used as fallbacks)
sanity.config.ts            Studio configuration
sanity.cli.ts               Sanity CLI configuration
src/
  pages/index.astro         The home page — loads content, assembles sections
  layouts/BaseLayout.astro  <head>, SEO tags, global styles and scripts
  components/
    sections/               One Astro component per page section
    islands/                Interactive React components (carousel, form, accordion…)
    scenes/                 Animated industry illustrations
    ui/                     Icon sprite, arrow icon
  content/
    types.ts                The content shape every component renders from
    fallback.ts             The original copy — used for anything empty in Sanity
    site-config.ts          Fixed settings that live in code
    format.ts               Date ranges, logo rows, email links
  sanity/
    schema-types/           Content model (documents, singletons, objects)
    structure.ts            Studio sidebar
    queries.ts              The GROQ query for the page
    map.ts                  Turns the query result into page content
    load.ts                 Fetches once per build, falls back if Sanity is unreachable
  stores/ui.ts              Shared state between React islands (nanostores)
  scripts/                  Scroll effects, marquees, cross-section links
  styles/                   Design tokens and global styles
```

If a field is left empty in Sanity, the original copy from `src/content/fallback.ts` is used, so the page never renders with gaps. If Sanity can't be reached during a build, the build still succeeds with that content and logs a warning.

## Deploying to Cloudflare Pages

1. In Cloudflare, create a Pages project connected to this repository.
2. Build command: `npm run build` · Build output directory: `dist`. Node 22 is picked up from `.node-version`.
3. To use the Studio on your `*.pages.dev` address as well as aayera.com, add that address as a CORS origin (with credentials) in sanity.io/manage → API → CORS origins. `localhost:4321`, `aayera.com` and `www.aayera.com` are already added.

## Publishing (rebuild on publish)

The site is static, so content changes go live when the site rebuilds. To make that happen automatically:

1. **Cloudflare:** in the Pages project's build settings, create a *Deploy hook* for the `main` branch and copy its URL.
2. **Sanity:** in sanity.io/manage → API → Webhooks, create a webhook:
   - URL: the deploy hook URL
   - Dataset: `production`
   - Trigger on: create, update, delete
   - Filter: `_type in ["homePage", "siteSettings", "event", "client"]`
   - HTTP method: POST

Publishing in the Studio then rebuilds the site; changes are live a minute or two later.

## Before launch

In the Studio, open **Site settings → SEO & sharing** and switch *Search visibility* to *Visible to search engines*, then publish.
