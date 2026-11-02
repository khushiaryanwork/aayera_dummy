import { $eventFilter, prefillEnquiry } from '@/stores/ui';
import type { Sector } from '@/data/events';
import type { EnquiryPath } from '@/data/content';

/**
 * Links in static sections carry their intent in data attributes. One delegated
 * listener turns those clicks into store updates the React islands react to.
 *
 *   data-goto="energy"       → filter the events carousel
 *   data-path="partner"      → choose a path in the enquiry form
 *   data-interest="..."      → choose an interest in the enquiry form
 *   data-topic="..."         → prefill a message about a past event
 */
document.addEventListener('click', (e) => {
  const el = (e.target as Element | null)?.closest<HTMLElement>('[data-goto],[data-path],[data-interest],[data-topic]');
  if (!el) return;
  const { goto, path, interest, topic } = el.dataset;

  if (goto) $eventFilter.set(goto as Sector);
  if (path) prefillEnquiry({ path: path as EnquiryPath });
  if (interest) prefillEnquiry({ interest });
  if (topic) {
    prefillEnquiry({
      interest: 'Conferences & summits',
      message: `I'd like to know about upcoming programmes related to ${topic}.`,
    });
  }
});
