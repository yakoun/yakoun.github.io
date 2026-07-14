import { c as create_ssr_component, v as validate_component, b as each, e as escape, d as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/supabase.js";
import { C as CATEGORY_LABELS } from "../../../../chunks/index3.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { A as Arrow_right } from "../../../../chunks/arrow-right.js";
import { F as Filter, S as Search } from "../../../../chunks/search.js";
const Sparkles = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M9.937 15.5A2 2 0 0 0 8.5 14.063l-6.135-1.582a.5.5 0 0 1 0-.962L8.5 9.936A2 2 0 0 0 9.937 8.5l1.582-6.135a.5.5 0 0 1 .963 0L14.063 8.5A2 2 0 0 0 15.5 9.937l6.135 1.581a.5.5 0 0 1 0 .964L15.5 14.063a2 2 0 0 0-1.437 1.437l-1.582 6.135a.5.5 0 0 1-.963 0z"
      }
    ],
    ["path", { "d": "M20 3v4" }],
    ["path", { "d": "M22 5h-4" }],
    ["path", { "d": "M4 17v2" }],
    ["path", { "d": "M5 18H3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "sparkles" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories;
  let featured;
  let projects = [];
  let activeCategory = "";
  let searchQuery = "";
  categories = [...new Set(projects.map((p) => p.category))].filter(Boolean);
  featured = projects.filter((p) => p.featured);
  return `${$$result.head += `<!-- HEAD_svelte-10ov6x2_START -->${$$result.title = `<title>Projets — Portfolio</title>`, ""}<!-- HEAD_svelte-10ov6x2_END -->`, ""} <section class="pt-20 pb-16"> <div class="relative px-4 pt-8 pb-12 text-center overflow-hidden" data-svelte-h="svelte-sn5atb"><div class="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-950/20 pointer-events-none"></div> <div class="relative max-w-3xl mx-auto"><h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">Mes <span class="text-primary-600">réalisations</span></h1> <p class="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Des projets concrets, de l&#39;électricité au développement web</p></div></div> <div class="max-w-6xl mx-auto px-4"> ${featured.length > 0 && !activeCategory ? `<div class="mb-12"><div class="flex items-center gap-2 mb-6">${validate_component(Sparkles, "Sparkles").$$render($$result, { size: 20, class: "text-yellow-500" }, {}, {})} <h2 class="text-xl font-bold" data-svelte-h="svelte-8h06pg">Projets à la une</h2></div> <div class="grid md:grid-cols-2 gap-5">${each(featured.slice(0, 2), (project) => {
    return `<a href="${"/projets/" + escape(project.slug, true)}" class="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-600 to-purple-700 text-white p-8 min-h-[280px] flex flex-col justify-end transition-transform duration-300 hover:scale-[1.02]">${project.images?.length > 0 ? `<img${add_attribute("src", project.images[0], 0)} alt="" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity">` : ``} <div class="relative"><span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm mb-3">${validate_component(Sparkles, "Sparkles").$$render($$result, { size: 12 }, {}, {})} À la une</span> <h3 class="text-2xl font-bold mb-2">${escape(project.title)}</h3> <p class="text-white/80 text-sm line-clamp-2 mb-4">${escape(project.description)}</p> <span class="inline-flex items-center gap-1 text-sm font-medium text-white/90 group-hover:gap-2 transition-all">Voir le projet ${validate_component(Arrow_right, "ArrowRight").$$render($$result, { size: 14 }, {}, {})} </span></div> </a>`;
  })}</div></div>` : ``}  <div class="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">${validate_component(Filter, "Filter").$$render(
    $$result,
    {
      size: 18,
      class: "text-gray-400 flex-shrink-0"
    },
    {},
    {}
  )} <button class="${"px-4 py-1.5 rounded-full text-sm font-medium transition-all " + escape(
    "bg-primary-600 text-white shadow-lg shadow-primary-500/25",
    true
  )}">Tout</button> ${each(categories, (cat) => {
    return `<button class="${"px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize " + escape(
      activeCategory === cat ? "bg-primary-600 text-white shadow-lg shadow-primary-500/25" : "bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700",
      true
    )}">${escape(CATEGORY_LABELS[cat] || cat.replace("-", " "))} </button>`;
  })} <div class="flex-1 min-w-[150px] relative">${validate_component(Search, "Search").$$render(
    $$result,
    {
      size: 16,
      class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    },
    {},
    {}
  )} <input type="text" placeholder="Rechercher..." class="input pl-9 text-sm w-full"${add_attribute("value", searchQuery, 0)}> ${``}</div></div>  ${`<div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">${each([1, 2, 3, 4, 5, 6], (_) => {
    return `<div class="rounded-2xl overflow-hidden animate-pulse bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800" data-svelte-h="svelte-1d0wt4p"><div class="h-48 bg-gray-200 dark:bg-gray-800"></div> <div class="p-5 space-y-2"><div class="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div> <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div> <div class="h-8 bg-gray-200 dark:bg-gray-800 rounded"></div></div> </div>`;
  })}</div>`}</div></section>`;
});
export {
  Page as default
};
