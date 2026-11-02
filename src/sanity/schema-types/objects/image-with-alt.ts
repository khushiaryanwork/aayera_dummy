import { defineField, defineType } from 'sanity';
import { ImageIcon } from '@sanity/icons/Image';

/** A photo with alt text. Hotspot lets editors pick the focal point used when cropping. */
export const imageWithAlt = defineType({
  name: 'imageWithAlt',
  title: 'Image',
  type: 'image',
  icon: ImageIcon,
  options: { hotspot: true },
  fields: [
    defineField({
      name: 'alt',
      title: 'Alternative text',
      type: 'string',
      description: 'Describe the image for people using screen readers. Leave empty only for decorative images.',
    }),
    defineField({
      name: 'caption',
      type: 'string',
      description: 'Optional. Shown on the image where the design has a caption.',
    }),
  ],
});
