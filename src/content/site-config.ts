import type { EnquiryPath, Sector } from './types';

/** Fixed parts of the site that belong in code rather than the CMS. */

export const siteUrl = 'https://www.aayera.com/';

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#events', label: 'Events' },
  { href: '#industries', label: 'Industries' },
  { href: '#services', label: 'Services' },
  { href: '#clients', label: 'Clients' },
  { href: '#reach', label: 'Global' },
];

export const sectorLabels: Record<Sector, string> = {
  energy: 'Energy',
  mobility: 'Mobility',
  health: 'Healthcare',
  tech: 'Technology',
};

export const interests = [
  'Conferences & summits',
  'Training & development',
  'Webinars & networking',
  'Partnerships & sponsorship',
  'Something else',
] as const;

export const enquiryPaths: Record<EnquiryPath, { label: string; interest: string; note: string }> = {
  attend: {
    label: 'Attend & learn',
    interest: 'Conferences & summits',
    note: "Tell us your industry and we'll point you to the relevant programme.",
  },
  partner: {
    label: 'Partner & exhibit',
    interest: 'Partnerships & sponsorship',
    note: "Tell us who you want to reach and we'll talk through sponsorship and exhibition options.",
  },
  organise: {
    label: 'Run an event',
    interest: 'Conferences & summits',
    note: 'Share your brief. Venue, speakers, registration, sponsors and exhibitors can all sit with us.',
  },
};

/** Client logos scroll in three rows; these set each row's loop length and direction. */
export const marqueeRows = [
  { duration: '58s', reverse: false },
  { duration: '64s', reverse: true },
  { duration: '52s', reverse: false },
];
