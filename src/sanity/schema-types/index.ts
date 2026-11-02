import { event } from './documents/event';
import { client } from './documents/client';
import { homePage } from './singletons/home-page';
import { siteSettings } from './singletons/site-settings';
import { imageWithAlt } from './objects/image-with-alt';
import { sectionHeading } from './objects/section-heading';

export const schemaTypes = [homePage, siteSettings, event, client, imageWithAlt, sectionHeading];

/** Documents that exist exactly once, with a fixed ID. */
export const singletonTypes = new Set(['homePage', 'siteSettings']);
