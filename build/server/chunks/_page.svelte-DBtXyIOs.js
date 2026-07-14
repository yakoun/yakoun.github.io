import { c as create_ssr_component, v as validate_component, f as each, e as escape } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import { P as Plus } from './plus-B107-VlB.js';
import { P as Pencil } from './pencil-CC_sgnG2.js';
import { T as Trash_2 } from './trash-2-DQU9aCsZ.js';
import '@supabase/supabase-js';
import './Icon-CGrK4NTA.js';

function unpack(desc) {
  const result = { location: "", responsibilities: [""] };
  if (!desc) return result;
  const locMatch = desc.match(/\[LOC\](.+?)(?:\n|$)/);
  if (locMatch) result.location = locMatch[1].trim();
  const respMatch = desc.match(/\[RESP\](.+)/);
  if (respMatch) {
    result.responsibilities = respMatch[1].split("||").filter(Boolean);
    if (result.responsibilities.length === 0) result.responsibilities = [""];
  }
  return result;
}
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let items = [];
  return `<div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold" data-svelte-h="svelte-193vvz3">Expériences</h1> ${`<button class="btn-primary text-sm">${validate_component(Plus, "Plus").$$render($$result, { size: 16 }, {}, {})} Ajouter</button>`}</div> ${``} <div class="space-y-2">${each(items, (item) => {
    let u = unpack(item.description || "");
    return ` <div class="card flex items-start justify-between gap-4 p-4"><div class="flex-1"><h3 class="font-semibold text-sm">${escape(item.role)}</h3> <p class="text-xs text-primary-600">${escape(item.company)}${u.location ? ` · ${escape(u.location)}` : ``}</p> <p class="text-xs text-gray-400">${escape(item.start_date)} — ${escape(item.current ? "Actuel" : item.end_date)}</p> ${u.responsibilities.length > 0 && u.responsibilities[0] ? `<ul class="mt-2 space-y-0.5">${each(u.responsibilities, (r) => {
      return `<li class="text-xs text-gray-500 flex items-start gap-1.5"><span class="text-primary-400 mt-0.5" data-svelte-h="svelte-1uf8x99">•</span> ${escape(r)}</li>`;
    })} </ul>` : ``}</div> <div class="flex gap-1 shrink-0"><button class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400">${validate_component(Pencil, "Pencil").$$render($$result, { size: 14 }, {}, {})}</button> <button class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400">${validate_component(Trash_2, "Trash2").$$render($$result, { size: 14 }, {}, {})}</button></div> </div>`;
  })}</div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-DBtXyIOs.js.map
