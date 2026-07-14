import { c as create_ssr_component, b as subscribe, e as escape, v as validate_component } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import { p as page } from './stores-BMS9OD8r.js';
import './index3-D_TadQnu.js';
import { A as Arrow_left } from './arrow-left-Cwbq-O6c.js';
import '@supabase/supabase-js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';
import './Icon-CGrK4NTA.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  $$unsubscribe_page();
  return `${$$result.head += `<!-- HEAD_svelte-iv1lgn_START -->${$$result.title = `<title>${escape("Projet")} — Portfolio</title>`, ""}${``}<!-- HEAD_svelte-iv1lgn_END -->`, ""} <section class="pt-20 pb-16 px-4"><div class="max-w-5xl mx-auto"> <a href="/projets" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors mb-6 group">${validate_component(Arrow_left, "ArrowLeft").$$render(
    $$result,
    {
      size: 16,
      class: "group-hover:-translate-x-1 transition-transform"
    },
    {},
    {}
  )} Retour aux projets</a> ${`<div class="animate-pulse space-y-6" data-svelte-h="svelte-1ufwce6"><div class="aspect-video rounded-2xl bg-gray-200 dark:bg-gray-800"></div> <div class="space-y-3 max-w-3xl"><div class="h-8 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div> <div class="h-4 bg-gray-200 dark:bg-gray-800 rounded w-1/4"></div> <div class="h-32 bg-gray-200 dark:bg-gray-800 rounded"></div></div></div>`}</div></section>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-D3sTbcpD.js.map
