<script lang="ts">
  import { supabase, isConfigured } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Plus, Pencil, Trash2, Save, X } from 'lucide-svelte'

  let items: any[] = []; let editing: any = null; let creating = false
  let form = { name: '', icon: '' }

  const seedData = [
    { name: 'Football', icon: 'heart' },
    { name: 'Lecture', icon: 'book-open' },
    { name: 'Adaptation', icon: 'zap' },
    { name: 'Rigueur', icon: 'check-circle' },
    { name: 'Travail en équipe', icon: 'users' }
  ]

  onMount(async () => { await load() })

  async function load() {
    if (!isConfigured) return
    const { data } = await supabase.from('hobbies').select('*').order('order')
    items = data ?? []
    if (items.length === 0 && isConfigured) {
      for (let i = 0; i < seedData.length; i++) {
        await supabase.from('hobbies').insert({ ...seedData[i], order: i })
      }
      const { data: seeded } = await supabase.from('hobbies').select('*').order('order')
      items = seeded ?? []
    }
  }
  function newForm() { creating = true; editing = null; form = { name: '', icon: '' } }
  function editItem(item: any) { creating = false; editing = item.id; form = { name: item.name, icon: item.icon || '' } }
  function cancel() { creating = false; editing = null }
  async function save() {
    if (!isConfigured) return
    if (creating) await supabase.from('hobbies').insert({ ...form, order: items.length })
    else await supabase.from('hobbies').update(form).eq('id', editing)
    cancel(); await load()
  }
  async function del(id: string) { if (!confirm('Supprimer ?')) return; await supabase.from('hobbies').delete().eq('id', id); await load() }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Loisirs & Qualités</h1>
  {#if !creating}<button on:click={newForm} class="btn-primary text-sm"><Plus size={16} /> Ajouter</button>{/if}
</div>

{#if creating || editing}
  <form on:submit|preventDefault={save} class="card mb-6 max-w-md space-y-3">
    <div><label class="label">Loisir ou qualité <input type="text" bind:value={form.name} required class="input" placeholder="Ex: Randonnée, Photographie" /></label></div>
    <div><label class="label">Icône (optionnel) <input type="text" bind:value={form.icon} class="input" placeholder="heart, code, camera..." /></label></div>
    <div class="flex gap-2">
      <button type="submit" class="btn-primary text-sm"><Save size={14} /> Enregistrer</button>
      <button type="button" on:click={cancel} class="btn-secondary text-sm"><X size={14} /> Annuler</button>
    </div>
  </form>
{/if}

<div class="flex flex-wrap gap-2">
  {#each items as item}
    <div class="card flex items-center gap-2 p-3">
      <span class="font-medium text-sm">{item.name}</span>
      <button on:click={() => editItem(item)} class="p-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><Pencil size={12} /></button>
      <button on:click={() => del(item.id)} class="p-1 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"><Trash2 size={12} /></button>
    </div>
  {/each}
</div>
