<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Pencil, Trash2, Plus, Save } from 'lucide-svelte'

  let skills: any[] = []
  let loading = true
  let showForm = false
  let editing: any = null
  let form = { name: '', level: 3, category: 'electricite', icon: '', description: '' }
  const categories = ['electricite', 'reseaux', 'wifi', 'paraboles', 'programmation', 'dev-web', 'dev-apps', 'automatisation']

  const seedData = [
    { name: 'Dimensionnement électrique', level: 4, category: 'electricite', description: 'Conception et calcul de systèmes électriques' },
    { name: 'Dimensionnement solaire', level: 3, category: 'electricite', description: 'Dimensionnement de systèmes solaires' },
    { name: 'Modélisation de schémas électriques', level: 4, category: 'electricite', description: 'Création et analyse de schémas électriques' },
    { name: 'Simulation électrique', level: 3, category: 'electricite', description: 'Simulation de circuits électriques' },
    { name: 'Python', level: 3, category: 'programmation', description: 'Développement avec Python' },
    { name: 'Développement d\'applications Desktop', level: 3, category: 'dev-apps', description: 'Création d\'applications de bureau' },
    { name: 'HTML', level: 3, category: 'dev-web', description: 'Structure de pages web' },
    { name: 'CSS', level: 3, category: 'dev-web', description: 'Stylisation de pages web' },
    { name: 'JavaScript', level: 2, category: 'dev-web', description: 'Programmation web interactive' },
    { name: 'Bootstrap', level: 2, category: 'dev-web', description: 'Framework CSS responsive' },
    { name: 'Proteus', level: 3, category: 'electricite', description: 'Simulation de circuits électroniques' },
    { name: 'Arduino', level: 3, category: 'automatisation', description: 'Programmation de microcontrôleurs' },
    { name: 'PVsyst', level: 3, category: 'electricite', description: 'Simulation de systèmes solaires' },
    { name: 'SEE Electrical', level: 3, category: 'electricite', description: 'Conception de schémas électriques' },
    { name: 'Word', level: 4, category: 'programmation', description: 'Traitement de texte' },
    { name: 'Excel', level: 4, category: 'programmation', description: 'Tableur et analyse de données' },
    { name: 'PowerPoint', level: 4, category: 'programmation', description: 'Présentations' },
    { name: 'Access', level: 3, category: 'programmation', description: 'Gestion de bases de données' }
  ]

  onMount(() => load())
  async function load() {
    const { data } = await supabase.from('skills').select('*').order('category').order('level', { ascending: false })
    skills = data || []
    if (skills.length === 0) {
      for (const s of seedData) {
        await supabase.from('skills').insert(s)
      }
      const { data: seeded } = await supabase.from('skills').select('*').order('category').order('level', { ascending: false })
      skills = seeded || []
    }
    loading = false
  }

  async function save() {
    try {
      if (editing) await supabase.from('skills').update(form).eq('id', editing.id)
      else await supabase.from('skills').insert(form)
      reset(); load()
    } catch (e: any) { alert(e?.message) }
  }

  function edit(s: any) { editing = s; form = { name: s.name, level: s.level, category: s.category, icon: s.icon || '', description: s.description || '' }; showForm = true }
  async function remove(id: string) { if (!confirm('Supprimer ?')) return; await supabase.from('skills').delete().eq('id', id); load() }
  function reset() { showForm = false; editing = null; form = { name: '', level: 3, category: 'electricite', icon: '', description: '' } }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Compétences</h1>
  <button on:click={() => { reset(); showForm = true }} class="btn-primary"><Plus size={18} /> Ajouter</button>
</div>

{#if showForm}
  <div class="card mb-6 space-y-4">
    <h2 class="font-semibold">{editing ? 'Modifier' : 'Nouvelle'} compétence</h2>
    <div class="grid md:grid-cols-2 gap-4">
      <div><label class="label">Nom <input type="text" bind:value={form.name} required class="input" /></label></div>
      <div>
        <label class="label">Niveau (1-5) <input type="range" min="1" max="5" bind:value={form.level} class="w-full accent-primary-600" /></label>
        <span class="text-sm text-gray-500">{form.level}/5</span>
      </div>
      <div><label class="label">Catégorie <select bind:value={form.category} class="input">{#each categories as c}<option value={c}>{c}</option>{/each}</select></label></div>
      <div><label class="label">Description <input type="text" bind:value={form.description} class="input" /></label></div>
    </div>
    <div class="flex gap-2">
      <button on:click={save} class="btn-primary"><Save size={16} /> Enregistrer</button>
      <button on:click={reset} class="btn-secondary">Annuler</button>
    </div>
  </div>
{/if}

<div class="grid md:grid-cols-2 gap-4">
  {#each skills as skill}
    <div class="card flex items-start gap-4">
      <div class="flex-1">
        <div class="flex items-center justify-between mb-1">
          <h3 class="font-semibold">{skill.name}</h3>
          <div class="flex gap-1">
            <button on:click={() => edit(skill)} class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><Pencil size={14} /></button>
            <button on:click={() => remove(skill.id)} class="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"><Trash2 size={14} class="text-red-500" /></button>
          </div>
        </div>
        <p class="text-xs text-gray-500 mb-2">{skill.category} — {skill.description || ''}</p>
        <div class="flex gap-1">
          {#each { length: 5 } as _, i}
            <div class="h-2 flex-1 rounded-full {i < skill.level ? 'bg-primary-500' : 'bg-gray-200 dark:bg-gray-700'}" />
          {/each}
        </div>
      </div>
    </div>
  {/each}
</div>
