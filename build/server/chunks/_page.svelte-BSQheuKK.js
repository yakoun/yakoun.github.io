import { c as create_ssr_component, b as subscribe, v as validate_component, e as escape } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import './index3-D_TadQnu.js';
import './client-BUusD8wq.js';
import { p as page } from './stores-BMS9OD8r.js';
import { A as Arrow_left } from './arrow-left-Cwbq-O6c.js';
import { E as Eye } from './eye-CPsMVxTz.js';
import { T as Trash_2 } from './trash-2-DQU9aCsZ.js';
import '@supabase/supabase-js';
import './exports-BGi7-Rnc.js';
import './Icon-CGrK4NTA.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => value);
  let form = {
    slug: ""
  };
  let $$settled;
  let $$rendered;
  let previous_head = $$result.head;
  do {
    $$settled = true;
    $$result.head = previous_head;
    $$rendered = `<div class="max-w-4xl mx-auto space-y-6"> <div class="flex items-center justify-between"><a href="/admin/projects" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">${validate_component(Arrow_left, "ArrowLeft").$$render($$result, { size: 16 }, {}, {})} Retour aux projets</a> <div class="flex items-center gap-2"><a href="${"/projets/" + escape(form.slug, true)}" target="_blank" class="btn-ghost border border-gray-300 dark:border-gray-600 text-sm gap-2">${validate_component(Eye, "Eye").$$render($$result, { size: 16 }, {}, {})} Aperçu</a> <button class="btn-danger text-sm gap-2">${validate_component(Trash_2, "Trash2").$$render($$result, { size: 16 }, {}, {})} Supprimer</button></div></div> ${`<div class="flex justify-center py-20" data-svelte-h="svelte-1tend7b"><div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent"></div></div>`}</div>`;
  } while (!$$settled);
  $$unsubscribe_page();
  return $$rendered;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BSQheuKK.js.map
