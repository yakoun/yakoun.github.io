import { c as create_ssr_component, b as subscribe, e as escape, f as each, v as validate_component, d as add_attribute } from './ssr-huwnW4RW.js';
import { t as theme } from './theme-B2QhgEeN.js';
import './supabase-CbuSEcXR.js';
import { I as Icon } from './Icon-CGrK4NTA.js';
import './index2-C8PNV9uQ.js';
import '@supabase/supabase-js';

const Menu = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "12",
        "y2": "12"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "6",
        "y2": "6"
      }
    ],
    [
      "line",
      {
        "x1": "4",
        "x2": "20",
        "y1": "18",
        "y2": "18"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "menu" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const ThemeToggle = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => value);
  $$unsubscribe_theme();
  return `${``}`;
});
const css = {
  code: "@keyframes svelte-1rqt8lp-slideDown{from{opacity:0;transform:translateY(-10px)}to{opacity:1;transform:translateY(0)}}.animate-slideDown{animation:svelte-1rqt8lp-slideDown 0.2s ease-out}.animate-pulse-slow{animation:pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite}@keyframes svelte-1rqt8lp-float{0%,100%{transform:translateY(0px) rotate(0deg)}50%{transform:translateY(-20px) rotate(5deg)}}.animate-float{animation:svelte-1rqt8lp-float 5s ease-in-out infinite}@media print{header.svelte-1rqt8lp,footer.svelte-1rqt8lp{display:none !important}}",
  map: `{"version":3,"file":"+layout.svelte","sources":["+layout.svelte"],"sourcesContent":["<script lang=\\"ts\\">import { theme } from \\"$lib/stores/theme\\";\\nimport ThemeToggle from \\"$lib/components/ThemeToggle.svelte\\";\\nimport { Menu, X } from \\"lucide-svelte\\";\\nimport { onMount } from \\"svelte\\";\\nimport { supabase } from \\"$lib/api/supabase\\";\\nlet mobileOpen = false;\\nlet scrolled = false;\\nlet initials = \\"ED\\";\\nconst links = [\\n  { href: \\"/\\", label: \\"Accueil\\", icon: \\"M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6\\" },\\n  { href: \\"/a-propos\\", label: \\"\\\\xC0 propos\\", icon: \\"M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z\\" },\\n  { href: \\"/projets\\", label: \\"Projets\\", icon: \\"M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2\\" },\\n  { href: \\"/contact\\", label: \\"Contact\\", icon: \\"M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z\\" }\\n];\\nfunction handleScroll() {\\n  scrolled = window.scrollY > 20;\\n}\\nif (typeof window !== \\"undefined\\") window.addEventListener(\\"scroll\\", handleScroll);\\nonMount(async () => {\\n  try {\\n    const { data } = await supabase.from(\\"profile_info\\").select(\\"first_name,last_name\\").single();\\n    if (data) initials = (data.first_name?.charAt(0) || \\"\\") + (data.last_name?.charAt(0) || \\"\\");\\n  } catch (_) {\\n  }\\n});\\n<\/script>\\n\\n<div class=\\"min-h-screen transition-colors duration-300\\" class:dark={$theme === 'dark'}>\\n  <!-- Animated background -->\\n  <div class=\\"fixed inset-0 -z-10 overflow-hidden pointer-events-none\\">\\n    <div class=\\"absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-3xl animate-pulse-slow\\" />\\n    <div class=\\"absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl animate-pulse-slow\\" style=\\"animation-delay: 2s\\" />\\n    <svg class=\\"absolute top-1/4 left-1/4 w-8 h-8 text-primary-200/20 dark:text-primary-800/20 animate-float\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1\\"><circle cx=\\"12\\" cy=\\"12\\" r=\\"10\\"/><path d=\\"M12 6v6l4 2\\"/></svg>\\n    <svg class=\\"absolute bottom-1/3 right-1/4 w-6 h-6 text-purple-200/20 dark:text-purple-800/20 animate-float\\" style=\\"animation-delay: 1s; animation-duration: 6s\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1\\"><path d=\\"M12 2L2 7l10 5 10-5-10-5z\\"/><path d=\\"M2 17l10 5 10-5\\"/><path d=\\"M2 12l10 5 10-5\\"/></svg>\\n    <svg class=\\"absolute top-1/3 right-1/3 w-5 h-5 text-amber-200/20 dark:text-amber-800/20 animate-float\\" style=\\"animation-delay: 2s; animation-duration: 7s\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"1\\"><polygon points=\\"12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2\\"/></svg>\\n  </div>\\n\\n  <header class=\\"fixed top-0 left-0 right-0 z-50 transition-all duration-500 {scrolled ? 'glass shadow-lg shadow-black/5' : 'bg-transparent'}\\">\\n    <nav class=\\"max-w-5xl mx-auto px-4 h-16 flex items-center justify-between\\">\\n      <a href=\\"/\\" class=\\"text-lg font-bold tracking-tight group flex items-center gap-2\\">\\n        <div class=\\"w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300 group-hover:scale-105\\">{initials}</div>\\n      </a>\\n\\n      <!-- Desktop nav -->\\n      <div class=\\"hidden md:flex items-center gap-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-1 shadow-sm border border-gray-200/50 dark:border-gray-800/50\\">\\n        {#each links as link}\\n          <a href={link.href} on:click={() => mobileOpen = false} class=\\"flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 text-gray-600 dark:text-gray-400 active:scale-95\\">\\n            <svg width=\\"16\\" height=\\"16\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d={link.icon} /></svg>\\n            {link.label}\\n          </a>\\n        {/each}\\n        <div class=\\"ml-1\\"><ThemeToggle /></div>\\n      </div>\\n\\n      <!-- Mobile -->\\n      <div class=\\"md:hidden flex items-center gap-2\\">\\n        <ThemeToggle />\\n        <button on:click={() => mobileOpen = !mobileOpen} class=\\"p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors\\">\\n          {#if mobileOpen}<X size={20} />{:else}<Menu size={20} />{/if}\\n        </button>\\n      </div>\\n    </nav>\\n\\n    {#if mobileOpen}\\n      <div class=\\"md:hidden border-t border-gray-200/50 dark:border-gray-800/50 bg-white/95 dark:bg-gray-950/95 backdrop-blur-md px-4 py-3 space-y-1 shadow-lg animate-slideDown\\">\\n        {#each links as link}\\n          <a href={link.href} on:click={() => mobileOpen = false} class=\\"flex items-center gap-3 w-full px-3 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 transition-all\\">\\n            <svg width=\\"18\\" height=\\"18\\" viewBox=\\"0 0 24 24\\" fill=\\"none\\" stroke=\\"currentColor\\" stroke-width=\\"2\\" stroke-linecap=\\"round\\" stroke-linejoin=\\"round\\"><path d={link.icon} /></svg>\\n            {link.label}\\n          </a>\\n        {/each}\\n      </div>\\n    {/if}\\n  </header>\\n\\n  <main>\\n    <slot />\\n  </main>\\n\\n  <footer class=\\"border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md py-10\\">\\n    <div class=\\"max-w-5xl mx-auto px-4\\">\\n      <div class=\\"grid md:grid-cols-3 gap-8 mb-8\\">\\n        <div>\\n          <div class=\\"flex items-center gap-2 mb-3\\">\\n            <div class=\\"w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold\\">{initials}</div>\\n            <span class=\\"font-semibold text-sm\\">{initials.charAt(0) || 'E'}{initials.length > 1 ? initials.charAt(1).toLowerCase() : 'd'}.dev</span>\\n          </div>\\n          <p class=\\"text-xs text-gray-500 leading-relaxed\\">Portfolio professionnel - Électrotechnicien & Développeur</p>\\n        </div>\\n        <div>\\n          <h4 class=\\"text-xs font-bold uppercase tracking-wider text-gray-400 mb-3\\">Navigation</h4>\\n          <div class=\\"space-y-2\\">\\n            {#each links as link}\\n              <a href={link.href} class=\\"block text-xs text-gray-500 hover:text-primary-600 transition-colors\\">{link.label}</a>\\n            {/each}\\n          </div>\\n        </div>\\n        <div>\\n          <h4 class=\\"text-xs font-bold uppercase tracking-wider text-gray-400 mb-3\\">Contact</h4>\\n          <p class=\\"text-xs text-gray-500\\">Email pro disponible sur la page contact</p>\\n        </div>\\n      </div>\\n      <div class=\\"border-t border-gray-200 dark:border-gray-800 pt-6 text-center\\">\\n        <p class=\\"text-xs text-gray-400\\">&copy; 2024-2026 {initials.charAt(0) || 'P'}{initials.length > 1 ? initials.charAt(1).toLowerCase() : 'ortfolio'}. Tous droits réservés.</p>\\n      </div>\\n    </div>\\n  </footer>\\n</div>\\n\\n<style>\\n  @keyframes slideDown { from { opacity: 0; transform: translateY(-10px); } to { opacity: 1; transform: translateY(0); } }\\n  :global(.animate-slideDown) { animation: slideDown 0.2s ease-out; }\\n  :global(.animate-pulse-slow) { animation: pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite; }\\n  @keyframes float { 0%, 100% { transform: translateY(0px) rotate(0deg); } 50% { transform: translateY(-20px) rotate(5deg); } }\\n  :global(.animate-float) { animation: float 5s ease-in-out infinite; }\\n  @media print { header, footer { display: none !important; } }\\n</style>\\n"],"names":[],"mappings":"AA8GE,WAAW,wBAAU,CAAE,IAAK,CAAE,OAAO,CAAE,CAAC,CAAE,SAAS,CAAE,WAAW,KAAK,CAAG,CAAE,EAAG,CAAE,OAAO,CAAE,CAAC,CAAE,SAAS,CAAE,WAAW,CAAC,CAAG,CAAE,CAC/G,kBAAoB,CAAE,SAAS,CAAE,wBAAS,CAAC,IAAI,CAAC,QAAU,CAC1D,mBAAqB,CAAE,SAAS,CAAE,KAAK,CAAC,EAAE,CAAC,aAAa,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,GAAG,CAAC,CAAC,CAAC,CAAC,CAAC,QAAU,CAC1F,WAAW,oBAAM,CAAE,EAAE,CAAE,IAAK,CAAE,SAAS,CAAE,WAAW,GAAG,CAAC,CAAC,OAAO,IAAI,CAAG,CAAE,GAAI,CAAE,SAAS,CAAE,WAAW,KAAK,CAAC,CAAC,OAAO,IAAI,CAAG,CAAE,CACpH,cAAgB,CAAE,SAAS,CAAE,oBAAK,CAAC,EAAE,CAAC,WAAW,CAAC,QAAU,CACpE,OAAO,KAAM,CAAE,qBAAM,CAAE,qBAAO,CAAE,OAAO,CAAE,IAAI,CAAC,UAAY,CAAE"}`
};
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  let scrolled = false;
  let initials = "ED";
  const links = [
    {
      href: "/",
      label: "Accueil",
      icon: "M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
    },
    {
      href: "/a-propos",
      label: "À propos",
      icon: "M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
    },
    {
      href: "/projets",
      label: "Projets",
      icon: "M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
    },
    {
      href: "/contact",
      label: "Contact",
      icon: "M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    }
  ];
  function handleScroll() {
    scrolled = window.scrollY > 20;
  }
  if (typeof window !== "undefined") window.addEventListener("scroll", handleScroll);
  $$result.css.add(css);
  $$unsubscribe_theme();
  return `<div class="${["min-h-screen transition-colors duration-300", $theme === "dark" ? "dark" : ""].join(" ").trim()}"> <div class="fixed inset-0 -z-10 overflow-hidden pointer-events-none" data-svelte-h="svelte-1fd5hrd"><div class="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary-500/5 dark:bg-primary-500/10 blur-3xl animate-pulse-slow"></div> <div class="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-purple-500/5 dark:bg-purple-500/10 blur-3xl animate-pulse-slow" style="animation-delay: 2s"></div> <svg class="absolute top-1/4 left-1/4 w-8 h-8 text-primary-200/20 dark:text-primary-800/20 animate-float" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="10"></circle><path d="M12 6v6l4 2"></path></svg> <svg class="absolute bottom-1/3 right-1/4 w-6 h-6 text-purple-200/20 dark:text-purple-800/20 animate-float" style="animation-delay: 1s; animation-duration: 6s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><path d="M12 2L2 7l10 5 10-5-10-5z"></path><path d="M2 17l10 5 10-5"></path><path d="M2 12l10 5 10-5"></path></svg> <svg class="absolute top-1/3 right-1/3 w-5 h-5 text-amber-200/20 dark:text-amber-800/20 animate-float" style="animation-delay: 2s; animation-duration: 7s" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1"><polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon></svg></div> <header class="${"fixed top-0 left-0 right-0 z-50 transition-all duration-500 " + escape(
    scrolled ? "glass shadow-lg shadow-black/5" : "bg-transparent",
    true
  ) + " svelte-1rqt8lp"}"><nav class="max-w-5xl mx-auto px-4 h-16 flex items-center justify-between"><a href="/" class="text-lg font-bold tracking-tight group flex items-center gap-2"><div class="w-8 h-8 rounded-xl bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white text-sm font-bold shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-all duration-300 group-hover:scale-105">${escape(initials)}</div></a>  <div class="hidden md:flex items-center gap-1 bg-white/50 dark:bg-gray-900/50 backdrop-blur-md rounded-2xl p-1 shadow-sm border border-gray-200/50 dark:border-gray-800/50">${each(links, (link) => {
    return `<a${add_attribute("href", link.href, 0)} class="flex items-center gap-2 px-4 py-2 rounded-xl text-sm font-medium transition-all duration-200 hover:bg-primary-50 dark:hover:bg-primary-900/30 hover:text-primary-600 text-gray-600 dark:text-gray-400 active:scale-95"><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path${add_attribute("d", link.icon, 0)}></path></svg> ${escape(link.label)} </a>`;
  })} <div class="ml-1">${validate_component(ThemeToggle, "ThemeToggle").$$render($$result, {}, {}, {})}</div></div>  <div class="md:hidden flex items-center gap-2">${validate_component(ThemeToggle, "ThemeToggle").$$render($$result, {}, {}, {})} <button class="p-2 rounded-xl text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors">${`${validate_component(Menu, "Menu").$$render($$result, { size: 20 }, {}, {})}`}</button></div></nav> ${``}</header> <main>${slots.default ? slots.default({}) : ``}</main> <footer class="border-t border-gray-200 dark:border-gray-800 bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-md py-10 svelte-1rqt8lp"><div class="max-w-5xl mx-auto px-4"><div class="grid md:grid-cols-3 gap-8 mb-8"><div><div class="flex items-center gap-2 mb-3"><div class="w-7 h-7 rounded-lg bg-gradient-to-br from-primary-600 to-purple-600 flex items-center justify-center text-white text-xs font-bold">${escape(initials)}</div> <span class="font-semibold text-sm">${escape(initials.charAt(0) || "E")}${escape(initials.length > 1 ? initials.charAt(1).toLowerCase() : "d")}.dev</span></div> <p class="text-xs text-gray-500 leading-relaxed" data-svelte-h="svelte-14uafaa">Portfolio professionnel - Électrotechnicien &amp; Développeur</p></div> <div><h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3" data-svelte-h="svelte-1mwzpgt">Navigation</h4> <div class="space-y-2">${each(links, (link) => {
    return `<a${add_attribute("href", link.href, 0)} class="block text-xs text-gray-500 hover:text-primary-600 transition-colors">${escape(link.label)}</a>`;
  })}</div></div> <div data-svelte-h="svelte-1e44f5e"><h4 class="text-xs font-bold uppercase tracking-wider text-gray-400 mb-3">Contact</h4> <p class="text-xs text-gray-500">Email pro disponible sur la page contact</p></div></div> <div class="border-t border-gray-200 dark:border-gray-800 pt-6 text-center"><p class="text-xs text-gray-400">© 2024-2026 ${escape(initials.charAt(0) || "P")}${escape(initials.length > 1 ? initials.charAt(1).toLowerCase() : "ortfolio")}. Tous droits réservés.</p></div></div></footer> </div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-DkKZH5r1.js.map
