import { c as create_ssr_component, v as validate_component, f as each, e as escape } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import { P as Plus } from './plus-B107-VlB.js';
import { P as Pencil } from './pencil-CC_sgnG2.js';
import { T as Trash_2 } from './trash-2-DQU9aCsZ.js';
import '@supabase/supabase-js';
import './Icon-CGrK4NTA.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items = [];
  return `<div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold" data-svelte-h="svelte-1kgfs8j">Loisirs &amp; Qualités</h1> ${`<button class="btn-primary text-sm">${validate_component(Plus, "Plus").$$render($$result, { size: 16 }, {}, {})} Ajouter</button>`}</div> ${``} <div class="flex flex-wrap gap-2">${each(items, (item) => {
    return `<div class="card flex items-center gap-2 p-3"><span class="font-medium text-sm">${escape(item.name)}</span> <button class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">${validate_component(Pencil, "Pencil").$$render($$result, { size: 12 }, {}, {})}</button> <button class="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400">${validate_component(Trash_2, "Trash2").$$render($$result, { size: 12 }, {}, {})}</button> </div>`;
  })}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BoUv9ZCL.js.map
