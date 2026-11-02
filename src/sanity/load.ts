import { sanityClient } from 'sanity:client';
import { PAGE_QUERY } from './queries';
import { mapContent } from './map';
import { fallback } from '@/content/fallback';
import type { PageContent } from '@/content/types';

let cached: Promise<PageContent> | undefined;

/**
 * Fetches the page content from Sanity once per build. If Sanity can't be reached,
 * the build still succeeds with the built-in content and logs a warning.
 */
export function getPageContent(): Promise<PageContent> {
  cached ??= sanityClient
    .fetch(PAGE_QUERY, {}, { perspective: 'published' })
    .then((raw) => mapContent(raw, fallback))
    .catch((error: unknown) => {
      console.warn(`[sanity] Could not load content, using built-in fallback: ${error instanceof Error ? error.message : error}`);
      return fallback;
    });
  return cached;
}
