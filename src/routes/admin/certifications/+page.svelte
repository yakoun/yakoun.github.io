<script lang="ts">
  import { supabase, isConfigured } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Plus, Pencil, Trash2, Save, X, Award, AlertTriangle } from 'lucide-svelte'

  let items: any[] = []
  let editing: any = null
  let creating = false
  let form = { title: '', organization: '', date: '', description: '' }
  let tableExists = true
  let loading = true

  const seedData = [
    { title: 'Habilitation électrique et travaux en hauteur', organization: 'CIFMAS', date: '2021-08', description: 'Formation attestant la capacité à intervenir en toute sécurité sur les installations électriques et à effectuer des opérations en hauteur.' }
  ]

  onMount(async () => { await load(); loading = false })

  async function load() {
    if (!isConfigured) return
    try {
      const { data } = await supabase.from('certifications' as any).select('*').order('created_at')
      items = data ?? []
      if (items.length === 0) {
        for (const s of seedData) {
          await supabase.from('certifications' as any).insert(s)
        }
        const { data: seeded } = await supabase.from('certifications' as any).select('*').order('created_at')
        items = seeded ?? []
      }
      tableExists = true
    } catch {
      tableExists = false
    }
  }

  function newForm() { creating = true; editing = null; form = { title: '', organization: '', date: '', description: '' } }
  function editItem(item: any) { creating = false; editing = item.id; form = { title: item.title, organization: item.organization, date: item.date, description: item.description || '' } }
  function cancel() { creating = false; editing = null }

  async function save() {
    if (!isConfigured) return
    try {
      if (creating) await supabase.from('certifications' as any).insert(form)
      else await supabase.from('certifications' as any).update(form).eq('id', editing)
      cancel(); await load()
    } catch (e: any) { alert(e?.message) }
  }

  async function del(id: string) { if (!confirm('Supprimer ?')) return; await supabase.from('certifications' as any).delete().eq('id', id); await load() }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Certifications</h1>
  {#if !creating && tableExists}
    <button on:click={newForm} class="btn-primary text-sm"><Plus size={16} /> Ajouter</button>
  {/if}
</div>

{#if !tableExists}
  <div class="flex items-start gap-3 p-4 rounded-xl bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 mb-6">
    <AlertTriangle size={20} class="text-amber-600 shrink-0 mt-0.5" />
    <div class="text-sm text-amber-700 dark:text-amber-400">
      <p class="font-medium mb-1">Table manquante dans Supabase</p>
      <p>Ajoute une table nommée <code class="bg-amber-100 dark:bg-amber-900/40 px-1 rounded">certifications</code> avec les colonnes : <code>id (uuid, PK, default gen_random_uuid())</code>, <code>title (text)</code>, <code>organization (text)</code>, <code>date (text)</code>, <code>description (text)</code>, <code>created_at (timestamptz, default now())</code>.</p>
      <p class="mt-2">Dans le Supabase dashboard : SQL Editor → exécute le SQL ci-dessus, puis recharge cette page.</p>
    </div>
  </div>
{:else if loading}
  <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" /></div>
{:else}
  {#if creating || editing}
    <form on:submit|preventDefault={save} class="card mb-6 max-w-xl space-y-3">
      <div class="grid sm:grid-cols-2 gap-3">
        <div><label class="label">Titre <input type="text" bind:value={form.title} required class="input" placeholder="Ex: Habilitation électrique" /></label></div>
        <div><label class="label">Organisme <input type="text" bind:value={form.organization} required class="input" placeholder="Ex: CIFMAS" /></label></div>
      </div>
      <div class="grid sm:grid-cols-1 gap-3">
        <div><label class="label">Date <input type="month" bind:value={form.date} class="input" /></label></div>
      </div>
      <div><label class="label">Description <textarea rows={2} bind:value={form.description} class="input resize-none"></textarea></label></div>
      <div class="flex gap-2">
        <button type="submit" class="btn-primary text-sm"><Save size={14} /> Enregistrer</button>
        <button type="button" on:click={cancel} class="btn-secondary text-sm"><X size={14} /> Annuler</button>
      </div>
    </form>
  {/if}

  {#if items.length === 0}
    <div class="text-center py-20 text-gray-400">
      <Award size={40} class="mx-auto mb-3 opacity-50" />
      <p class="text-sm">Aucune certification pour le moment</p>
    </div>
  {:else}
    <div class="space-y-2">
      {#each items as item}
        <div class="card flex items-start justify-between gap-4 p-4">
          <div class="flex-1">
            <div class="flex items-center gap-2">
              <Award size={16} class="text-amber-500 shrink-0" />
              <h3 class="font-semibold text-sm">{item.title}</h3>
            </div>
            <p class="text-xs text-primary-600 ml-6">{item.organization}{#if item.date} · {item.date}{/if}</p>
            {#if item.description}<p class="text-xs text-gray-500 ml-6 mt-1">{item.description}</p>{/if}
          </div>
          <div class="flex gap-1 shrink-0">
            <button on:click={() => editItem(item)} class="p-1.5 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-400"><Pencil size={14} /></button>
            <button on:click={() => del(item.id)} class="p-1.5 rounded-lg hover:bg-red-50 dark:hover:bg-red-900/20 text-red-400"><Trash2 size={14} /></button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
{/if}
