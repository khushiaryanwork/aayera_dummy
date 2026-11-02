# Aayera website

Marketing site for [Aayera](https://www.aayera.com), built with [Astro](https://astro.build) and React.

## Getting started

Requires Node.js 22 or newer.

```bash
npm install
npm run dev       # local dev server at http://localhost:4321
npm run build     # type-check, then build the static site into dist/
npm run preview   # serve the built site locally
```

## Project structure

```
public/                  Static files served as-is
  favicon.png
  images/                Photos, event artwork, client logos, map
src/
  pages/index.astro      The home page — assembles the sections
  layouts/BaseLayout.astro   <head>, SEO tags, global styles and scripts
  components/
    sections/            One Astro component per page section (no JS shipped)
    islands/             Interactive React components, hydrated with client:* directives
    ui/                  Small shared pieces (icon sprite, arrow icon)
  data/                  Site content: events, clients, services, FAQs, contact details
  stores/ui.ts           Shared state between islands (nanostores)
  hooks/                 React hooks
  scripts/               Vanilla scripts for scroll effects, marquees and cross-section links
  styles/
    tokens.css           Design tokens — colours, type scale, spacing, motion
    global.css           Site styles
```

## Editing content

Most copy lives in `src/data/`. To add a past event, add an entry to `src/data/events.ts` and put its artwork in `public/images/events/`. Client logos are in `src/data/clients.ts`.

## How the pieces talk to each other

Static sections link to interactive ones through data attributes, handled in `src/scripts/intents.ts`:

| Attribute | Effect |
| --- | --- |
| `data-goto="energy"` | Filters the events carousel |
| `data-path="partner"` | Selects a path in the enquiry form |
| `data-interest="..."` | Selects an interest in the enquiry form |
| `data-topic="..."` | Prefills the enquiry message about a past event |

## Before launch

The site is set to `noindex` while it's a preview. Pass `noindex={false}` to `BaseLayout` in `src/pages/index.astro` when it goes live on aayera.com.
