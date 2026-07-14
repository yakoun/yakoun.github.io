import { c as create_ssr_component, v as validate_component, d as add_attribute, f as each, e as escape } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import { a as CATEGORIES } from './index3-D_TadQnu.js';
import './client-BUusD8wq.js';
import { A as Arrow_left } from './arrow-left-Cwbq-O6c.js';
import { X } from './x-Fnu8fdo6.js';
import { P as Plus } from './plus-B107-VlB.js';
import { S as Save } from './save-Dff9TyTv.js';
import '@supabase/supabase-js';
import './exports-BGi7-Rnc.js';
import './Icon-CGrK4NTA.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let form = {
    title: "",
    slug: "",
    date: "",
    featured: false,
    github_repo: "",
    live_url: ""
  };
  let techInput = "";
  return `<div class="max-w-4xl mx-auto space-y-6"><a href="/admin/projects" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">${validate_component(Arrow_left, "ArrowLeft").$$render($$result, { size: 16 }, {}, {})} Retour aux projets</a> <h1 class="text-3xl font-bold tracking-tight" data-svelte-h="svelte-1umo0he">Nouveau projet</h1> <form class="space-y-6"> <div class="card p-6 space-y-4"><div class="flex items-start justify-between gap-4"><div class="flex-1"><label class="label">Titre du projet <input type="text" required class="input text-lg font-semibold" placeholder="Ex: Installation électrique résidentielle"${add_attribute("value", form.title, 0)}></label></div> <label class="flex items-center gap-2 cursor-pointer mt-6"><input type="checkbox" class="w-4 h-4 rounded border-gray-300 text-primary-600"${add_attribute("checked", form.featured, 1)}> <span class="text-sm font-medium flex items-center gap-1">${``} À la une</span></label></div> <div class="grid md:grid-cols-3 gap-4"><div><label class="label">Slug <input type="text" class="input text-sm font-mono" placeholder="generation-auto"${add_attribute("value", form.slug, 0)}></label></div> <div><label class="label">Catégorie <select class="input">${each(CATEGORIES, (cat) => {
    return `<option${add_attribute("value", cat.value, 0)}>${escape(cat.label)}</option>`;
  })}</select></label></div> <div><label class="label">Date <input type="date" required class="input"${add_attribute("value", form.date, 0)}></label></div></div></div>  <div class="card p-6 space-y-3"><label class="label">Description <textarea required${add_attribute("rows", 10, 0)} class="input resize-none leading-relaxed" placeholder="Décris le projet en détail...">${escape("")}</textarea></label></div>  <div class="card p-6 space-y-3"> <label class="label" data-svelte-h="svelte-a4oucx">Technologies</label> <div class="flex flex-wrap gap-1.5 mb-3">${each(
    [],
    (tech) => {
      return `<span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-sm text-primary-700">${escape(tech)} <button type="button" class="hover:text-red-500">${validate_component(X, "X").$$render($$result, { size: 14 }, {}, {})}</button> </span>`;
    }
  )}</div> <div class="flex gap-2"><input type="text" class="input flex-1 text-sm" placeholder="Ajouter une technologie..."${add_attribute("value", techInput, 0)}> <button type="button" class="btn-ghost border border-gray-300 dark:border-gray-600">${validate_component(Plus, "Plus").$$render($$result, { size: 16 }, {}, {})}</button></div></div>  <div class="card p-6 space-y-4"><h3 class="font-semibold text-sm uppercase tracking-wider text-gray-500" data-svelte-h="svelte-n7uzmt">Liens</h3> <div class="grid md:grid-cols-2 gap-4"><div><label class="label">GitHub (user/repo) <input type="text" class="input text-sm" placeholder="electrodev/mon-projet"${add_attribute("value", form.github_repo, 0)}></label></div> <div><label class="label">URL live <input type="url" class="input text-sm" placeholder="https://..."${add_attribute("value", form.live_url, 0)}></label></div></div></div> ${``} <div class="flex gap-3"><button type="submit" ${""} class="btn-primary gap-2 px-8">${`${validate_component(Save, "Save").$$render($$result, { size: 18 }, {}, {})} Créer le projet`}</button> <a href="/admin/projects" class="btn-secondary" data-svelte-h="svelte-xpwyvs">Annuler</a></div></form></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte--y6dBsj1.js.map
