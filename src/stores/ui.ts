import { atom } from 'nanostores';
import type { Sector } from '@/data/events';
import type { EnquiryPath } from '@/data/content';

/**
 * Shared state between islands. Static Astro sections write to these through
 * `data-*` attributes (see src/scripts/intents.ts); React islands read them.
 */

/** Visitor-controlled pause for every looping animation. */
export const $motionPaused = atom(false);

/** Active sector filter in the events carousel. */
export const $eventFilter = atom<Sector | 'all'>('all');

/** Prefills for the enquiry form, set by links elsewhere on the page. */
export const $enquiry = atom<{ path?: EnquiryPath; interest?: string; message?: string; nonce: number }>({ nonce: 0 });

export const prefillEnquiry = (patch: Omit<ReturnType<typeof $enquiry.get>, 'nonce'>) =>
  $enquiry.set({ ...patch, nonce: $enquiry.get().nonce + 1 });

/** True when the OS asks for reduced motion. Safe to call on the server. */
export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
