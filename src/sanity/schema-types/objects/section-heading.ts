import { defineField, defineType } from 'sanity';

/** The eyebrow + heading (+ optional intro) that opens most sections. */
export const sectionHeading = defineType({
  name: 'sectionHeading',
  type: 'object',
  options: { collapsible: true, collapsed: false },
  fields: [
    defineField({ name: 'eyebrow', type: 'string', description: 'Small label above the heading.' }),
    defineField({ name: 'heading', type: 'string', validation: (rule) => rule.required() }),
    defineField({
      name: 'highlight',
      type: 'string',
      description: 'Optional words that appear after the heading in the accent colour, e.g. "met opportunity".',
    }),
    defineField({ name: 'intro', type: 'text', rows: 2, description: 'Optional short line beside or under the heading.' }),
  ],
});
