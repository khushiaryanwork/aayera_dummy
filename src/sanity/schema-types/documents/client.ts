import { defineField, defineType } from 'sanity';
import { CaseIcon } from '@sanity/icons/Case';

export const client = defineType({
  name: 'client',
  title: 'Client organisation',
  type: 'document',
  icon: CaseIcon,
  fields: [
    defineField({ name: 'name', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'logo',
      type: 'image',
      description: 'Logo on a white or transparent background, ideally 230 × 120 px.',
      validation: (rule) => rule.required(),
    }),
  ],
  preview: { select: { title: 'name', media: 'logo' } },
});
