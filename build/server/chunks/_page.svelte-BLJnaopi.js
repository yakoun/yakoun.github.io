import { c as create_ssr_component, v as validate_component, f as each, d as add_attribute, e as escape } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import { P as Plus } from './plus-B107-VlB.js';
import { S as Star } from './star-CIisdWBN.js';
import { P as Pencil } from './pencil-CC_sgnG2.js';
import { T as Trash_2 } from './trash-2-DQU9aCsZ.js';
import '@supabase/supabase-js';
import './Icon-CGrK4NTA.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items = [];
  return `<div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold" data-svelte-h="svelte-bydrvf">Galerie</h1> <button class="btn-primary">${validate_component(Plus, "Plus").$$render($$result, { size: 18 }, {}, {})} Ajouter</button></div> ${``} <div class="grid md:grid-cols-3 gap-4">${each(items, (item) => {
    return `<div class="card p-3"><img${add_attribute("src", item.image_url, 0)}${add_attribute("alt", item.title, 0)} class="w-full h-40 object-cover rounded-xl mb-3"> <h3 class="font-semibold text-sm">${escape(item.title)}</h3> <p class="text-xs text-gray-500 mt-1">${escape(item.category)}</p> <div class="flex items-center gap-1 mt-2"><button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">${validate_component(Star, "Star").$$render(
      $$result,
      {
        size: 14,
        class: item.featured ? "fill-yellow-500 text-yellow-500" : "text-gray-300"
      },
      {},
      {}
    )}</button> <button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">${validate_component(Pencil, "Pencil").$$render($$result, { size: 14 }, {}, {})}</button> <button class="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">${validate_component(Trash_2, "Trash2").$$render($$result, { size: 14, class: "text-red-500" }, {}, {})}</button></div> </div>`;
  })}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-BLJnaopi.js.map
