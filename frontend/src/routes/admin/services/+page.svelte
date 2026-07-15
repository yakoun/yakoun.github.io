<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Pencil, Trash2, Plus, Save } from 'lucide-svelte'

  let services: any[] = []
  let loading = true
  let showForm = false
  let editing: any = null
  let form = { title: '', description: '', icon: 'zap' }

  onMount(() => load())
  async function load() {
    const { data } = await supabase.from('services').select('*').order('order')
    services = data || []; loading = false
  }

  async function save() {
    try {
      if (editing) await supabase.from('services').update(form).eq('id', editing.id)
      else await supabase.from('services').insert(form)
      reset(); load()
    } catch (e: any) { alert(e?.message) }
  }

  function edit(s: any) { editing = s; form = { title: s.title, description: s.description, icon: s.icon || 'zap' }; showForm = true }
  async function remove(id: string) { if (!confirm('Supprimer ?')) return; await supabase.from('services').delete().eq('id', id); load() }
  function reset() { showForm = false; editing = null; form = { title: '', description: '', icon: 'zap' } }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Services</h1>
  <button on:click={() => { reset(); showForm = true }} class="btn-primary"><Plus size={18} /> Ajouter</button>
</div>

{#if showForm}
  <div class="card mb-6 space-y-3">
    <h2 class="font-semibold">{editing ? 'Modifier' : 'Nouveau'} service</h2>
    <div><label class="label">Titre <input type="text" bind:value={form.title} required class="input" /></label></div>
    <div><label class="label">Description <textarea bind:value={form.description} rows={4} class="input resize-none"></textarea></label></div>
    <div class="flex gap-2">
      <button on:click={save} class="btn-primary"><Save size={16} /> Enregistrer</button>
      <button on:click={reset} class="btn-secondary">Annuler</button>
    </div>
  </div>
{/if}

<div class="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each services as service}
    <div class="card">
      <h3 class="font-semibold mb-2">{service.title}</h3>
      <p class="text-sm text-gray-500 dark:text-gray-400 mb-4">{service.description}</p>
      <div class="flex gap-1">
        <button on:click={() => edit(service)} class="p-1.5 rounded hover:bg-gray-100 dark:hover:bg-gray-800"><Pencil size={14} /></button>
        <button on:click={() => remove(service.id)} class="p-1.5 rounded hover:bg-red-100 dark:hover:bg-red-900/30"><Trash2 size={14} class="text-red-500" /></button>
      </div>
    </div>
  {/each}
</div>