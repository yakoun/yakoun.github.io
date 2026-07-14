import { c as create_ssr_component, v as validate_component, b as each, e as escape } from "../../../../chunks/ssr.js";
import "../../../../chunks/supabase.js";
import { P as Plus } from "../../../../chunks/plus.js";
import { P as Pencil } from "../../../../chunks/pencil.js";
import { T as Trash_2 } from "../../../../chunks/trash-2.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let skills = [];
  return `<div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold" data-svelte-h="svelte-aeenlg">Compétences</h1> <button class="btn-primary">${validate_component(Plus, "Plus").$$render($$result, { size: 18 }, {}, {})} Ajouter</button></div> ${``} <div class="grid md:grid-cols-2 gap-4">${each(skills, (skill) => {
    return `<div class="card flex items-start gap-4"><div class="flex-1"><div class="flex items-center justify-between mb-1"><h3 class="font-semibold">${escape(skill.name)}</h3> <div class="flex gap-1"><button class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">${validate_component(Pencil, "Pencil").$$render($$result, { size: 14 }, {}, {})}</button> <button class="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded">${validate_component(Trash_2, "Trash2").$$render($$result, { size: 14, class: "text-red-500" }, {}, {})}</button> </div></div> <p class="text-xs text-gray-500 mb-2">${escape(skill.category)} — ${escape(skill.description || "")}</p> <div class="flex gap-1">${each({ length: 5 }, (_, i) => {
      return `<div class="${"h-2 flex-1 rounded-full " + escape(
        i < skill.level ? "bg-primary-500" : "bg-gray-200 dark:bg-gray-700",
        true
      )}"></div>`;
    })} </div></div> </div>`;
  })}</div>`;
});
export {
  Page as default
};
