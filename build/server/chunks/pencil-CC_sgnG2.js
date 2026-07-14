import { c as create_ssr_component, v as validate_component } from './ssr-huwnW4RW.js';
import { I as Icon } from './Icon-CGrK4NTA.js';

const Pencil = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z"
      }
    ],
    ["path", { "d": "m15 5 4 4" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "pencil" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});

export { Pencil as P };
//# sourceMappingURL=pencil-CC_sgnG2.js.map
