import { c as create_ssr_component, v as validate_component, e as escape, b as each, m as missing_component, d as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/supabase.js";
import { C as CATEGORY_LABELS } from "../../../../chunks/index3.js";
import "../../../../chunks/client.js";
import { F as Folder_kanban } from "../../../../chunks/folder-kanban.js";
import { S as Star } from "../../../../chunks/star.js";
import { F as Filter, S as Search } from "../../../../chunks/search.js";
import { I as Icon } from "../../../../chunks/Icon.js";
import { P as Plus } from "../../../../chunks/plus.js";
const Arrow_up_down = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "m21 16-4 4-4-4" }],
    ["path", { "d": "M17 20V4" }],
    ["path", { "d": "m3 8 4-4 4 4" }],
    ["path", { "d": "M7 4v16" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "arrow-up-down" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Github = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"
      }
    ],
    ["path", { "d": "M9 18c-4.51 2-5-2-7-2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "github" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Grid_3x3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2"
      }
    ],
    ["path", { "d": "M3 9h18" }],
    ["path", { "d": "M3 15h18" }],
    ["path", { "d": "M9 3v18" }],
    ["path", { "d": "M15 3v18" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "grid-3x3" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Image_off = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "2",
        "x2": "22",
        "y1": "2",
        "y2": "22"
      }
    ],
    ["path", { "d": "M10.41 10.41a2 2 0 1 1-2.83-2.83" }],
    [
      "line",
      {
        "x1": "13.5",
        "x2": "6",
        "y1": "13.5",
        "y2": "21"
      }
    ],
    [
      "line",
      {
        "x1": "18",
        "x2": "21",
        "y1": "12",
        "y2": "15"
      }
    ],
    [
      "path",
      {
        "d": "M3.59 3.59A1.99 1.99 0 0 0 3 5v14a2 2 0 0 0 2 2h14c.55 0 1.052-.22 1.41-.59"
      }
    ],
    ["path", { "d": "M21 15V5a2 2 0 0 0-2-2H9" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "image-off" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const List = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "8",
        "x2": "21",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "21",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "8",
        "x2": "21",
        "y1": "18",
        "y2": "18"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "3.01",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "3.01",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "3",
        "x2": "3.01",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "list" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories;
  let featuredCount;
  let sorted;
  let stats;
  let projects = [];
  let search = "";
  categories = [...new Set(projects.map((p) => p.category))].filter(Boolean);
  featuredCount = projects.filter((p) => p.featured).length;
  sorted = [...projects].sort((a, b) => {
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime();
  });
  sorted.filter((p) => {
    return true;
  });
  stats = [
    {
      label: "Total",
      value: projects.length,
      icon: Folder_kanban,
      color: "from-blue-500 to-blue-600"
    },
    {
      label: "À la une",
      value: featuredCount,
      icon: Star,
      color: "from-yellow-500 to-yellow-600"
    },
    {
      label: "Catégories",
      value: categories.length,
      icon: Filter,
      color: "from-purple-500 to-purple-600"
    },
    {
      label: "Avec image",
      value: projects.filter((p) => p.images?.length > 0).length,
      icon: Image_off,
      color: "from-green-500 to-green-600"
    }
  ];
  return `<div class="space-y-6"> <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4"><div><h1 class="text-3xl font-bold tracking-tight" data-svelte-h="svelte-1fa1ka0">Projets</h1> <p class="text-sm text-gray-500 mt-1">${escape(projects.length)} projet${escape(projects.length > 1 ? "s" : "")} · ${escape(featuredCount)} à la une</p></div> <div class="flex items-center gap-2"><button class="btn-ghost border border-gray-300 dark:border-gray-600 gap-2 text-sm">${validate_component(Github, "Github").$$render($$result, { size: 16 }, {}, {})} Importer</button> <a href="/admin/projects/new" class="btn-primary gap-2 text-sm">${validate_component(Plus, "Plus").$$render($$result, { size: 16 }, {}, {})} Nouveau projet</a></div></div>  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">${each(stats, (s) => {
    return `<div class="card p-4 flex items-center gap-3"><div class="${"w-10 h-10 rounded-xl bg-gradient-to-br " + escape(s.color, true) + " flex items-center justify-center text-white"}">${validate_component(s.icon || missing_component, "svelte:component").$$render($$result, { size: 18 }, {}, {})}</div> <div><div class="text-2xl font-bold">${escape(s.value)}</div> <div class="text-xs text-gray-500">${escape(s.label)}</div></div> </div>`;
  })}</div>  <div class="card p-3 flex flex-wrap items-center gap-3"><div class="relative flex-1 min-w-[200px]">${validate_component(Search, "Search").$$render(
    $$result,
    {
      size: 16,
      class: "absolute left-3 top-1/2 -translate-y-1/2 text-gray-400"
    },
    {},
    {}
  )} <input type="text" placeholder="Rechercher un projet..." class="input pl-9 text-sm"${add_attribute("value", search, 0)}> ${``}</div> <select class="input text-sm w-auto min-w-[130px]"><option value="" data-svelte-h="svelte-14hzqiw">Toutes catégories</option>${each(categories, (cat) => {
    return `<option${add_attribute("value", cat, 0)}>${escape(CATEGORY_LABELS[cat] || cat)}</option>`;
  })}</select> <button class="btn-ghost border border-gray-300 dark:border-gray-600 gap-2 text-sm whitespace-nowrap">${validate_component(Arrow_up_down, "ArrowUpDown").$$render($$result, { size: 14 }, {}, {})} ${escape("Date")}</button> <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden"><button class="${"p-2 " + escape(
    "bg-primary-100 dark:bg-primary-900/30 text-primary-600",
    true
  )}">${validate_component(Grid_3x3, "Grid").$$render($$result, { size: 16 }, {}, {})}</button> <button class="${"p-2 " + escape(
    "text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800",
    true
  )}">${validate_component(List, "ListIcon").$$render($$result, { size: 16 }, {}, {})}</button></div></div>  ${`<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">${each([1, 2, 3, 4, 5, 6], (_) => {
    return `<div class="card p-0 overflow-hidden animate-pulse" data-svelte-h="svelte-xg7xd8"><div class="h-40 bg-gray-200 dark:bg-gray-800"></div> <div class="p-4 space-y-2"><div class="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4"></div> <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2"></div> <div class="h-8 bg-gray-200 dark:bg-gray-800 rounded w-full"></div></div> </div>`;
  })}</div>`}</div>  ${``}  ${``}`;
});
export {
  Page as default
};
