import { c as create_ssr_component, b as subscribe } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import './theme-B2QhgEeN.js';
import './client-BUusD8wq.js';
import { p as page } from './stores-BMS9OD8r.js';
import '@supabase/supabase-js';
import './index2-C8PNV9uQ.js';
import './exports-BGi7-Rnc.js';

const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `${`<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950" data-svelte-h="svelte-1flv5oj"><div class="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div></div>`}`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-C8NKAGW-.js.map
