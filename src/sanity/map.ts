import type { EnquiryPath, Heading, Img, PageContent, Sector } from '@/content/types';

/**
 * Turns the raw query result into PageContent. Any field left empty in Sanity
 * falls back to the matching built-in value, so a half-filled dataset still
 * renders a complete page. Pure function: no network, easy to test.
 */

type Raw = Record<string, any> | null | undefined;

const text = (v: unknown, fb: string): string => (typeof v === 'string' && v.trim() ? v : fb);
const list = <T>(v: unknown, fb: T[]): T[] => (Array.isArray(v) && v.length ? (v as T[]) : fb);
const strings = (v: unknown, fb: string[]) => list<string>(Array.isArray(v) ? v.filter((s) => typeof s === 'string' && s.trim()) : v, fb);

const heading = (raw: Raw, fb: Heading): Heading =>
  raw
    ? {
        eyebrow: raw.eyebrow ?? fb.eyebrow,
        heading: text(raw.heading, fb.heading),
        highlight: raw.highlight ?? undefined,
        intro: raw.intro ?? undefined,
      }
    : fb;

/** Sanity image → Img. Sizes the CDN URL and turns the hotspot into object-position. */
const image = (raw: Raw, fb: Img | undefined, width: number): Img | undefined => {
  if (!raw?.src) return fb;
  const h = raw.hotspot;
  return {
    src: `${raw.src}?w=${width}&auto=format&fit=max`,
    alt: raw.alt ?? '',
    width: raw.width,
    height: raw.height,
    caption: raw.caption ?? undefined,
    position: h ? `${Math.round(h.x * 100)}% ${Math.round(h.y * 100)}%` : undefined,
  };
};
const images = (raw: unknown, fb: Img[], width: number): Img[] => {
  const mapped = Array.isArray(raw) ? raw.map((r) => image(r, undefined, width)).filter((i): i is Img => !!i) : [];
  return mapped.length ? mapped : fb;
};
const logo = (src: unknown) => (typeof src === 'string' && src ? `${src}?w=460&auto=format` : null);

export function mapContent(raw: Raw, fb: PageContent): PageContent {
  const s = raw?.settings ?? {};
  const h = raw?.home ?? {};
  const hero = h.hero ?? {};
  const about = h.about ?? {};

  return {
    site: {
      title: text(s.title, fb.site.title),
      description: text(s.description, fb.site.description),
      shareTitle: text(s.shareTitle, fb.site.shareTitle),
      shareDescription: text(s.shareDescription, fb.site.shareDescription),
      shareImage: s.shareImage ? `${s.shareImage}?w=1200&h=630&fit=crop&auto=format` : fb.site.shareImage,
      email: text(s.email, fb.site.email),
      phones: list(
        (Array.isArray(s.phones) ? s.phones : []).filter((p: any) => p?.label && p?.number).map((p: any) => ({ label: p.label, href: `tel:${p.number}` })),
        fb.site.phones,
      ),
      address: { ...fb.site.address, ...Object.fromEntries(Object.entries(s.address ?? {}).filter(([k, v]) => !k.startsWith('_') && typeof v === 'string' && v)) },
      footerTagline: text(s.footerTagline, fb.site.footerTagline),
      noindex: s.searchVisibility ? s.searchVisibility !== 'visible' : fb.site.noindex,
    },

    hero: {
      tagline: text(hero.tagline, fb.hero.tagline),
      headlineLines: strings(hero.headlineLines, fb.hero.headlineLines),
      highlightWord: hero.headlineLines?.length ? hero.highlightWord ?? '' : fb.hero.highlightWord,
      subheading: text(hero.subheading, fb.hero.subheading),
      primaryCta: text(hero.primaryCta, fb.hero.primaryCta),
      secondaryCta: text(hero.secondaryCta, fb.hero.secondaryCta),
      reel: images(hero.reel, fb.hero.reel, 900),
      ringLogos: list(Array.isArray(hero.ringLogos) ? hero.ringLogos.map(logo).filter(Boolean) : [], fb.hero.ringLogos) as string[],
      stats: list(hero.stats, fb.hero.stats).map((st: any) => ({ label: st.label, value: Number(st.value) || 0, icon: st.icon ?? 'cal' })),
    },

    about: {
      eyebrow: text(about.eyebrow, fb.about.eyebrow),
      statement: text(about.statement, fb.about.statement),
      lede: text(about.lede, fb.about.lede),
      body: text(about.body, fb.about.body),
      ctaLabel: text(about.ctaLabel, fb.about.ctaLabel),
      steps: list(about.steps, fb.about.steps),
      motto: strings(about.motto, fb.about.motto),
      photos: images(about.photos, fb.about.photos, 1600),
    },

    events: {
      heading: heading(h.eventsHeading, fb.events.heading),
      items: list(
        (raw?.events ?? [])
          .filter((e: any) => e?.title && e?.image?.src)
          .map((e: any) => ({
            title: e.title,
            sector: e.sector as Sector,
            startDate: e.startDate,
            endDate: e.endDate ?? undefined,
            location: e.location ?? '',
            image: image(e.image, undefined, 800)!,
          })),
        fb.events.items,
      ),
    },

    clients: {
      heading: heading(h.clientsHeading, fb.clients.heading),
      logos: list(
        (h.clientLogos ?? []).filter((c: any) => c?.name && c?.logo).map((c: any) => ({ name: c.name, logo: logo(c.logo)! })),
        fb.clients.logos,
      ),
    },

    industries: {
      heading: heading(h.industriesHeading, fb.industries.heading),
      items: list(h.industries, fb.industries.items).map((i: any) => ({ sector: i.sector, title: i.title, body: i.body ?? '' })),
    },

    reach: {
      heading: heading(h.reachHeading, fb.reach.heading),
      regions: list(h.regions, fb.reach.regions).map((r: any) => ({ name: r.name, badge: r.badge ?? '', places: r.places ?? [], body: r.body ?? '' })),
      totals: list(h.reachTotals, fb.reach.totals),
    },

    why: {
      heading: heading(h.whyHeading, fb.why.heading),
      photos: images(h.whyPhotos, fb.why.photos, 1200),
      reasons: list(h.reasons, fb.why.reasons).map((r: any) => ({ ...r, body: r.body ?? '', icon: r.icon ?? 'people', ctaLabel: r.ctaLabel ?? 'Learn more' })),
    },

    participate: {
      heading: heading(h.participateHeading, fb.participate.heading),
      ways: list(h.ways, fb.participate.ways).map((w: any) => ({
        path: w.path as EnquiryPath,
        label: w.label ?? '',
        title: w.title,
        points: w.points ?? [],
        ctaLabel: w.ctaLabel ?? 'Get in touch',
      })),
    },

    services: {
      heading: heading(h.servicesHeading, fb.services.heading),
      items: list(h.services, [] as any[]).length
        ? h.services.map((sv: any, i: number) => ({
            title: sv.title,
            body: sv.body ?? '',
            cta: sv.ctaLabel ?? 'Get in touch',
            interest: sv.interest ?? 'Conferences & summits',
            photo: image(sv.photo, fb.services.items[i]?.photo ?? fb.services.items[0].photo, 1400)!,
          }))
        : fb.services.items,
    },

    faq: {
      heading: heading(h.faqHeading, fb.faq.heading),
      items: list(h.faqs, fb.faq.items),
    },

    contact: { heading: heading(h.contactHeading, fb.contact.heading) },
    ticker: strings(h.tickerWords, fb.ticker),
  };
}
