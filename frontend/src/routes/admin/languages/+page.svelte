<script lang="ts">
  import { supabase, isConfigured } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Plus, Pencil, Trash2, Save, X } from 'lucide-svelte'

  let items: any[] = []; let editing: any = null; let creating = false
  let form = { name: '', level: 3 }

  const seedData = [
    { name: 'Français', level: 4 },
    { name: 'Anglais', level: 2 }
  ]

  onMount(async () => { await load() })

  async function load() {
    if (!isConfigured) return
    const { data } = await supabase.from('languages').select('*').order('order')
    items = data ?? []
    if (items.length === 0 && isConfigured) {
      for (let i = 0; i < seedData.length; i++) {
        await supabase.from('languages').insert({ ...seedData[i], order: i })
      }
      const { data: seeded } = await supabase.from('languages').select('*').order('order')
      items = seeded ?? []
    }
  }
  function newForm() { creating = true; editing = null; form = { name: '', level: 3 } }
  function editItem(item: any) { creating = false; editing = item.id; form = { name: item.name, level: item.level } }
  function cancel() { creating = false; editing = null }
  async function save() {
    if (!isConfigured) return
    if (creating) await supabase.from('languages').insert({ ...form, order: items.length })
    else await supabase.from('languages').update(form).eq('id', editing)
    cancel(); await load()
  }
  async function del(id: string) { if (!confirm('Supprimer ?')) return; await supabase.from('languages').delete().eq('id', id); await load() }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Langues</h1>
  {#if !creating}<button on:click={newForm} class="btn-primary text-sm"><Plus size={16} /> Ajouter</button>{/if}
</div>

{#if creating || editing}
  <form on:submit|preventDefault={save} class="card mb-6 max-w-md space-y-3">
    <div><label class="label">Langue <input type="text" bind:value={form.name} required class="input" /></label></div>
    <div><label class="label">Niveau (1-5) <input type="range" min="1" max="5" bind:value={form.level} class="w-full" /></label><span class="text-xs text-gray-400">{['Débutant','Intermédiaire','Avancé','Courant','Natif'][form.level - 1]}</span></div>
    <div class="flex gap-2">
      <button type="submit" class="btn-primary text-sm"><Save size={14} /> Enregistrer</button>
      <button type="button" on:click={cancel} class="btn-secondary text-sm"><X size={14} /> Annuler</button>
    </div>
  </form>
{/if}

<div class="space-y-2">
  {#each items as item}
    <div class="card flex items-center justify-between p-3">
      <div class="flex items-center gap-3">
        <span class="font-medium text-sm">{item.name}</span>
        <span class="text-xs text-gray-400">{['Débutant','Intermédiaire','Avancé','Courant','Natif'][item.level - 1]}</span>
      </div>
      <div class="flex gap-1">
        <button on:click={() => editItem(item)} class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><Pencil size={14} /></button>
        <button on:click={() => del(item.id)} class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"><Trash2 size={14} /></button>
      </div>
    </div>
  {/each}
</div>
