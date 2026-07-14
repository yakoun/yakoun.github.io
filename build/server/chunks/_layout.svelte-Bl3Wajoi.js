import { c as create_ssr_component, b as subscribe, v as validate_component, e as escape, d as add_attribute } from './ssr-huwnW4RW.js';
import { t as theme } from './theme-B2QhgEeN.js';
import './index2-C8PNV9uQ.js';

const SEO = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let { title = "ElectroDev Pro - Électrotechnicien & Développeur" } = $$props;
  let { description = "Installation électrique, réseaux WiFi, paraboles satellites et développement web. Solutions professionnelles pour particuliers et entreprises." } = $$props;
  let { image = "" } = $$props;
  let { url = "" } = $$props;
  if ($$props.title === void 0 && $$bindings.title && title !== void 0) $$bindings.title(title);
  if ($$props.description === void 0 && $$bindings.description && description !== void 0) $$bindings.description(description);
  if ($$props.image === void 0 && $$bindings.image && image !== void 0) $$bindings.image(image);
  if ($$props.url === void 0 && $$bindings.url && url !== void 0) $$bindings.url(url);
  return `${$$result.head += `<!-- HEAD_svelte-po744w_START -->${$$result.title = `<title>${escape(title)}</title>`, ""}<meta name="description"${add_attribute("content", description, 0)}><meta name="keywords" content="électricien, installation électrique, wifi, parabole, réseau, développement web, Svelte, électrotechnicien"><meta name="author" content="ElectroDev Pro"><meta name="robots" content="index, follow"><meta name="viewport" content="width=device-width, initial-scale=1"><meta property="og:type" content="website"><meta property="og:url"${add_attribute("content", url, 0)}><meta property="og:title"${add_attribute("content", title, 0)}><meta property="og:description"${add_attribute("content", description, 0)}>${image ? `<meta property="og:image"${add_attribute("content", image, 0)}>` : ``}<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title"${add_attribute("content", title, 0)}><meta name="twitter:description"${add_attribute("content", description, 0)}>${image ? `<meta name="twitter:image"${add_attribute("content", image, 0)}>` : ``}<link rel="canonical"${add_attribute("href", url || "https://electrodev.fr", 0)}><script type="application/ld+json" data-svelte-h="svelte-1ypa6wa">{JSON.stringify({
      "@context": "https://schema.org",
      "@type": "Person",
      "name": "ElectroDev Pro",
      "jobTitle": "Électrotechnicien & Développeur",
      "description": description,
      "url": "https://electrodev.fr",
      "telephone": "+33600000000",
      "email": "contact@electrodev.fr",
      "knowsAbout": ["Électricité", "Réseaux", "WiFi", "Paraboles", "Développement web"],
    })}
  <\/script><link rel="icon" href="/favicon.svg" type="image/svg+xml"><!-- HEAD_svelte-po744w_END -->`, ""}`;
});
const Layout = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $theme, $$unsubscribe_theme;
  $$unsubscribe_theme = subscribe(theme, (value) => $theme = value);
  $$unsubscribe_theme();
  return `${validate_component(SEO, "SEO").$$render($$result, {}, {}, {})} <div class="${["min-h-screen transition-colors duration-300", $theme === "dark" ? "dark" : ""].join(" ").trim()}">${slots.default ? slots.default({}) : ``}</div>`;
});

export { Layout as default };
//# sourceMappingURL=_layout.svelte-Bl3Wajoi.js.map
