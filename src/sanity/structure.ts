import type { StructureResolver } from 'sanity/structure';
import { HomeIcon } from '@sanity/icons/Home';
import { CogIcon } from '@sanity/icons/Cog';
import { CalendarIcon } from '@sanity/icons/Calendar';
import { CaseIcon } from '@sanity/icons/Case';

/** Studio sidebar: the two singletons open directly, then the lists. */
export const structure: StructureResolver = (S) =>
  S.list()
    .title('Content')
    .items([
      S.listItem().title('Home page').icon(HomeIcon).child(S.document().schemaType('homePage').documentId('homePage')),
      S.listItem().title('Site settings').icon(CogIcon).child(S.document().schemaType('siteSettings').documentId('siteSettings')),
      S.divider(),
      S.documentTypeListItem('event').title('Events').icon(CalendarIcon),
      S.documentTypeListItem('client').title('Clients').icon(CaseIcon),
    ]);
