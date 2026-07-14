import { c as create_ssr_component, d as add_attribute, e as escape, v as validate_component } from "../../../../chunks/ssr.js";
import "../../../../chunks/supabase.js";
import { S as Save } from "../../../../chunks/save.js";
const Page = create_ssr_component(($$result, $$props, $$bindings, slots) => {
  const defaults = {
    first_name: "Ouniboryabi",
    last_name: "YAKOUN",
    title: "Électrotechnicien",
    summary: "Passionné par les technologies électriques, les réseaux télécom et le développement web, je possède une expertise en installation et maintenance des systèmes électriques, configuration des infrastructures réseau et création d'applications web. Rigoureux et polyvalent, je mets mes compétences au service de solutions innovantes et performantes, tout en respectant les normes de sécurité et de qualité.",
    address: "Tsévié, Togo",
    phone: "+22897533307",
    email: "yakounouniboryabi@gmail.com",
    birth_date: "1999-05-04",
    github: "",
    linkedin: "",
    website: ""
  };
  let form = { ...defaults };
  return `<h1 class="text-2xl font-bold mb-6" data-svelte-h="svelte-1x25n70">Profil</h1> ${``} <form class="card max-w-2xl space-y-4"><div class="grid sm:grid-cols-2 gap-4"><div><label class="label">Prénom <input type="text" class="input"${add_attribute("value", form.first_name, 0)}></label></div> <div><label class="label">Nom <input type="text" class="input"${add_attribute("value", form.last_name, 0)}></label></div></div> <div><label class="label">Titre / Métier <input type="text" class="input"${add_attribute("value", form.title, 0)}></label></div> <div><label class="label">Résumé <textarea${add_attribute("rows", 3, 0)} class="input resize-none">${escape(form.summary || "")}</textarea></label></div> <div class="grid sm:grid-cols-2 gap-4"><div><label class="label">Adresse <input type="text" class="input"${add_attribute("value", form.address, 0)}></label></div> <div><label class="label">Téléphone <input type="text" class="input"${add_attribute("value", form.phone, 0)}></label></div></div> <div class="grid sm:grid-cols-2 gap-4"><div><label class="label">Email <input type="email" class="input"${add_attribute("value", form.email, 0)}></label></div> <div><label class="label">Date de naissance <input type="date" class="input"${add_attribute("value", form.birth_date, 0)}></label></div></div> <div class="grid sm:grid-cols-3 gap-4"><div><label class="label">GitHub <input type="text" class="input" placeholder="username"${add_attribute("value", form.github, 0)}></label></div> <div><label class="label">LinkedIn <input type="text" class="input" placeholder="username"${add_attribute("value", form.linkedin, 0)}></label></div> <div><label class="label">Site web <input type="text" class="input" placeholder="https://"${add_attribute("value", form.website, 0)}></label></div></div> <button type="submit" ${""} class="btn-primary">${validate_component(Save, "Save").$$render($$result, { size: 16 }, {}, {})} ${escape("Enregistrer")}</button></form>`;
});
export {
  Page as default
};
