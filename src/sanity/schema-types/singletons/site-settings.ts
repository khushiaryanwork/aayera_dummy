import { defineArrayMember, defineField, defineType } from 'sanity';
import { CogIcon } from '@sanity/icons/Cog';

export const siteSettings = defineType({
  name: 'siteSettings',
  type: 'document',
  icon: CogIcon,
  groups: [
    { name: 'contact', title: 'Contact', default: true },
    { name: 'seo', title: 'SEO & sharing' },
  ],
  fields: [
    defineField({ name: 'email', type: 'string', group: 'contact', validation: (rule) => rule.required().email() }),
    defineField({
      name: 'phones',
      type: 'array',
      group: 'contact',
      of: [
        defineArrayMember({
          type: 'object',
          name: 'phone',
          fields: [
            defineField({ name: 'label', type: 'string', description: 'As displayed, e.g. "+91 80 48536267".', validation: (rule) => rule.required() }),
            defineField({ name: 'number', type: 'string', description: 'Digits for dialling, e.g. "+918048536267".', validation: (rule) => rule.required().regex(/^\+?[0-9]+$/, { name: 'phone number' }) }),
          ],
          preview: { select: { title: 'label' } },
        }),
      ],
    }),
    defineField({
      name: 'address',
      type: 'object',
      group: 'contact',
      fields: [
        defineField({ name: 'street', type: 'string' }),
        defineField({ name: 'area', type: 'string' }),
        defineField({ name: 'city', type: 'string' }),
        defineField({ name: 'postalCode', type: 'string' }),
        defineField({ name: 'country', type: 'string' }),
        defineField({ name: 'countryCode', type: 'string', description: 'Two letters, e.g. IN. Used for search engines.', validation: (rule) => rule.length(2) }),
      ],
    }),
    defineField({ name: 'footerTagline', type: 'string', group: 'contact' }),

    defineField({ name: 'title', title: 'Page title', type: 'string', group: 'seo', description: 'Shown in the browser tab and search results.' }),
    defineField({ name: 'description', title: 'Meta description', type: 'text', rows: 3, group: 'seo', validation: (rule) => rule.max(170).warning('Search engines cut off long descriptions') }),
    defineField({ name: 'shareTitle', type: 'string', group: 'seo', description: 'Title when the link is shared on social media.' }),
    defineField({ name: 'shareDescription', type: 'text', rows: 2, group: 'seo' }),
    defineField({ name: 'shareImage', type: 'image', group: 'seo', description: '1200 × 630 px works best.' }),
    defineField({
      name: 'searchVisibility',
      type: 'string',
      group: 'seo',
      initialValue: 'hidden',
      description: 'Keep hidden while the site is a preview. Switch to visible at launch.',
      options: {
        list: [
          { title: 'Hidden from search engines', value: 'hidden' },
          { title: 'Visible to search engines', value: 'visible' },
        ],
        layout: 'radio',
      },
    }),
  ],
  preview: { prepare: () => ({ title: 'Site settings' }) },
});
