import { c as create_ssr_component, e as escape, v as validate_component, f as each, m as missing_component, d as add_attribute } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import { Z as Zap } from './zap-DK4IHLY1.js';
import { I as Icon } from './Icon-CGrK4NTA.js';
import { A as Arrow_right } from './arrow-right-DzisWQXI.js';
import { M as Map_pin, P as Phone } from './phone-CX33i-mH.js';
import { M as Mail } from './mail-COiZMyjO.js';
import '@supabase/supabase-js';

const Code = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["polyline", { "points": "16 18 22 12 16 6" }],
    ["polyline", { "points": "8 6 2 12 8 18" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "code" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Wifi = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    ["path", { "d": "M12 20h.01" }],
    ["path", { "d": "M2 8.82a15 15 0 0 1 20 0" }],
    ["path", { "d": "M5 12.859a10 10 0 0 1 14 0" }],
    ["path", { "d": "M8.5 16.429a5 5 0 0 1 7 0" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "wifi" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let p;
  let svc;
  let projects = [];
  let services = [];
  const defaultProfile = {
    first_name: "Thomas",
    last_name: "Dubois",
    title: "Électrotechnicien & Développeur",
    summary: "Expert en installation électrique, réseaux et développement web.",
    phone: "+33 6 00 00 00 00",
    email: "contact@electrodev.fr",
    address: "Région Parisienne"
  };
  const defaultServices = [
    {
      title: "Installation Électrique",
      description: "Tableaux, câblage, mise aux normes, dépannage.",
      icon: Zap
    },
    {
      title: "Réseaux & WiFi",
      description: "Installation WiFi mesh, fibre optique, câblage RJ45.",
      icon: Wifi
    },
    {
      title: "Développement Web",
      description: "Sites vitrine, applications, automatisaton.",
      icon: Code
    }
  ];
  p = defaultProfile;
  svc = services.length > 0 ? services : defaultServices;
  return `${$$result.head += `<!-- HEAD_svelte-1nah49z_START -->${$$result.title = `<title>${escape(p.first_name)} ${escape(p.last_name)} — Portfolio</title>`, ""}<!-- HEAD_svelte-1nah49z_END -->`, ""}  <section class="relative min-h-[90vh] flex items-center justify-center px-4 overflow-hidden"><div class="absolute inset-0 bg-gradient-to-br from-primary-50 via-white to-purple-50 dark:from-gray-950 dark:via-gray-900 dark:to-primary-950"></div> <div class="absolute inset-0 opacity-[0.03] dark:opacity-[0.05]" style="background-image: url(&quot;data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%232563eb' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E&quot;);"></div> <div class="relative text-center max-w-3xl mx-auto"><div class="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-primary-500 to-purple-500 flex items-center justify-center text-white text-2xl font-bold shadow-lg mb-6">${escape(p.first_name?.charAt(0))}${escape(p.last_name?.charAt(0))}</div> <h1 class="text-4xl md:text-6xl font-bold tracking-tight mb-4">${escape(p.first_name)} <span class="gradient-text">${escape(p.last_name)}</span></h1> <p class="text-lg md:text-xl text-primary-600 dark:text-primary-400 font-medium mb-4">${escape(p.title)}</p> <p class="text-gray-500 dark:text-gray-400 max-w-xl mx-auto mb-8">${escape(p.summary)}</p> <div class="flex flex-wrap justify-center gap-3"><a href="/a-propos" class="btn-primary">En savoir plus ${validate_component(Arrow_right, "ArrowRight").$$render($$result, { size: 16 }, {}, {})}</a> <a href="/contact" class="btn-secondary" data-svelte-h="svelte-1pr1zh2">Me contacter</a></div> <div class="flex flex-wrap justify-center gap-6 mt-8 text-sm text-gray-400"><span class="flex items-center gap-1.5">${validate_component(Map_pin, "MapPin").$$render($$result, { size: 14 }, {}, {})} ${escape(p.address)}</span> <a href="${"mailto:" + escape(p.email, true)}" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors">${validate_component(Mail, "Mail").$$render($$result, { size: 14 }, {}, {})} ${escape(p.email)}</a> <a href="${"tel:" + escape(p.phone, true)}" class="flex items-center gap-1.5 hover:text-primary-600 transition-colors">${validate_component(Phone, "Phone").$$render($$result, { size: 14 }, {}, {})} ${escape(p.phone)}</a></div></div></section> <div class="max-w-5xl mx-auto px-4 pb-20 space-y-24"> <section><div class="text-center mb-12" data-svelte-h="svelte-1ekzqnp"><h2 class="section-title">Mes Services</h2> <p class="section-subtitle">Des solutions complètes pour vos projets électriques et numériques</p></div> <div class="grid md:grid-cols-3 gap-6">${each(svc, (s) => {
    return `<div class="card-hover text-center"><div class="w-12 h-12 mx-auto rounded-xl bg-primary-100 dark:bg-primary-900/50 flex items-center justify-center text-primary-600 mb-4">${validate_component(s.icon || Zap || missing_component, "svelte:component").$$render($$result, { size: 24 }, {}, {})}</div> <h3 class="text-lg font-semibold mb-2">${escape(s.title)}</h3> <p class="text-sm text-gray-500 dark:text-gray-400">${escape(s.description)}</p> </div>`;
  })}</div></section>  <section><div class="flex items-end justify-between mb-8"><div data-svelte-h="svelte-1kpu82m"><h2 class="section-title">Projets Récents</h2> <p class="section-subtitle text-left mx-0">Quelques réalisations récentes</p></div> <a href="/projets" class="btn-secondary text-sm hidden sm:inline-flex">Voir tout ${validate_component(Arrow_right, "ArrowRight").$$render($$result, { size: 14 }, {}, {})}</a></div> <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">${each(projects, (project) => {
    return `<a href="${"/projets/" + escape(project.slug, true)}" class="group card-hover p-0 overflow-hidden">${project.images?.length ? `<div class="aspect-video bg-gray-100 dark:bg-gray-800 overflow-hidden"><img${add_attribute("src", project.images[0], 0)}${add_attribute("alt", project.title, 0)} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"> </div>` : `<div class="aspect-video bg-gradient-to-br from-primary-100 to-purple-100 dark:from-primary-900/20 dark:to-purple-900/20 flex items-center justify-center"><span class="text-2xl font-bold text-primary-300 dark:text-primary-700">${escape(project.title?.charAt(0) || "P")}</span> </div>`} <div class="p-4"><h3 class="font-semibold text-sm group-hover:text-primary-600 transition-colors">${escape(project.title)}</h3> <p class="text-xs text-gray-400 mt-1 capitalize">${escape(project.category?.replace("-", " "))}</p></div> </a>`;
  })}</div> <div class="text-center mt-6 sm:hidden"><a href="/projets" class="btn-secondary text-sm">Voir tout ${validate_component(Arrow_right, "ArrowRight").$$render($$result, { size: 14 }, {}, {})}</a></div></section>  <section class="rounded-2xl bg-gradient-to-br from-primary-600 to-purple-600 p-8 md:p-12 text-center text-white"><h2 class="text-2xl md:text-3xl font-bold mb-4" data-svelte-h="svelte-143ypk6">Prêt à concrétiser votre projet ?</h2> <p class="text-white/80 mb-6 max-w-lg mx-auto" data-svelte-h="svelte-18h6hpg">Discutons de vos besoins. Devis gratuit et sans engagement.</p> <div class="flex flex-wrap justify-center gap-3"><a href="/contact" class="inline-flex items-center gap-2 px-6 py-3 bg-white text-primary-700 rounded-xl font-medium hover:bg-gray-100 transition-colors" data-svelte-h="svelte-1joxas2">Me contacter</a> <a href="${"tel:" + escape(p.phone, true)}" class="inline-flex items-center gap-2 px-6 py-3 border-2 border-white/30 rounded-xl font-medium hover:bg-white/10 transition-colors">${validate_component(Phone, "Phone").$$render($$result, { size: 16 }, {}, {})} ${escape(p.phone)}</a></div></section></div>`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-ZOyV_7aF.js.map
