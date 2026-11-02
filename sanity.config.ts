import { defineConfig } from 'sanity';
import { structureTool } from 'sanity/structure';
import { visionTool } from '@sanity/vision';
import { schemaTypes, singletonTypes } from './src/sanity/schema-types';
import { structure } from './src/sanity/structure';

/** The Studio, served by Astro at /studio (see astro.config.mjs). */
export default defineConfig({
  name: 'aayera',
  title: 'Aayera',
  projectId: import.meta.env.PUBLIC_SANITY_PROJECT_ID || 'jmz64r1s',
  dataset: import.meta.env.PUBLIC_SANITY_DATASET || 'production',
  plugins: [structureTool({ structure }), visionTool()],
  schema: {
    types: schemaTypes,
    // Singletons can't be created from the "new document" menu
    templates: (templates) => templates.filter(({ schemaType }) => !singletonTypes.has(schemaType)),
  },
  document: {
    // ...and can't be duplicated or deleted
    actions: (actions, { schemaType }) =>
      singletonTypes.has(schemaType) ? actions.filter(({ action }) => action && ['publish', 'discardChanges', 'restore'].includes(action)) : actions,
  },
});
