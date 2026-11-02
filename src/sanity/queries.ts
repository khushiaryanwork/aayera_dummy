import { defineQuery } from 'groq';

const image = /* groq */ `{
  "src": asset->url,
  "width": asset->metadata.dimensions.width,
  "height": asset->metadata.dimensions.height,
  alt,
  caption,
  hotspot
}`;

const heading = /* groq */ `{ eyebrow, heading, highlight, intro }`;
const client = /* groq */ `{ name, "logo": logo.asset->url }`;

/** Everything the home page needs, in one request. */
export const PAGE_QUERY = defineQuery(/* groq */ `{
  "settings": *[_id == "siteSettings"][0]{
    title, description, shareTitle, shareDescription,
    "shareImage": shareImage.asset->url,
    email, phones[]{ _key, label, number }, address, footerTagline, searchVisibility
  },
  "home": *[_id == "homePage"][0]{
    hero{
      tagline, headlineLines, highlightWord, subheading, primaryCta, secondaryCta,
      reel[]${image},
      "ringLogos": ringClients[]->logo.asset->url,
      stats[]{ _key, label, value, icon }
    },
    about{ eyebrow, statement, lede, body, ctaLabel, steps[]{ _key, title, body, target }, motto, photos[]${image} },
    eventsHeading${heading},
    clientsHeading${heading},
    "clientLogos": clientLogos[]->${client},
    industriesHeading${heading},
    industries[]{ _key, sector, title, body },
    reachHeading${heading},
    regions[]{ _key, name, badge, places, body },
    reachTotals[]{ _key, label, value },
    whyHeading${heading},
    whyPhotos[]${image},
    reasons[]{ _key, title, body, icon, ctaLabel, target },
    participateHeading${heading},
    ways[]{ _key, path, label, title, points, ctaLabel },
    servicesHeading${heading},
    services[]{ _key, title, body, ctaLabel, interest, "photo": image${image} },
    faqHeading${heading},
    faqs[]{ _key, question, answer },
    contactHeading${heading},
    tickerWords
  },
  "events": *[_type == "event" && defined(startDate)] | order(startDate desc){
    _id, title, sector, startDate, endDate, location, "image": image${image}
  }
}`);
