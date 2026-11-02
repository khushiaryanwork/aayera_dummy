export type Sector = 'energy' | 'mobility' | 'health' | 'tech';

export interface EventItem {
  title: string;
  topic: string;
  sector: Sector;
  dates: string;
  location: string;
  image: { src: string; alt: string; width: number; height: number };
}

export const sectorLabels: Record<Sector, string> = {
  energy: 'Energy',
  mobility: 'Mobility',
  health: 'Healthcare',
  tech: 'Technology',
};

export const events: EventItem[] = [
  {
    title: 'EV Charging Summit',
    topic: 'EV Charging Summit',
    sector: 'mobility',
    dates: '21–22 June 2021',
    location: 'Bengaluru, India',
    image: { src: '/images/events/ev-charging-2021.jpg', alt: 'EV Charging Summit 2021 event artwork', width: 1280, height: 648 },
  },
  {
    title: 'Smart Meter Summit',
    topic: 'Smart Meter Summit',
    sector: 'energy',
    dates: '7–8 June 2021',
    location: 'Bengaluru, India',
    image: { src: '/images/events/smart-meter-2021.jpg', alt: 'Smart Meter Summit 2021 event artwork', width: 1080, height: 600 },
  },
  {
    title: 'Turkey Healthcare Project Delivery Conference',
    topic: 'Turkey Healthcare Project Delivery Conference',
    sector: 'health',
    dates: '8–9 April 2020',
    location: 'Ankara, Turkey',
    image: { src: '/images/events/turkey-healthcare-2020.jpg', alt: 'Turkey Healthcare Project Delivery Conference 2020 event artwork', width: 551, height: 321 },
  },
  {
    title: 'Africa Healthcare Manufacturers and Distributors Summit',
    topic: 'Africa Healthcare Manufacturers and Distributors Summit',
    sector: 'health',
    dates: '24–25 March 2020',
    location: 'Cape Town, South Africa',
    image: { src: '/images/events/africa-manufacturers-2020.jpg', alt: 'Africa Healthcare Manufacturers and Distributors Summit 2020 event artwork', width: 551, height: 321 },
  },
  {
    title: 'Africa Healthcare Development & Project Delivery Conference',
    topic: 'Africa Healthcare Development and Project Delivery Conference',
    sector: 'health',
    dates: '11–12 September 2019',
    location: 'Johannesburg, South Africa',
    image: { src: '/images/events/africa-development-2019.jpg', alt: 'Africa Healthcare Development and Project Delivery Conference 2019 event artwork', width: 551, height: 321 },
  },
  {
    title: 'Hybrid & Electric Vehicle Confex',
    topic: 'Hybrid and Electric Vehicle Confex',
    sector: 'mobility',
    dates: '9–10 August 2018',
    location: 'Pune, India',
    image: { src: '/images/events/hybrid-ev-2018.png', alt: 'Hybrid and Electric Vehicle Confex 2018 event artwork', width: 551, height: 321 },
  },
  {
    title: 'IoT India Confex',
    topic: 'IoT India Confex',
    sector: 'tech',
    dates: '24–25 August 2017',
    location: 'Le Méridien, Bengaluru, India',
    image: { src: '/images/events/iot-india-2017.jpg', alt: 'IoT India Confex 2017 event artwork', width: 1280, height: 466 },
  },
];
