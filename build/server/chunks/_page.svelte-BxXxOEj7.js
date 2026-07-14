import { c as create_ssr_component, v as validate_component, f as each, e as escape } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import { P as Plus } from './plus-B107-VlB.js';
import { P as Pencil } from './pencil-CC_sgnG2.js';
import { T as Trash_2 } from './trash-2-DQU9aCsZ.js';
import '@supabase/supabase-js';
import './Icon-CGrK4NTA.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items = [];
  return `<div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold" data-svelte-h="svelte-j3n8th">Langues</h1> ${`<button class="btn-primary text-sm">${validate_component(Plus, "Plus").$$render($$result, { size: 16 }, {}, {})} Ajouter</button>`}</div> ${``} <div class="space-y-2">${each(items, (item) => {
    return `<div class="card flex items-center justify-between p-3"><div class="flex items-center gap-3"><span class="font-medium text-sm">${escape(item.name)}</span> <span class="text-xs text-gray-400">${escape(["Débutant", "Intermédiaire", "Avancé", "Courant", "Natif"][item.level - 1])}</span></div> <div class="flex gap-1"><button class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">${validate_component(Pencil, "Pencil").$$render($$result, { size: 14 }, {}, {})}</button> <button class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400">${validate_component(Trash_2, "Trash2").$$render($$result, { size: 14 }, {}, {})}</button></div> </div>`;
  })}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BxXxOEj7.js.map
