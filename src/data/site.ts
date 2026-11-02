export const site = {
  name: 'Aayera',
  url: 'https://www.aayera.com/',
  title: 'Aayera | Conferences, Summits and Professional Training',
  description:
    'Aayera is a global business information firm bringing industry together through conferences, summits, training, webinars and exhibitions across energy, mobility, healthcare and technology.',
  ogTitle: "Aayera | The future doesn't happen alone",
  ogDescription: 'Conferences, summits, training and exhibitions that put the right people in the same room.',
  ogImage: '/images/photos/stage.jpg',
  email: 'info@aayera.com',
  phones: [
    { label: '+91 80 48536267', href: 'tel:+918048536267' },
    { label: '+44 20 8068 2248', href: 'tel:+442080682248' },
  ],
  address: {
    street: '47, 3rd floor, Wheelers Road',
    area: 'Cox Town',
    city: 'Bangalore',
    postalCode: '560005',
    country: 'India',
    countryCode: 'IN',
  },
} as const;

export const navLinks = [
  { href: '#about', label: 'About' },
  { href: '#events', label: 'Events' },
  { href: '#industries', label: 'Industries' },
  { href: '#services', label: 'Services' },
  { href: '#clients', label: 'Clients' },
  { href: '#reach', label: 'Global' },
];
