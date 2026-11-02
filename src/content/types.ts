/** The shape every component renders from, whether it came from Sanity or the built-in fallback. */

export type Sector = 'energy' | 'mobility' | 'health' | 'tech';
export type EnquiryPath = 'attend' | 'partner' | 'organise';

export interface Img {
  src: string;
  alt: string;
  width?: number;
  height?: number;
  /** CSS object-position, from the Sanity hotspot */
  position?: string;
  caption?: string;
}

export interface Heading {
  eyebrow?: string;
  heading: string;
  highlight?: string;
  intro?: string;
}

export interface EventItem {
  title: string;
  sector: Sector;
  /** ISO dates, e.g. 2021-06-21 */
  startDate: string;
  endDate?: string;
  location: string;
  image: Img;
}

export interface Client {
  name: string;
  logo: string;
}

export interface Service {
  title: string;
  body: string;
  cta: string;
  interest: string;
  photo: Img;
}

export interface PageContent {
  site: {
    title: string;
    description: string;
    shareTitle: string;
    shareDescription: string;
    shareImage: string;
    email: string;
    phones: { label: string; href: string }[];
    address: { street: string; area: string; city: string; postalCode: string; country: string; countryCode: string };
    footerTagline: string;
    noindex: boolean;
  };
  hero: {
    tagline: string;
    headlineLines: string[];
    highlightWord: string;
    subheading: string;
    primaryCta: string;
    secondaryCta: string;
    reel: Img[];
    ringLogos: string[];
    stats: { label: string; value: number; icon: string }[];
  };
  about: {
    eyebrow: string;
    statement: string;
    lede: string;
    body: string;
    ctaLabel: string;
    steps: { title: string; body: string; target: string }[];
    motto: string[];
    photos: Img[];
  };
  events: { heading: Heading; items: EventItem[] };
  clients: { heading: Heading; logos: Client[] };
  industries: { heading: Heading; items: { sector: Sector; title: string; body: string }[] };
  reach: { heading: Heading; regions: { name: string; badge: string; places: string[]; body: string }[]; totals: { label: string; value: string }[] };
  why: { heading: Heading; photos: Img[]; reasons: { title: string; body: string; icon: string; ctaLabel: string; target: string }[] };
  participate: { heading: Heading; ways: { path: EnquiryPath; label: string; title: string; points: string[]; ctaLabel: string }[] };
  services: { heading: Heading; items: Service[] };
  faq: { heading: Heading; items: { question: string; answer: string }[] };
  contact: { heading: Heading };
  ticker: string[];
}
