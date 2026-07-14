import { c as create_ssr_component, v as validate_component, d as add_attribute } from "../../../../chunks/ssr.js";
import "../../../../chunks/supabase.js";
import "../../../../chunks/client.js";
import { Z as Zap } from "../../../../chunks/zap.js";
import { E as Eye } from "../../../../chunks/eye.js";
import { I as Icon } from "../../../../chunks/Icon.js";
const Log_in = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M15 3h4a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-4"
      }
    ],
    ["polyline", { "points": "10 17 15 12 10 7" }],
    [
      "line",
      {
        "x1": "15",
        "x2": "3",
        "y1": "12",
        "y2": "12"
      }
    ]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "log-in" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let email = "";
  let password = "";
  return `<div class="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary-900 via-gray-950 to-purple-900 p-4"><div class="w-full max-w-sm animate-scale-in"><div class="text-center mb-8"><div class="w-16 h-16 rounded-2xl bg-primary-600 flex items-center justify-center mx-auto mb-4">${validate_component(Zap, "Zap").$$render($$result, { size: 32, class: "text-white" }, {}, {})}</div> <h1 class="text-2xl font-bold text-white mb-2" data-svelte-h="svelte-bspcio">Espace Administrateur</h1> <p class="text-sm text-gray-400" data-svelte-h="svelte-4qw4n5">Connectez-vous pour gérer votre portfolio</p></div> <div class="card"><form class="space-y-4"><div><label class="label" for="email" data-svelte-h="svelte-10y9g0t">Email</label> <input id="email" type="email" required class="input" autocomplete="email" placeholder="admin@electrodev.fr"${add_attribute("value", email, 0)}></div> <div><label class="label" for="password" data-svelte-h="svelte-7bxne3">Mot de passe</label> <div class="relative"><input id="password"${add_attribute("type", "password", 0)}${add_attribute("value", password, 0)} required class="input pr-10" autocomplete="current-password"> <button type="button" class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">${`${validate_component(Eye, "Eye").$$render($$result, { size: 18 }, {}, {})}`}</button></div></div> ${``} <button type="submit" ${""} class="btn-primary w-full justify-center">${``} ${validate_component(Log_in, "LogIn").$$render($$result, { size: 18 }, {}, {})} Se connecter</button></form> <div class="mt-6 pt-4 border-t border-gray-200 dark:border-gray-700 text-center" data-svelte-h="svelte-1k82s1"><a href="/" class="text-sm text-primary-600 hover:underline">← Retour au site</a></div></div></div></div>`;
});
export {
  Page as default
};
