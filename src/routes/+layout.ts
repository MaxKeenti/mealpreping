// App pages read LocalStorage, so they render client-side only (D1). Served as a
// single-page app via the adapter-static fallback; no SSR/prerender hydration flash.
export const ssr = false;
export const prerender = false;
