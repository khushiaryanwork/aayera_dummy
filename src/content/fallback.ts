import type { PageContent } from './types';

/**
 * The site's original content. Used for any field that is empty in Sanity,
 * and for the whole page if Sanity can't be reached at build time.
 * `npm run seed` imports exactly this into an empty dataset.
 */

const photo = (name: string) => `/images/photos/${name}.jpg`;
const logo = (n: number) => `/images/clients/${n}.png`;

export const fallback: PageContent = {
  site: {
    title: 'Aayera | Conferences, Summits and Professional Training',
    description:
      'Aayera is a global business information firm bringing industry together through conferences, summits, training, webinars and exhibitions across energy, mobility, healthcare and technology.',
    shareTitle: "Aayera | The future doesn't happen alone",
    shareDescription: 'Conferences, summits, training and exhibitions that put the right people in the same room.',
    shareImage: photo('stage'),
    email: 'info@aayera.com',
    phones: [
      { label: '+91 80 48536267', href: 'tel:+918048536267' },
      { label: '+44 20 8068 2248', href: 'tel:+442080682248' },
    ],
    address: { street: '47, 3rd floor, Wheelers Road', area: 'Cox Town', city: 'Bangalore', postalCode: '560005', country: 'India', countryCode: 'IN' },
    footerTagline: 'Connecting people, knowledge and business possibilities.',
    noindex: true,
  },

  hero: {
    tagline: 'The meeting point for industry',
    headlineLines: ['The future', "doesn't happen", 'alone.'],
    highlightWord: 'future',
    subheading: 'We bring people and ideas into the same room, through conferences, summits, training and exhibitions.',
    primaryCta: 'Discover our events',
    secondaryCta: 'Learn more about us',
    reel: [
      { src: photo('stage'), alt: '', position: '45% 50%', caption: 'IoT India Confex 2017' },
      { src: photo('delegates'), alt: '', position: '60% 50%', caption: 'In the room' },
      { src: photo('group'), alt: '', position: '52% 40%', caption: 'On the exhibition floor' },
      { src: photo('demo'), alt: '', position: '30% 50%', caption: 'At the exhibits' },
    ],
    ringLogos: [25, 2, 7, 11, 20, 16].map(logo),
    stats: [
      { label: 'Past events listed', value: 7, icon: 'cal' },
      { label: 'Host cities', value: 5, icon: 'pin' },
      { label: 'Client organisations', value: 25, icon: 'people' },
      { label: 'Countries of presence', value: 6, icon: 'globe' },
    ],
  },

  about: {
    eyebrow: 'Who we are',
    statement: 'Every breakthrough begins with a meeting of minds.',
    lede: 'Aayera is a global business information firm bringing people together through conferences, summits, training and exhibitions.',
    body: 'Our work connects industry insight with real conversations, so professionals can build knowledge, exchange perspectives and explore their next opportunity.',
    ctaLabel: 'See what we do',
    steps: [
      { title: 'Learn', body: 'Expand your perspective.', target: '#services' },
      { title: 'Connect', body: 'Be part of the conversation.', target: '#events' },
      { title: 'Collaborate', body: 'Make your next move.', target: '#participate' },
    ],
    motto: ['People.', 'Knowledge.', 'Possibility.'],
    photos: [
      { src: photo('group'), alt: 'Delegates and exhibitors together on the event floor', position: '50% 35%', caption: 'On the exhibition floor' },
      { src: photo('delegates'), alt: 'Delegates in conversation at a conference table', position: '60% 50%' },
      { src: photo('demo'), alt: 'Delegates discussing a smart meter on display', position: '30% 50%' },
    ],
  },

  events: {
    heading: { eyebrow: 'Our event record', heading: 'The rooms where ideas', highlight: 'met opportunity' },
    items: [
      {
        title: 'EV Charging Summit', sector: 'mobility', startDate: '2021-06-21', endDate: '2021-06-22', location: 'Bengaluru, India',
        image: { src: '/images/events/ev-charging-2021.jpg', alt: 'EV Charging Summit 2021 event artwork', width: 1280, height: 648 },
      },
      {
        title: 'Smart Meter Summit', sector: 'energy', startDate: '2021-06-07', endDate: '2021-06-08', location: 'Bengaluru, India',
        image: { src: '/images/events/smart-meter-2021.jpg', alt: 'Smart Meter Summit 2021 event artwork', width: 1080, height: 600 },
      },
      {
        title: 'Turkey Healthcare Project Delivery Conference', sector: 'health', startDate: '2020-04-08', endDate: '2020-04-09', location: 'Ankara, Turkey',
        image: { src: '/images/events/turkey-healthcare-2020.jpg', alt: 'Turkey Healthcare Project Delivery Conference 2020 event artwork', width: 551, height: 321 },
      },
      {
        title: 'Africa Healthcare Manufacturers and Distributors Summit', sector: 'health', startDate: '2020-03-24', endDate: '2020-03-25', location: 'Cape Town, South Africa',
        image: { src: '/images/events/africa-manufacturers-2020.jpg', alt: 'Africa Healthcare Manufacturers and Distributors Summit 2020 event artwork', width: 551, height: 321 },
      },
      {
        title: 'Africa Healthcare Development & Project Delivery Conference', sector: 'health', startDate: '2019-09-11', endDate: '2019-09-12', location: 'Johannesburg, South Africa',
        image: { src: '/images/events/africa-development-2019.jpg', alt: 'Africa Healthcare Development and Project Delivery Conference 2019 event artwork', width: 551, height: 321 },
      },
      {
        title: 'Hybrid & Electric Vehicle Confex', sector: 'mobility', startDate: '2018-08-09', endDate: '2018-08-10', location: 'Pune, India',
        image: { src: '/images/events/hybrid-ev-2018.png', alt: 'Hybrid and Electric Vehicle Confex 2018 event artwork', width: 551, height: 321 },
      },
      {
        title: 'IoT India Confex', sector: 'tech', startDate: '2017-08-24', endDate: '2017-08-25', location: 'Le Méridien, Bengaluru, India',
        image: { src: '/images/events/iot-india-2017.jpg', alt: 'IoT India Confex 2017 event artwork', width: 1280, height: 466 },
      },
    ],
  },

  clients: {
    heading: { eyebrow: 'Our clients', heading: 'Good company. Great connections.', intro: 'Connecting with organisations across industries and around the world.' },
    logos: [
      ['ABB', 25], ['EY', 2], ['Tata Communications', 7], ['Saudi Aramco', 11], ['Dell', 16], ['Hitachi', 20], ['Wipro', 19], ['DP World', 10], ['Jio', 26],
      ['Larsen & Toubro', 23], ['Qatar Petroleum', 13], ['Tech Mahindra', 22], ['Experian', 18], ['Hamad Medical Corporation', 6], ['Arrow Electronics', 9], ['Petroleum Development Oman', 15], ['Mahindra SSG', 21],
      ['Egyptian Petrochemicals Holding Company', 8], ['ROHM Semiconductor', 24], ['LetsTrack', 1], ['MultiTech', 3], ['Silvan', 5], ['Subex', 4], ['Mindteck', 14], ['Cellcomm', 12],
    ].map(([name, n]) => ({ name: name as string, logo: logo(n as number) })),
  },

  industries: {
    heading: { eyebrow: 'Industries in focus', heading: 'Different worlds.', highlight: 'One shared future.', intro: 'Specialist conversations around the challenges and opportunities that matter.' },
    items: [
      { sector: 'energy', title: 'Energy & utilities', body: 'Smart metering and the distribution companies behind it.' },
      { sector: 'mobility', title: 'Mobility & transport', body: 'EV charging and hybrid electric vehicles.' },
      { sector: 'health', title: 'Healthcare', body: 'Project delivery, manufacturing and distribution.' },
      { sector: 'tech', title: 'Technology', body: 'The Internet of Things and commercialising new research.' },
    ],
  },

  reach: {
    heading: {
      eyebrow: 'Global presence',
      heading: 'Across borders. Around the same table.',
      intro: 'We combine international perspective with local understanding, bringing businesses, experts and decision-makers into the same conversation.',
    },
    regions: [
      { name: 'India', badge: '4 events', places: ['Bengaluru', 'Pune'], body: 'Our Bangalore home, and the base for our energy, mobility and technology programmes.' },
      { name: 'Africa', badge: '2 events', places: ['Johannesburg', 'Cape Town'], body: 'Healthcare development, manufacturing and distribution.' },
      { name: 'Middle East', badge: 'Presence', places: ['Saudi Arabia', 'Qatar', 'United Arab Emirates'], body: 'Local understanding across the Gulf.' },
      { name: 'Europe & Turkey', badge: '1 event', places: ['Ankara', 'United Kingdom'], body: 'Healthcare project delivery in Turkey, and a presence in the UK.' },
      { name: 'Americas', badge: 'Presence', places: ['United States'], body: 'Connecting North American business to our programmes.' },
    ],
    totals: [
      { label: 'Countries of presence', value: '6' },
      { label: 'Host cities', value: '5' },
      { label: 'Client organisations', value: '25' },
    ],
  },

  why: {
    heading: { eyebrow: 'A few words about us', heading: 'Why work with Aayera?' },
    photos: [
      { src: photo('delegates'), alt: 'Delegates listening at a conference table' },
      { src: photo('conference'), alt: 'A speaker addressing a full conference hall' },
      { src: photo('demo'), alt: 'Delegates discussing a product on display' },
    ],
    reasons: [
      { title: 'The right minds', body: 'We bring businesses, experts and decision-makers together, so the people you need are in the room.', icon: 'people', ctaLabel: 'View events', target: '#events' },
      { title: 'Relevant conversations', body: 'Each programme is built around a specific industry and the challenges that matter to it.', icon: 'chat', ctaLabel: 'View industries', target: '#industries' },
      { title: 'Global outlook, local understanding', body: 'An on-the-ground presence across six countries, with events from Bengaluru to Cape Town.', icon: 'globe', ctaLabel: 'View our reach', target: '#reach' },
      { title: 'Delivered end to end', body: 'Venue and accommodation, speakers, registration, sponsors and exhibitions, all in one team.', icon: 'clipboard', ctaLabel: 'Discuss your brief', target: '#contact' },
    ],
  },

  participate: {
    heading: { eyebrow: 'Ways to participate', heading: "There's a place for your ambition." },
    ways: [
      { path: 'attend', label: 'Attend', title: 'Come for the room and the conversation', points: ['Relevant conferences and training', 'Perspectives from experts and peers', 'Business networking opportunities'], ctaLabel: 'Enquire about programmes' },
      { path: 'partner', label: 'Partner & exhibit', title: 'Put your brand in front of your industry', points: ['Sponsorship opportunities', 'Exhibition space', 'Connected to your audience'], ctaLabel: 'Explore partnerships' },
      { path: 'organise', label: 'Organise', title: 'Bring us your event brief', points: ['Conference planning', 'Professional development', 'Speakers, registration and sponsors'], ctaLabel: 'Discuss your brief' },
    ],
  },

  services: {
    heading: { eyebrow: 'Our expertise', heading: 'Services that set things in motion.', intro: 'Knowledge to move forward. Connections to make it happen.' },
    items: [
      {
        title: 'Conferences & summits',
        body: 'Industry-focused conferences and summits that bring businesses, experts and decision-makers together to exchange ideas and explore opportunities.',
        cta: 'Discuss your next event', interest: 'Conferences & summits',
        photo: { src: photo('conference'), alt: 'A speaker addressing a conference hall' },
      },
      {
        title: 'Professional training',
        body: 'Professional learning across management, finance, engineering and operations, with practical ideas and tools to support people and business performance.',
        cta: 'Explore training', interest: 'Training & development',
        photo: { src: photo('training'), alt: 'A trainer presenting to a small group' },
      },
      {
        title: 'Webinars & networking',
        body: 'Webinars and networking that bring professionals into conversation with experts, peers and potential business partners.',
        cta: 'Find your next connection', interest: 'Webinars & networking',
        photo: { src: photo('webinar'), alt: 'A team on a video call with colleagues' },
      },
    ],
  },

  faq: {
    heading: { eyebrow: 'Questions', heading: 'Before we connect.' },
    items: [
      { question: 'What kinds of events does Aayera organise?', answer: 'Conferences, summits, training programmes, webinars and exhibitions, alongside business networking opportunities.' },
      { question: 'Can you plan an event for our organisation?', answer: "Yes. Our event services cover venue and accommodation, speakers, registration, sponsors and exhibitions. Tell us your objectives and we'll start from there." },
      { question: 'Where can I find upcoming event dates?', answer: 'The events on this page are past programmes. Email info@aayera.com for current dates, locations and availability.' },
      { question: 'How do I enquire about training or sponsorship?', answer: 'Use the form below and choose your area of interest. It prepares an email for you to review and send to our team.' },
    ],
  },

  contact: {
    heading: {
      eyebrow: 'It starts with a conversation',
      heading: "Let's make hello",
      highlight: 'mean something.',
      intro: "Planning an event, developing your team, or looking for your next industry connection? We'd love to hear from you.",
    },
  },

  ticker: ['Conferences', 'Summits', 'Training', 'Webinars', 'Exhibitions', 'Networking'],
};
