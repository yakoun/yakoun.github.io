<script lang="ts">
  import { supabase, isConfigured } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Plus, Pencil, Trash2, Save, X } from 'lucide-svelte'

  let items: any[] = []; let loading = true; let editing: any = null; let creating = false
  let form = { institution: '', degree: '', field: '', start_date: '', end_date: '', description: '' }

  function toDb(d: string) { return d ? d + '-01' : null }
  function fromDb(d: string) { return d ? d.slice(0, 7) : '' }

  const seedData = [
    { institution: 'École Polytechnique de Lomé', degree: 'Licence Professionnelle en Génie Électrique', field: 'Génie Électrique', start_date: '2018-10', end_date: '', description: "Formation spécialisée en conception, installation, maintenance et gestion des systèmes électriques et informatique avec une maîtrise des normes de sécurité et des technologies innovantes." },
    { institution: 'CIFMAS', degree: 'Habilitation électrique et travaux en hauteur', field: 'Sécurité Électrique', start_date: '2021-07', end_date: '2021-08', description: "Formation attestant la capacité à intervenir en toute sécurité sur les installations électriques et à effectuer des opérations en hauteur." },
    { institution: 'LETP-SOKODÉ', degree: 'Baccalauréat Électronique', field: 'Électronique', start_date: '2015-09', end_date: '2018-08', description: "Formation appliquée en électrotechnique, technologie de l'électricité, dimensionnement électrique, installation électrique bâtiment et industriel." }
  ]

  onMount(async () => { await load(); loading = false })

  async function load() {
    if (!isConfigured) return
    const { data } = await supabase.from('education').select('*').order('order')
    items = data ?? []
    if (items.length === 0 && isConfigured) {
      for (let i = 0; i < seedData.length; i++) {
        const s = seedData[i]
        await supabase.from('education').insert({
          institution: s.institution, degree: s.degree, field: s.field,
          start_date: toDb(s.start_date), end_date: toDb(s.end_date),
          description: s.description, order: i
        })
      }
      const { data: seeded } = await supabase.from('education').select('*').order('order')
      items = seeded ?? []
    }
  }

  function newForm() { creating = true; editing = null; form = { institution: '', degree: '', field: '', start_date: '', end_date: '', description: '' } }
  function editItem(item: any) {
    creating = false; editing = item.id
    form = { institution: item.institution, degree: item.degree, field: item.field || '', start_date: fromDb(item.start_date), end_date: fromDb(item.end_date), description: item.description || '' }
  }
  function cancel() { creating = false; editing = null }

  async function save() {
    if (!isConfigured) return
    const data = {
      institution: form.institution, degree: form.degree, field: form.field,
      start_date: toDb(form.start_date), end_date: toDb(form.end_date),
      description: form.description, order: creating ? items.length : undefined
    }
    if (creating) await supabase.from('education').insert(data)
    else await supabase.from('education').update(data).eq('id', editing)
    cancel(); await load()
  }

  async function del(id: string) { if (!confirm('Supprimer ?')) return; await supabase.from('education').delete().eq('id', id); await load() }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Formations</h1>
  {#if !creating}
    <button on:click={newForm} class="btn-primary text-sm"><Plus size={16} /> Ajouter</button>
  {/if}
</div>

{#if loading}
  <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" /></div>
{:else}
  {#if creating || editing}
    <form on:submit|preventDefault={save} class="card mb-6 max-w-xl space-y-3">
      <div class="grid sm:grid-cols-2 gap-3">
        <div><label class="label">Établissement <input type="text" bind:value={form.institution} required class="input" /></label></div>
        <div><label class="label">Diplôme <input type="text" bind:value={form.degree} required class="input" /></label></div>
      </div>
      <div><label class="label">Domaine <input type="text" bind:value={form.field} class="input" /></label></div>
      <div class="grid sm:grid-cols-2 gap-3">
        <div><label class="label">Date début <input type="month" bind:value={form.start_date} required class="input" /></label></div>
        <div><label class="label">Date fin <input type="month" bind:value={form.end_date} class="input" /></label></div>
      </div>
      <div><label class="label">Description <textarea rows={3} bind:value={form.description} class="input resize-none"></textarea></label></div>
      <div class="flex gap-2">
        <button type="submit" class="btn-primary text-sm"><Save size={14} /> Enregistrer</button>
        <button type="button" on:click={cancel} class="btn-secondary text-sm"><X size={14} /> Annuler</button>
      </div>
    </form>
  {/if}

  <div class="space-y-2">
    {#each items as item}
      <div class="card flex items-start justify-between gap-4 p-4">
        <div class="flex-1">
          <h3 class="font-semibold text-sm">{item.degree}</h3>
          <p class="text-xs text-primary-600">{item.institution}{#if item.field} · {item.field}{/if}</p>
          <p class="text-xs text-gray-400">{fromDb(item.start_date)} — {item.end_date ? fromDb(item.end_date) : 'Présent'}</p>
        </div>
        <div class="flex gap-1 shrink-0">
          <button on:click={() => editItem(item)} class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><Pencil size={14} /></button>
          <button on:click={() => del(item.id)} class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"><Trash2 size={14} /></button>
        </div>
      </div>
    {/each}
  </div>
{/if}
