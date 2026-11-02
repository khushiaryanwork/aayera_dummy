export interface Client {
  name: string;
  logo: string;
}

const logo = (n: number) => `/images/clients/${n}.png`;

/** Each row scrolls as its own marquee; `duration` is the loop length. */
export const clientRows: { duration: string; reverse?: boolean; clients: Client[] }[] = [
  {
    duration: '58s',
    clients: [
      { name: 'ABB', logo: logo(25) },
      { name: 'EY', logo: logo(2) },
      { name: 'Tata Communications', logo: logo(7) },
      { name: 'Saudi Aramco', logo: logo(11) },
      { name: 'Dell', logo: logo(16) },
      { name: 'Hitachi', logo: logo(20) },
      { name: 'Wipro', logo: logo(19) },
      { name: 'DP World', logo: logo(10) },
      { name: 'Jio', logo: logo(26) },
    ],
  },
  {
    duration: '64s',
    reverse: true,
    clients: [
      { name: 'Larsen & Toubro', logo: logo(23) },
      { name: 'Qatar Petroleum', logo: logo(13) },
      { name: 'Tech Mahindra', logo: logo(22) },
      { name: 'Experian', logo: logo(18) },
      { name: 'Hamad Medical Corporation', logo: logo(6) },
      { name: 'Arrow Electronics', logo: logo(9) },
      { name: 'Petroleum Development Oman', logo: logo(15) },
      { name: 'Mahindra SSG', logo: logo(21) },
    ],
  },
  {
    duration: '52s',
    clients: [
      { name: 'Egyptian Petrochemicals Holding Company', logo: logo(8) },
      { name: 'ROHM Semiconductor', logo: logo(24) },
      { name: 'LetsTrack', logo: logo(1) },
      { name: 'MultiTech', logo: logo(3) },
      { name: 'Silvan', logo: logo(5) },
      { name: 'Subex', logo: logo(4) },
      { name: 'Mindteck', logo: logo(14) },
      { name: 'Cellcomm', logo: logo(12) },
    ],
  },
];

/** Logos shown on the orbit ring in the hero. */
export const heroRingLogos = [25, 2, 7, 11, 20, 16].map(logo);
