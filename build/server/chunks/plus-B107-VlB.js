import { c as create_ssr_component, v as validate_component } from './ssr-huwnW4RW.js';
import { I as Icon } from './Icon-CGrK4NTA.js';

const Plus = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [["path", { "d": "M5 12h14" }], ["path", { "d": "M12 5v14" }]];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "plus" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});

export { Plus as P };
//# sourceMappingURL=plus-B107-VlB.js.map
