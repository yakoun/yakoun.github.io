import { s as supabase } from "../../../../chunks/supabase.js";
import { j as json } from "../../../../chunks/index.js";
async function POST({ request }) {
  const { username } = await request.json();
  if (!username) return json({ error: "Nom d'utilisateur GitHub requis" }, { status: 400 });
  try {
    const res = await fetch(`https://api.github.com/users/${username}/repos?per_page=100&sort=updated&type=public`);
    if (!res.ok) {
      const msg = res.status === 403 ? "Limite API GitHub atteinte. Réessaie dans quelques minutes." : `Erreur GitHub ${res.status}`;
      return json({ error: msg }, { status: 400 });
    }
    const repos = await res.json();
    let synced = 0;
    for (const repo of repos) {
      const slug = repo.name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
      const { data: existing } = await supabase.from("projects").select("id").eq("slug", slug).single();
      const project = {
        title: repo.name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase()),
        slug,
        description: repo.description || `Projet ${repo.name}`,
        category: "dev-web",
        technologies: repo.language || "",
        github_repo: repo.full_name,
        live_url: repo.homepage,
        date: repo.pushed_at?.split("T")[0] || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
        featured: false
      };
      if (existing) {
        await supabase.from("projects").update(project).eq("id", existing.id);
      } else {
        await supabase.from("projects").insert(project);
      }
      synced++;
    }
    return json({ success: true, count: synced });
  } catch (err) {
    return json({ error: err?.message || "Erreur de synchronisation" }, { status: 500 });
  }
}
export {
  POST
};
