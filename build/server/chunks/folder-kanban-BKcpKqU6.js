import { c as create_ssr_component, v as validate_component } from './ssr-huwnW4RW.js';
import { I as Icon } from './Icon-CGrK4NTA.js';

const Folder_kanban = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const iconNode = [
    [
      "path",
      {
        "d": "M4 20h16a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.93a2 2 0 0 1-1.66-.9l-.82-1.2A2 2 0 0 0 7.93 3H4a2 2 0 0 0-2 2v13c0 1.1.9 2 2 2Z"
      }
    ],
    ["path", { "d": "M8 10v4" }],
    ["path", { "d": "M12 10v2" }],
    ["path", { "d": "M16 10v6" }]
  ];
  return `${validate_component(Icon, "Icon").$$render($$result, Object.assign({}, { name: "folder-kanban" }, $$props, { iconNode }), {}, {
    default: () => {
      return `${slots.default ? slots.default({}) : ``}`;
    }
  })}`;
});

export { Folder_kanban as F };
//# sourceMappingURL=folder-kanban-BKcpKqU6.js.map
