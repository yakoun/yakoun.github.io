import { c as create_ssr_component, o as onDestroy, f as each, v as validate_component, e as escape, d as add_attribute } from './ssr-huwnW4RW.js';
import { s as supabase } from './supabase-CbuSEcXR.js';
import { Chart, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { I as Icon } from './Icon-CGrK4NTA.js';
import { X } from './x-Fnu8fdo6.js';
import { F as Folder_kanban } from './folder-kanban-BKcpKqU6.js';
import { M as Mail } from './mail-COiZMyjO.js';
import { C as Clock } from './clock-Bub3Q40l.js';
import '@supabase/supabase-js';

const Award = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "m15.477 12.89 1.515 8.526a.5.5 0 0 1-.81.47l-3.58-2.687a1 1 0 0 0-1.197 0l-3.586 2.686a.5.5 0 0 1-.81-.469l1.514-8.526"
      }
    ],
    ["circle", { "cx": "12", "cy": "8", "r": "6" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "award" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Bar_chart_3 = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M3 3v18h18" }],
    ["path", { "d": "M18 17V9" }],
    ["path", { "d": "M13 17V5" }],
    ["path", { "d": "M8 17v-3" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "bar-chart-3" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Bell = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9"
      }
    ],
    ["path", { "d": "M10.3 21a1.94 1.94 0 0 0 3.4 0" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "bell" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Briefcase = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M16 20V4a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"
      }
    ],
    [
      "rect",
      {
        "width": "20",
        "height": "14",
        "x": "2",
        "y": "6",
        "rx": "2"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "briefcase" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Cpu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "16",
        "height": "16",
        "x": "4",
        "y": "4",
        "rx": "2"
      }
    ],
    [
      "rect",
      {
        "width": "6",
        "height": "6",
        "x": "9",
        "y": "9",
        "rx": "1"
      }
    ],
    ["path", { "d": "M15 2v2" }],
    ["path", { "d": "M15 20v2" }],
    ["path", { "d": "M2 15h2" }],
    ["path", { "d": "M2 9h2" }],
    ["path", { "d": "M20 15h2" }],
    ["path", { "d": "M20 9h2" }],
    ["path", { "d": "M9 2v2" }],
    ["path", { "d": "M9 20v2" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "cpu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Graduation_cap = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M21.42 10.922a1 1 0 0 0-.019-1.838L12.83 5.18a2 2 0 0 0-1.66 0L2.6 9.08a1 1 0 0 0 0 1.832l8.57 3.908a2 2 0 0 0 1.66 0z"
      }
    ],
    ["path", { "d": "M22 10v6" }],
    ["path", { "d": "M6 12.5V16a6 3 0 0 0 12 0v-3.5" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "graduation-cap" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Heart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "heart" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Image = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "rect",
      {
        "width": "18",
        "height": "18",
        "x": "3",
        "y": "3",
        "rx": "2",
        "ry": "2"
      }
    ],
    ["circle", { "cx": "9", "cy": "9", "r": "2" }],
    [
      "path",
      {
        "d": "m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "image" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Languages = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "m5 8 6 6" }],
    ["path", { "d": "m4 14 6-6 2-3" }],
    ["path", { "d": "M2 5h12" }],
    ["path", { "d": "M7 2h1" }],
    ["path", { "d": "m22 22-5-10-5 10" }],
    ["path", { "d": "M14 18h6" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "languages" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Trending_up = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["polyline", { "points": "22 7 13.5 15.5 8.5 10.5 2 17" }],
    ["polyline", { "points": "16 7 22 7 22 13" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "trending-up" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const User = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"
      }
    ],
    ["circle", { "cx": "12", "cy": "7", "r": "4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "user" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const RadarChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Chart.register(RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend);
  let { data = [] } = $$props;
  let { title = "" } = $$props;
  let canvas;
  let chart;
  onDestroy(() => chart?.destroy());
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  return `<div class="relative">${title ? `<h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">${escape(title)}</h3>` : ``} <canvas${add_attribute("this", canvas, 0)}></canvas></div>`;
});
const BarChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Chart.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);
  let { data = [] } = $$props;
  let { title = "" } = $$props;
  let { horizontal = false } = $$props;
  let { color = "rgba(99, 102, 241, 0.8)" } = $$props;
  let canvas;
  let chart;
  onDestroy(() => chart?.destroy());
  if ($$props.data === void 0 && $$bindings.data && data !== void 0) $$bindings.data(data);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.horizontal === void 0 && $$bindings.horizontal && horizontal !== void 0) $$bindings.horizontal(horizontal);
  if ($$props.color === void 0 && $$bindings.color && color !== void 0) $$bindings.color(color);
  return `<div class="relative">${title ? `<h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">${escape(title)}</h3>` : ``} <canvas${add_attribute("this", canvas, 0)}></canvas></div>`;
});
const TimelineChart = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  Chart.register(BarElement, CategoryScale, LinearScale, Tooltip);
  let { experiences = [] } = $$props;
  let { title = "" } = $$props;
  let canvas;
  let chart;
  onDestroy(() => chart?.destroy());
  if ($$props.experiences === void 0 && $$bindings.experiences && experiences !== void 0) $$bindings.experiences(experiences);
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  return `<div class="relative">${title ? `<h3 class="text-sm font-semibold text-gray-600 dark:text-gray-400 mb-2">${escape(title)}</h3>` : ``} <canvas${add_attribute("this", canvas, 0)}></canvas></div>`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let categories;
  let topSkillsData;
  let topSoftwareData;
  let stats = {};
  let recentMessages = [];
  let loading = true;
  let skills = [];
  let softwareTools = [];
  let experiences = [];
  let newMessage = null;
  let notification = null;
  let notificationTimeout = null;
  let unreadCount = 0;
  let channel = null;
  function showNotif(msg) {
    if (notificationTimeout) clearTimeout(notificationTimeout);
    notification = {
      name: msg.name,
      email: msg.email,
      message: msg.message,
      time: /* @__PURE__ */ (/* @__PURE__ */ new Date()).toLocaleTimeString("fr-FR")
    };
    notificationTimeout = setTimeout(
      () => {
        notification = null;
      },
      6e3
    );
    unreadCount++;
    newMessage = msg;
    setTimeout(() => newMessage = null, 300);
  }
  async function loadDashboard() {
    const tables = [
      "projects",
      "skills",
      "services",
      "messages",
      "gallery",
      "profile_info",
      "experience",
      "education",
      "languages",
      "hobbies",
      "software_tools",
      "certifications"
    ];
    const results = await Promise.all(tables.map((t) => supabase.from(t).select("*", { count: "exact", head: true })));
    tables.forEach((t, i) => stats[t] = results[i].count || 0);
    const { data: msgs } = await supabase.from("messages").select("*").order("created_at", { ascending: false }).limit(5);
    recentMessages = msgs || [];
    unreadCount = stats.messages || 0;
    const [sk, sw, ex] = await Promise.all([
      supabase.from("skills").select("*").order("level", { ascending: false }).limit(10),
      supabase.from("software_tools").select("*").order("level", { ascending: false }).limit(10),
      supabase.from("experience").select("*").order("order")
    ]);
    skills = sk.data || [];
    softwareTools = sw.data || [];
    experiences = ex.data || [];
    loading = false;
    channel = supabase.channel("messages-realtime").on(
      "postgres_changes",
      {
        event: "INSERT",
        schema: "public",
        table: "messages"
      },
      (payload) => {
        const msg = payload.new;
        stats.messages = (stats.messages || 0) + 1;
        recentMessages = [msg, ...recentMessages].slice(0, 5);
        showNotif(msg);
      }
    ).subscribe();
  }
  loadDashboard();
  onDestroy(() => {
    channel?.unsubscribe();
  });
  const catLabels = {
    electricite: "Électricité",
    reseaux: "Réseaux",
    wifi: "WiFi",
    paraboles: "Paraboles",
    programmation: "Programmation",
    "dev-web": "Développement Web",
    "dev-apps": "Apps Desktop",
    automatisation: "Automatisation"
  };
  categories = Object.entries(skills.reduce(
    (acc, s) => {
      if (!acc[s.category]) acc[s.category] = [];
      acc[s.category].push(s.level || 0);
      return acc;
    },
    {}
  )).map(([key, vals]) => ({
    label: catLabels[key] || key,
    value: Math.round(vals.reduce((a, b) => a + b, 0) / vals.length * 10) / 10
  }));
  topSkillsData = skills.map((s) => ({ label: s.name, value: s.level || 0 }));
  topSoftwareData = softwareTools.map((s) => ({ label: s.name, value: s.level || 0 }));
  return `${$$result.head += `<!-- HEAD_svelte-1j1bh6a_START -->${$$result.title = `<title>Dashboard — Admin</title>`, ""}<!-- HEAD_svelte-1j1bh6a_END -->`, ""}  ${notification ? `<div class="fixed top-4 right-4 z-50 max-w-sm animate-slideDown" style="animation: slideDown 0.3s ease-out"><div class="bg-white dark:bg-gray-900 rounded-xl shadow-2xl border border-primary-200 dark:border-primary-800 p-4 flex items-start gap-3"><div class="w-8 h-8 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600 shrink-0">${validate_component(Bell, "Bell").$$render($$result, { size: 16 }, {}, {})}</div> <div class="flex-1 min-w-0"><div class="flex items-center justify-between gap-2"><p class="text-sm font-semibold">${escape(notification.name)}</p> <button class="text-gray-400 hover:text-gray-600 shrink-0">${validate_component(X, "X").$$render($$result, { size: 14 }, {}, {})}</button></div> <p class="text-xs text-gray-500">${escape(notification.email)}</p> <p class="text-sm text-gray-600 dark:text-gray-400 mt-1 truncate">${escape(notification.message)}</p> <p class="text-[10px] text-gray-400 mt-1">${escape(notification.time)}</p></div></div></div>` : ``} <div class="flex items-center justify-between mb-6"><h1 class="text-2xl font-bold" data-svelte-h="svelte-1buqk9m">Dashboard</h1> ${unreadCount > 0 ? `<div class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary-50 dark:bg-primary-900/30 text-primary-700 text-xs font-medium">${validate_component(Bell, "Bell").$$render($$result, { size: 14 }, {}, {})} ${escape(stats.messages)} message${escape(stats.messages > 1 ? "s" : "")}</div>` : ``}</div> ${loading ? `<div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-8">${each([1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], (i) => {
    return `<div${add_attribute("key", i, 0)} class="card p-4 animate-pulse h-20"></div>`;
  })}</div> <div class="grid lg:grid-cols-2 gap-6">${each([1, 2, 3], (i) => {
    return `<div${add_attribute("key", i, 0)} class="card animate-pulse h-64"></div>`;
  })}</div>` : ` <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-3 mb-8"><a href="/admin/profil" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-blue-500 flex items-center justify-center text-white shrink-0">${validate_component(User, "User").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.profile_info || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-iel3x3">Profil</p></div></a> <a href="/admin/experiences" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-cyan-500 flex items-center justify-center text-white shrink-0">${validate_component(Briefcase, "Briefcase").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.experience || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-17mlofg">Expériences</p></div></a> <a href="/admin/education" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-teal-500 flex items-center justify-center text-white shrink-0">${validate_component(Graduation_cap, "GraduationCap").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.education || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-1lw4whx">Formations</p></div></a> <a href="/admin/skills" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-green-500 flex items-center justify-center text-white shrink-0">${validate_component(Bar_chart_3, "BarChart3").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.skills || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-5a9btv">Compétences</p></div></a> <a href="/admin/certifications" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0">${validate_component(Award, "Award").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.certifications || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-1wq6nco">Certifications</p></div></a> <a href="/admin/languages" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-purple-500 flex items-center justify-center text-white shrink-0">${validate_component(Languages, "Languages").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.languages || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-s2ial6">Langues</p></div></a> <a href="/admin/hobbies" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-pink-500 flex items-center justify-center text-white shrink-0">${validate_component(Heart, "Heart").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.hobbies || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-e5dmq2">Loisirs</p></div></a> <a href="/admin/software" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-indigo-500 flex items-center justify-center text-white shrink-0">${validate_component(Cpu, "Cpu").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.software_tools || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-8gq4p4">Logiciels</p></div></a> <a href="/admin/projects" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-amber-500 flex items-center justify-center text-white shrink-0">${validate_component(Folder_kanban, "FolderKanban").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.projects || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-175u60q">Projets</p></div></a> <a href="/admin/services" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-orange-500 flex items-center justify-center text-white shrink-0">${validate_component(Briefcase, "Briefcase").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.services || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-1pgge5t">Services</p></div></a> <a href="/admin/gallery" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-red-500 flex items-center justify-center text-white shrink-0">${validate_component(Image, "Image").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.gallery || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-k0tofw">Galerie</p></div></a> <a href="/admin/messages" class="card flex items-center gap-3 p-4 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200 cursor-pointer"><div class="w-9 h-9 rounded-lg bg-rose-500 flex items-center justify-center text-white shrink-0">${validate_component(Mail, "Mail").$$render($$result, { size: 18 }, {}, {})}</div> <div><p class="text-lg font-bold">${escape(stats.messages || 0)}</p><p class="text-xs text-gray-500" data-svelte-h="svelte-1v9oulp">Messages</p></div></a></div>  <div class="grid lg:grid-cols-2 gap-6 mb-6"><div class="card p-5"><div class="flex items-center gap-2 mb-4"><div class="w-8 h-8 rounded-lg bg-green-100 dark:bg-green-900/30 flex items-center justify-center text-green-600">${validate_component(Bar_chart_3, "BarChart3").$$render($$result, { size: 16 }, {}, {})}</div> <h2 class="font-semibold text-sm" data-svelte-h="svelte-hdx6ys">Compétences par catégorie</h2></div> ${categories.length > 0 ? `<div class="max-w-sm mx-auto">${validate_component(RadarChart, "RadarChart").$$render($$result, { data: categories, title: "" }, {}, {})}</div>` : `<p class="text-sm text-gray-400 text-center py-8" data-svelte-h="svelte-69gf0c">Aucune compétence</p>`}</div> <div class="card p-5"><div class="flex items-center gap-2 mb-4"><div class="w-8 h-8 rounded-lg bg-indigo-100 dark:bg-indigo-900/30 flex items-center justify-center text-indigo-600">${validate_component(Trending_up, "TrendingUp").$$render($$result, { size: 16 }, {}, {})}</div> <h2 class="font-semibold text-sm" data-svelte-h="svelte-1aqazt">Top compétences</h2></div> ${topSkillsData.length > 0 ? `${validate_component(BarChart, "BarChart").$$render(
    $$result,
    {
      data: topSkillsData,
      title: "",
      horizontal: true,
      color: "rgba(99, 102, 241, 0.8)"
    },
    {},
    {}
  )}` : `<p class="text-sm text-gray-400 text-center py-8" data-svelte-h="svelte-69gf0c">Aucune compétence</p>`}</div></div>  <div class="grid lg:grid-cols-2 gap-6 mb-6"><div class="card p-5"><div class="flex items-center gap-2 mb-4"><div class="w-8 h-8 rounded-lg bg-cyan-100 dark:bg-cyan-900/30 flex items-center justify-center text-cyan-600">${validate_component(Cpu, "Cpu").$$render($$result, { size: 16 }, {}, {})}</div> <h2 class="font-semibold text-sm" data-svelte-h="svelte-1j4e2h8">Top logiciels</h2></div> ${topSoftwareData.length > 0 ? `${validate_component(BarChart, "BarChart").$$render(
    $$result,
    {
      data: topSoftwareData,
      title: "",
      horizontal: true,
      color: "rgba(6, 182, 212, 0.8)"
    },
    {},
    {}
  )}` : `<p class="text-sm text-gray-400 text-center py-8" data-svelte-h="svelte-lfixao">Aucun logiciel</p>`}</div> <div class="card p-5"><div class="flex items-center gap-2 mb-4"><div class="w-8 h-8 rounded-lg bg-purple-100 dark:bg-purple-900/30 flex items-center justify-center text-purple-600">${validate_component(Clock, "Clock").$$render($$result, { size: 16 }, {}, {})}</div> <h2 class="font-semibold text-sm" data-svelte-h="svelte-1vtotw0">Timeline expériences</h2></div> ${experiences.length > 0 ? `${validate_component(TimelineChart, "TimelineChart").$$render($$result, { experiences, title: "" }, {}, {})}` : `<p class="text-sm text-gray-400 text-center py-8" data-svelte-h="svelte-lapxun">Aucune expérience</p>`}</div></div>  <div class="card p-5"><div class="flex items-center justify-between mb-4"><div class="flex items-center gap-2"><div class="w-8 h-8 rounded-lg bg-rose-100 dark:bg-rose-900/30 flex items-center justify-center text-rose-600">${validate_component(Mail, "Mail").$$render($$result, { size: 16 }, {}, {})}</div> <h2 class="font-semibold text-sm" data-svelte-h="svelte-1pxm560">Derniers messages</h2></div> <a href="/admin/messages" class="text-sm text-primary-600 hover:underline" data-svelte-h="svelte-279ecz">Voir tout</a></div> ${recentMessages.length === 0 ? `<p class="text-sm text-gray-400 py-8 text-center" data-svelte-h="svelte-szy88v">Aucun message</p>` : `<div class="space-y-2">${each(recentMessages, (msg, i) => {
    return `<div class="${"flex items-start gap-3 p-3 rounded-lg bg-gray-50 dark:bg-gray-800 transition-colors " + escape(
      i === 0 && newMessage ? "ring-2 ring-green-400 dark:ring-green-600" : "",
      true
    )}"><div class="w-8 h-8 rounded-full bg-primary-100 dark:bg-primary-900 flex items-center justify-center text-primary-600 text-sm font-medium shrink-0">${escape(msg.name?.charAt(0).toUpperCase())}</div> <div class="flex-1 min-w-0"><div class="flex items-center gap-2"><span class="font-medium text-sm">${escape(msg.name)}</span> <span class="text-xs text-gray-400">${escape(new Date(msg.created_at).toLocaleDateString("fr-FR"))}</span> ${i === 0 && newMessage ? `<span class="text-[10px] px-1.5 py-0.5 rounded-full bg-green-100 dark:bg-green-900/30 text-green-700 font-medium" data-svelte-h="svelte-1k381t4">Nouveau</span>` : ``}</div> <p class="text-sm text-gray-500 truncate">${escape(msg.message)}</p></div> </div>`;
  })}</div>`}</div>`}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-Cp5Yx1WW.js.map
