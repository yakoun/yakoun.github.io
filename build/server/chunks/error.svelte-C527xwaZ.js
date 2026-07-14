import { c as create_ssr_component, b as subscribe, e as escape } from './ssr-huwnW4RW.js';
import { p as page } from './stores-BMS9OD8r.js';
import './client-BUusD8wq.js';
import './exports-BGi7-Rnc.js';

const Error = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  let $page, $$unsubscribe_page;
  $$unsubscribe_page = subscribe(page, (value) => $page = value);
  $$unsubscribe_page();
  return `<h1>${escape($page.status)}</h1> <p>${escape($page.error?.message)}</p>`;
});

export { Error as default };
//# sourceMappingURL=error.svelte-C527xwaZ.js.map
