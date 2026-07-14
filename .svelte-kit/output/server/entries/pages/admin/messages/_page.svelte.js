import { c as create_ssr_component, e as escape } from "../../../../chunks/ssr.js";
import "../../../../chunks/supabase.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let messages = [];
  return `<div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold" data-svelte-h="svelte-9t9h72">Messages reçus</h1> <span class="text-sm text-gray-500">${escape(messages.length)} message(s)</span></div> ${`<div class="flex justify-center py-20" data-svelte-h="svelte-1tend7b"><div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div></div>`}`;
});
export {
  Page as default
};
