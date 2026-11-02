import { defineField, defineType } from 'sanity';
import { CalendarIcon } from '@sanity/icons/Calendar';
import { sectorOptions } from '../shared';

export const event = defineType({
  name: 'event',
  type: 'document',
  icon: CalendarIcon,
  description: 'Events appear in the carousel, newest first.',
  fields: [
    defineField({ name: 'title', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'sector',
      type: 'string',
      options: { list: sectorOptions, layout: 'radio', direction: 'horizontal' },
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'startDate', type: 'date', validation: (rule) => rule.required() }),
    defineField({
      name: 'endDate',
      type: 'date',
      description: 'Leave empty for a one-day event.',
      validation: (rule) =>
        rule.custom((end, context) => {
          const start = (context.document as { startDate?: string } | undefined)?.startDate;
          return !end || !start || end >= start || 'End date must be on or after the start date';
        }),
    }),
    defineField({
      name: 'location',
      type: 'string',
      description: 'As it should read on the card, e.g. "Le Méridien, Bengaluru, India".',
      validation: (rule) => rule.required(),
    }),
    defineField({ name: 'image', title: 'Event artwork', type: 'imageWithAlt', validation: (rule) => rule.required() }),
  ],
  orderings: [{ title: 'Newest first', name: 'startDateDesc', by: [{ field: 'startDate', direction: 'desc' }] }],
  preview: {
    select: { title: 'title', subtitle: 'location', date: 'startDate', media: 'image' },
    prepare: ({ title, subtitle, date, media }) => ({ title, subtitle: [date?.slice(0, 4), subtitle].filter(Boolean).join(' · '), media }),
  },
});
