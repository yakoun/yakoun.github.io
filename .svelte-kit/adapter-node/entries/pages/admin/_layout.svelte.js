import { c as create_ssr_component, s as subscribe } from "../../../chunks/ssr.js";
import "../../../chunks/supabase.js";
import "../../../chunks/theme.js";
import "../../../chunks/client.js";
import { p as page } from "../../../chunks/stores.js";
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `${`<div class="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-950" data-svelte-h="svelte-1flv5oj"><div class="animate-spin rounded-full h-8 w-8 border-2 border-primary-600 border-t-transparent"></div></div>`}`;
});
export {
  Layout as default
};
