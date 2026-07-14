<script lang="ts">
  import { supabase, isConfigured } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Plus, Pencil, Trash2, Save, X } from 'lucide-svelte'

  let items: any[] = []; let editing: any = null; let creating = false
  let form = { name: '', category: 'Logiciel', level: 3 }

  const seedData = [
    { name: 'Proteus', category: 'Logiciel', level: 3 },
    { name: 'Arduino', category: 'Logiciel', level: 3 },
    { name: 'PVsyst', category: 'Logiciel', level: 3 },
    { name: 'SEE Electrical', category: 'Logiciel', level: 3 },
    { name: 'Python', category: 'Langage programmation', level: 3 },
    { name: 'HTML', category: 'Langage programmation', level: 3 },
    { name: 'CSS', category: 'Langage programmation', level: 3 },
    { name: 'JavaScript', category: 'Langage programmation', level: 2 },
    { name: 'Bootstrap', category: 'Framework', level: 2 },
    { name: 'Word', category: 'Logiciel', level: 4 },
    { name: 'Excel', category: 'Logiciel', level: 4 },
    { name: 'PowerPoint', category: 'Logiciel', level: 4 },
    { name: 'Access', category: 'Logiciel', level: 3 }
  ]

  onMount(async () => { await load() })

  async function load() {
    if (!isConfigured) return
    const { data } = await supabase.from('software_tools').select('*').order('order')
    items = data ?? []
    if (items.length === 0 && isConfigured) {
      for (let i = 0; i < seedData.length; i++) {
        await supabase.from('software_tools').insert({ ...seedData[i], order: i })
      }
      const { data: seeded } = await supabase.from('software_tools').select('*').order('order')
      items = seeded ?? []
    }
  }
  function newForm() { creating = true; editing = null; form = { name: '', category: 'Logiciel', level: 3 } }
  function editItem(item: any) { creating = false; editing = item.id; form = { name: item.name, category: item.category, level: item.level } }
  function cancel() { creating = false; editing = null }
  async function save() {
    if (!isConfigured) return
    if (creating) await supabase.from('software_tools').insert({ ...form, order: items.length })
    else await supabase.from('software_tools').update(form).eq('id', editing)
    cancel(); await load()
  }
  async function del(id: string) { if (!confirm('Supprimer ?')) return; await supabase.from('software_tools').delete().eq('id', id); await load() }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Logiciels & Langages</h1>
  {#if !creating}<button on:click={newForm} class="btn-primary text-sm"><Plus size={16} /> Ajouter</button>{/if}
</div>

{#if creating || editing}
  <form on:submit|preventDefault={save} class="card mb-6 max-w-md space-y-3">
    <div><label class="label">Nom <input type="text" bind:value={form.name} required class="input" placeholder="Ex: VS Code, Python, React" /></label></div>
    <div><label class="label">Catégorie
      <select bind:value={form.category} class="input">
        <option value="Logiciel">Logiciel</option>
        <option value="Langage programmation">Langage programmation</option>
        <option value="Framework">Framework</option>
        <option value="Outil">Outil</option>
        <option value="Autre">Autre</option>
      </select>
    </label></div>
    <div><label class="label">Niveau (1-5) <input type="range" min="1" max="5" bind:value={form.level} class="w-full" /></label><span class="text-xs text-gray-400">{form.level}/5</span></div>
    <div class="flex gap-2">
      <button type="submit" class="btn-primary text-sm"><Save size={14} /> Enregistrer</button>
      <button type="button" on:click={cancel} class="btn-secondary text-sm"><X size={14} /> Annuler</button>
    </div>
  </form>
{/if}

{#each ['Logiciel','Langage programmation','Framework','Outil','Autre'] as cat}
  {#each items.filter(i => i.category === cat) as item}
    <div class="card flex items-center justify-between p-3 mb-2">
      <div class="flex items-center gap-3">
        <span class="text-xs text-gray-400 uppercase tracking-wider w-28 shrink-0">{cat}</span>
        <span class="font-medium text-sm">{item.name}</span>
        <span class="text-xs text-gray-400">{item.level}/5</span>
      </div>
      <div class="flex gap-1">
        <button on:click={() => editItem(item)} class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><Pencil size={14} /></button>
        <button on:click={() => del(item.id)} class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"><Trash2 size={14} /></button>
      </div>
    </div>
  {/each}
{/each}
