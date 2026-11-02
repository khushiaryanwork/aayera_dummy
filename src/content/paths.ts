/**
 * Prefixes a path in /public with the site's base path, so the site works both at a
 * domain root (aayera.com) and in a subfolder (GitHub Pages: /aayera_dummy/).
 */
export const asset = (path: string) => `${import.meta.env.BASE_URL.replace(/\/$/, '')}${path}`;
