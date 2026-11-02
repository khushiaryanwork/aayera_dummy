import { defineArrayMember, defineField, defineType } from 'sanity';
import { HomeIcon } from '@sanity/icons/Home';
import { enquiryInterestOptions, sectionTargetOptions, sectorOptions } from '../shared';

const heading = (group: string) => defineField({ name: 'heading', type: 'sectionHeading', group });

const linkTarget = defineField({
  name: 'target',
  title: 'Links to',
  type: 'string',
  options: { list: sectionTargetOptions },
  validation: (rule) => rule.required(),
});

/** Everything on the home page, one tab per section, in page order. */
export const homePage = defineType({
  name: 'homePage',
  type: 'document',
  icon: HomeIcon,
  groups: [
    { name: 'hero', title: 'Hero', default: true },
    { name: 'about', title: 'About' },
    { name: 'events', title: 'Events' },
    { name: 'clients', title: 'Clients' },
    { name: 'industries', title: 'Industries' },
    { name: 'reach', title: 'Global reach' },
    { name: 'why', title: 'Why Aayera' },
    { name: 'participate', title: 'Participate' },
    { name: 'services', title: 'Services' },
    { name: 'faq', title: 'FAQ' },
    { name: 'contact', title: 'Contact' },
  ],
  fields: [
    // Hero
    defineField({
      name: 'hero',
      type: 'object',
      group: 'hero',
      fields: [
        defineField({ name: 'tagline', type: 'string', description: 'Small pill above the headline.' }),
        defineField({
          name: 'headlineLines',
          title: 'Headline lines',
          type: 'array',
          of: [defineArrayMember({ type: 'string' })],
          description: 'One entry per line. The last line gets the gradient and underline.',
          validation: (rule) => rule.min(1).max(4),
        }),
        defineField({ name: 'highlightWord', type: 'string', description: 'A word from the headline shown in gold, e.g. "future".' }),
        defineField({ name: 'subheading', type: 'text', rows: 2 }),
        defineField({ name: 'primaryCta', title: 'Primary button label', type: 'string' }),
        defineField({ name: 'secondaryCta', title: 'Secondary button label', type: 'string' }),
        defineField({
          name: 'reel',
          title: 'Photo reel',
          type: 'array',
          of: [defineArrayMember({ type: 'imageWithAlt' })],
          description: 'Photos that rotate inside the circle. Captions show over the photo.',
        }),
        defineField({
          name: 'ringClients',
          title: 'Logos on the ring',
          type: 'array',
          of: [defineArrayMember({ type: 'reference', to: [{ type: 'client' }] })],
          validation: (rule) => rule.length(6).warning('The ring is designed for six logos'),
        }),
        defineField({
          name: 'stats',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'stat',
              fields: [
                defineField({ name: 'label', type: 'string', validation: (rule) => rule.required() }),
                defineField({ name: 'value', type: 'number', validation: (rule) => rule.required().integer().min(0) }),
                defineField({
                  name: 'icon',
                  type: 'string',
                  options: {
                    list: [
                      { title: 'Calendar', value: 'cal' },
                      { title: 'Map pin', value: 'pin' },
                      { title: 'People', value: 'people' },
                      { title: 'Globe', value: 'globe' },
                    ],
                  },
                }),
              ],
              preview: { select: { title: 'label', subtitle: 'value' } },
            }),
          ],
          validation: (rule) => rule.max(4),
        }),
      ],
    }),

    // About
    defineField({
      name: 'about',
      type: 'object',
      group: 'about',
      fields: [
        defineField({ name: 'eyebrow', type: 'string' }),
        defineField({ name: 'statement', type: 'string', description: 'Large line that fills in word by word as visitors scroll.' }),
        defineField({ name: 'lede', type: 'text', rows: 2 }),
        defineField({ name: 'body', type: 'text', rows: 3 }),
        defineField({ name: 'ctaLabel', title: 'Button label', type: 'string' }),
        defineField({
          name: 'steps',
          type: 'array',
          of: [
            defineArrayMember({
              type: 'object',
              name: 'step',
              fields: [defineField({ name: 'title', type: 'string' }), defineField({ name: 'body', type: 'string' }), linkTarget],
              preview: { select: { title: 'title', subtitle: 'body' } },
            }),
          ],
          validation: (rule) => rule.max(3),
        }),
        defineField({ name: 'motto', type: 'array', of: [defineArrayMember({ type: 'string' })], description: 'The gold tile, one word or phrase per line.' }),
        defineField({ name: 'photos', type: 'array', of: [defineArrayMember({ type: 'imageWithAlt' })], description: 'Three photos: one wide, then two small.', validation: (rule) => rule.length(3) }),
      ],
    }),

    // Section headings
    { ...heading('events'), name: 'eventsHeading', title: 'Events heading' },
    { ...heading('clients'), name: 'clientsHeading', title: 'Clients heading' },
    defineField({
      name: 'clientLogos',
      type: 'array',
      group: 'clients',
      of: [defineArrayMember({ type: 'reference', to: [{ type: 'client' }] })],
      description: 'In display order. They are split evenly across three scrolling rows.',
    }),

    // Industries
    { ...heading('industries'), name: 'industriesHeading', title: 'Industries heading' },
    defineField({
      name: 'industries',
      type: 'array',
      group: 'industries',
      description: 'One tile per sector. The illustration comes from the sector; the event count is calculated from the events.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'industry',
          fields: [
            defineField({ name: 'sector', type: 'string', options: { list: sectorOptions }, validation: (rule) => rule.required() }),
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', type: 'string' }),
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
    }),

    // Reach
    { ...heading('reach'), name: 'reachHeading', title: 'Global reach heading' },
    defineField({
      name: 'regions',
      type: 'array',
      group: 'reach',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'region',
          fields: [
            defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'badge', type: 'string', description: 'e.g. "4 events" or "Presence".' }),
            defineField({ name: 'places', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'body', type: 'string' }),
          ],
          preview: { select: { title: 'name', subtitle: 'badge' } },
        }),
      ],
    }),
    defineField({
      name: 'reachTotals',
      type: 'array',
      group: 'reach',
      description: 'Figures in the dark tile at the end of the regions grid.',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'total',
          fields: [defineField({ name: 'label', type: 'string' }), defineField({ name: 'value', type: 'string' })],
          preview: { select: { title: 'label', subtitle: 'value' } },
        }),
      ],
    }),

    // Why
    { ...heading('why'), name: 'whyHeading', title: 'Why Aayera heading' },
    defineField({ name: 'whyPhotos', type: 'array', group: 'why', of: [defineArrayMember({ type: 'imageWithAlt' })] }),
    defineField({
      name: 'reasons',
      type: 'array',
      group: 'why',
      validation: (rule) => rule.max(4),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'reason',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', type: 'text', rows: 2 }),
            defineField({
              name: 'icon',
              type: 'string',
              options: {
                list: [
                  { title: 'Network of people', value: 'people' },
                  { title: 'Conversation', value: 'chat' },
                  { title: 'Globe', value: 'globe' },
                  { title: 'Clipboard', value: 'clipboard' },
                ],
              },
            }),
            defineField({ name: 'ctaLabel', title: 'Button label', type: 'string' }),
            linkTarget,
          ],
          preview: { select: { title: 'title', subtitle: 'body' } },
        }),
      ],
    }),

    // Participate
    { ...heading('participate'), name: 'participateHeading', title: 'Participate heading' },
    defineField({
      name: 'ways',
      title: 'Ways to participate',
      type: 'array',
      group: 'participate',
      validation: (rule) => rule.max(3),
      of: [
        defineArrayMember({
          type: 'object',
          name: 'way',
          fields: [
            defineField({
              name: 'path',
              type: 'string',
              description: 'Which option this card selects in the contact form.',
              options: { list: [{ title: 'Attend', value: 'attend' }, { title: 'Partner & exhibit', value: 'partner' }, { title: 'Organise', value: 'organise' }] },
              validation: (rule) => rule.required(),
            }),
            defineField({ name: 'label', type: 'string' }),
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'points', type: 'array', of: [defineArrayMember({ type: 'string' })] }),
            defineField({ name: 'ctaLabel', title: 'Link label', type: 'string' }),
          ],
          preview: { select: { title: 'title', subtitle: 'label' } },
        }),
      ],
    }),

    // Services
    { ...heading('services'), name: 'servicesHeading', title: 'Services heading' },
    defineField({
      name: 'services',
      type: 'array',
      group: 'services',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'service',
          fields: [
            defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'body', type: 'text', rows: 3 }),
            defineField({ name: 'ctaLabel', title: 'Link label', type: 'string' }),
            defineField({ name: 'interest', title: 'Selects in the form', type: 'string', options: { list: enquiryInterestOptions } }),
            defineField({ name: 'image', type: 'imageWithAlt' }),
          ],
          preview: { select: { title: 'title', media: 'image' } },
        }),
      ],
    }),

    // FAQ
    { ...heading('faq'), name: 'faqHeading', title: 'FAQ heading' },
    defineField({
      name: 'faqs',
      title: 'Questions',
      type: 'array',
      group: 'faq',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'faq',
          fields: [
            defineField({ name: 'question', type: 'string', validation: (rule) => rule.required() }),
            defineField({ name: 'answer', type: 'text', rows: 3, description: 'Email addresses become clickable links automatically.', validation: (rule) => rule.required() }),
          ],
          preview: { select: { title: 'question' } },
        }),
      ],
    }),

    // Contact
    { ...heading('contact'), name: 'contactHeading', title: 'Contact heading' },
    defineField({
      name: 'tickerWords',
      title: 'Ticker words',
      type: 'array',
      group: 'contact',
      of: [defineArrayMember({ type: 'string' })],
      description: 'Words scrolling in the gold band above the footer.',
    }),
  ],
  preview: { prepare: () => ({ title: 'Home page' }) },
});
