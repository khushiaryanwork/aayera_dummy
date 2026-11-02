export const services = [
  {
    title: 'Conferences & summits',
    body: 'Industry-focused conferences and summits that bring businesses, experts and decision-makers together to exchange ideas and explore opportunities.',
    cta: 'Discuss your next event',
    interest: 'Conferences & summits',
    photo: { src: '/images/photos/conference.jpg', alt: 'A speaker addressing a conference hall' },
  },
  {
    title: 'Professional training',
    body: 'Professional learning across management, finance, engineering and operations, with practical ideas and tools to support people and business performance.',
    cta: 'Explore training',
    interest: 'Training & development',
    photo: { src: '/images/photos/training.jpg', alt: 'A trainer presenting to a small group' },
  },
  {
    title: 'Webinars & networking',
    body: 'Webinars and networking that bring professionals into conversation with experts, peers and potential business partners.',
    cta: 'Find your next connection',
    interest: 'Webinars & networking',
    photo: { src: '/images/photos/webinar.jpg', alt: 'A team on a video call with colleagues' },
  },
];

export const interests = [
  'Conferences & summits',
  'Training & development',
  'Webinars & networking',
  'Partnerships & sponsorship',
  'Something else',
] as const;

export type EnquiryPath = 'attend' | 'partner' | 'organise';

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

export const faqs = [
  {
    q: 'What kinds of events does Aayera organise?',
    a: 'Conferences, summits, training programmes, webinars and exhibitions, alongside business networking opportunities.',
  },
  {
    q: 'Can you plan an event for our organisation?',
    a: "Yes. Our event services cover venue and accommodation, speakers, registration, sponsors and exhibitions. Tell us your objectives and we'll start from there.",
  },
  {
    q: 'Where can I find upcoming event dates?',
    a: 'The events on this page are past programmes. Email <a href="mailto:info@aayera.com">info@aayera.com</a> for current dates, locations and availability.',
  },
  {
    q: 'How do I enquire about training or sponsorship?',
    a: 'Use the form below and choose your area of interest. It prepares an email for you to review and send to our team.',
  },
];

export const regions = [
  { name: 'India', badge: '4 events', places: ['Bengaluru', 'Pune'], body: 'Our Bangalore home, and the base for our energy, mobility and technology programmes.' },
  { name: 'Africa', badge: '2 events', places: ['Johannesburg', 'Cape Town'], body: 'Healthcare development, manufacturing and distribution.' },
  { name: 'Middle East', badge: 'Presence', places: ['Saudi Arabia', 'Qatar', 'United Arab Emirates'], body: 'Local understanding across the Gulf.' },
  { name: 'Europe & Turkey', badge: '1 event', places: ['Ankara', 'United Kingdom'], body: 'Healthcare project delivery in Turkey, and a presence in the UK.' },
  { name: 'Americas', badge: 'Presence', places: ['United States'], body: 'Connecting North American business to our programmes.' },
];

export const stats = [
  { label: 'Past events listed', value: 7, icon: 'cal' },
  { label: 'Host cities', value: 5, icon: 'pin' },
  { label: 'Client organisations', value: 25, icon: 'people' },
  { label: 'Countries of presence', value: 6, icon: 'globe' },
] as const;

export const reelSlides = [
  { src: '/images/photos/stage.jpg', position: '45% 50%', caption: 'IoT India Confex 2017' },
  { src: '/images/photos/delegates.jpg', position: '60% 50%', caption: 'In the room' },
  { src: '/images/photos/group.jpg', position: '52% 40%', caption: 'On the exhibition floor' },
  { src: '/images/photos/demo.jpg', position: '30% 50%', caption: 'At the exhibits' },
];

export const whyPhotos = [
  { src: '/images/photos/delegates.jpg', alt: 'Delegates listening at a conference table' },
  { src: '/images/photos/conference.jpg', alt: 'A speaker addressing a full conference hall' },
  { src: '/images/photos/demo.jpg', alt: 'Delegates discussing a product on display' },
];
