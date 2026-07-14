import { c as create_ssr_component, v as validate_component, f as each, e as escape } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import { P as Plus } from './plus-B107-VlB.js';
import { P as Pencil } from './pencil-CC_sgnG2.js';
import { T as Trash_2 } from './trash-2-DQU9aCsZ.js';
import '@supabase/supabase-js';
import './Icon-CGrK4NTA.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let services = [];
  return `<div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold" data-svelte-h="svelte-noo9lc">Services</h1> <button class="btn-primary">${validate_component(Plus, "Plus").$$render($$result, { size: 18 }, {}, {})} Ajouter</button></div> ${``} <div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">${each(services, (service) => {
    return `<div class="card"><h3 class="font-semibold mb-2">${escape(service.title)}</h3> <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">${escape(service.description)}</p> <div class="flex gap-1"><button class="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800">${validate_component(Pencil, "Pencil").$$render($$result, { size: 14 }, {}, {})}</button> <button class="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30">${validate_component(Trash_2, "Trash2").$$render($$result, { size: 14, class: "text-red-500" }, {}, {})}</button></div> </div>`;
  })}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-CsJZiUiV.js.map
