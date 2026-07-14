import { c as create_ssr_component, e as escape, v as validate_component, f as each, d as add_attribute } from './ssr-huwnW4RW.js';
import './supabase-CbuSEcXR.js';
import { M as Mail } from './mail-COiZMyjO.js';
import { P as Phone, M as Map_pin } from './phone-CX33i-mH.js';
import '@supabase/supabase-js';
import './Icon-CGrK4NTA.js';

const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let p;
  p = {
    first_name: "Ouniboryabi",
    last_name: "YAKOUN",
    title: "Électrotechnicien",
    summary: "Passionné par les technologies électriques, les réseaux télécom et le développement web, je possède une expertise en installation et maintenance des systèmes électriques, configuration des infrastructures réseau et création d'applications web. Rigoureux et polyvalent, je mets mes compétences au service de solutions innovantes et performantes, tout en respectant les normes de sécurité et de qualité.",
    address: "Tsévié, Togo",
    phone: "+22897533307",
    email: "yakounouniboryabi@gmail.com",
    birth_date: "1999-05-04"
  };
  return `${$$result.head += `<!-- HEAD_svelte-174o0g8_START -->${$$result.title = `<title>À propos — ${escape(p.first_name)} ${escape(p.last_name)}</title>`, ""}<!-- HEAD_svelte-174o0g8_END -->`, ""} <section class="pt-24 pb-16 px-4"><div class="max-w-5xl mx-auto"><div class="text-center mb-12 animate-fadeIn"><div class="w-20 h-20 mx-auto rounded-2xl bg-gradient-to-br from-primary-500 to-purple-600 flex items-center justify-center text-3xl font-bold text-white mb-4 shadow-lg shadow-primary-500/30">${escape(p.first_name?.charAt(0))}${escape(p.last_name?.charAt(0))}</div> <h1 class="text-4xl md:text-5xl font-bold mb-3 bg-gradient-to-r from-primary-600 via-purple-600 to-primary-600 bg-clip-text text-transparent bg-[length:200%] animate-gradient">${escape(p.first_name)} ${escape(p.last_name)}</h1> <p class="text-xl text-gray-500 dark:text-gray-400 mb-6">${escape(p.title)}</p> <div class="flex flex-wrap justify-center gap-3 text-sm text-gray-500 dark:text-gray-400">${p.email ? `<a href="${"mailto:" + escape(p.email, true)}" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:text-primary-600 transition-colors">${validate_component(Mail, "Mail").$$render($$result, { size: 14 }, {}, {})} ${escape(p.email)}</a>` : ``} ${p.phone ? `<a href="${"tel:" + escape(p.phone, true)}" class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800 hover:text-primary-600 transition-colors">${validate_component(Phone, "Phone").$$render($$result, { size: 14 }, {}, {})} ${escape(p.phone)}</a>` : ``} ${p.address ? `<span class="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-100 dark:bg-gray-800">${validate_component(Map_pin, "MapPin").$$render($$result, { size: 14 }, {}, {})} ${escape(p.address)}</span>` : ``}</div></div> ${p.summary ? `<div class="max-w-3xl mx-auto mb-16 animate-slideUp"><div class="relative p-8 rounded-2xl bg-gradient-to-br from-primary-50 to-purple-50 dark:from-primary-900/10 dark:to-purple-900/10 border border-primary-100 dark:border-primary-900/30"><div class="absolute -top-3 -left-3 w-8 h-8 rounded-xl bg-primary-600 flex items-center justify-center text-white shadow-lg shadow-primary-500/30" data-svelte-h="svelte-1v539bb"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M3 21c3 0 7-1 7-8V5c0-1.25-.756-2.017-2-2H4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2 1 0 1 0 1 1v1c0 1-1 2-2 2s-1 .008-1 1.031V20c0 1 0 1 1 1z"></path><path d="M15 21c3 0 7-1 7-8V5c0-1.25-.757-2.017-2-2h-4c-1.25 0-2 .75-2 1.972V11c0 1.25.75 2 2 2h.75c0 2.25.25 4-2.75 4v3c0 1 0 1 1 1z"></path></svg></div> <p class="text-gray-700 dark:text-gray-300 leading-relaxed text-lg italic">${escape(p.summary)}</p></div></div>` : ``} ${`<div class="animate-pulse space-y-6">${each([1, 2, 3], (i) => {
    return `<div${add_attribute("key", i, 0)} class="h-48 bg-gray-200 dark:bg-gray-800 rounded-2xl"></div>`;
  })}</div>`}</div></section>  ${``}`;
});

export { Page as default };
//# sourceMappingURL=_page.svelte-D7te9mE4.js.map
