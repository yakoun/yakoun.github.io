<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { onMount } from 'svelte'
  import { Pencil, Trash2, Plus, Star, Save, Upload } from 'lucide-svelte'
  import ImageUpload from '$lib/components/ImageUpload.svelte'

  let items: any[] = []
  let loading = true
  let showForm = false
  let editing: any = null
  let form = { title: '', description: '', image_url: '', category: '', featured: false }
  let uploadImages: string[] = []

  onMount(() => load())
  async function load() {
    const { data } = await supabase.from('gallery').select('*').order('order')
    items = data || []; loading = false
  }

  async function save() {
    try {
      const payload = { ...form, image_url: uploadImages[0] || form.image_url }
      if (editing) await supabase.from('gallery').update(payload).eq('id', editing.id)
      else await supabase.from('gallery').insert(payload)
      reset(); load()
    } catch (e: any) { alert(e?.message) }
  }

  function edit(it: any) {
    editing = it; uploadImages = it.image_url ? [it.image_url] : []
    form = { title: it.title || '', description: it.description || '', image_url: it.image_url, category: it.category || '', featured: it.featured }
    showForm = true
  }
  async function remove(id: string) { if (!confirm('Supprimer ?')) return; await supabase.from('gallery').delete().eq('id', id); load() }
  async function toggleFeatured(id: string, current: boolean) { await supabase.from('gallery').update({ featured: !current }).eq('id', id); load() }
  function reset() {
    showForm = false; editing = null; uploadImages = []
    form = { title: '', description: '', image_url: '', category: '', featured: false }
  }
</script>

<div class="flex items-center justify-between mb-6">
  <h1 class="text-2xl font-bold">Galerie</h1>
  <button on:click={() => { reset(); showForm = true }} class="btn-primary"><Plus size={18} /> Ajouter</button>
</div>

{#if showForm}
  <div class="card mb-6 space-y-3">
    <h2 class="font-semibold">{editing ? 'Modifier' : 'Nouvelle'} image</h2>
    <div><label class="label">Titre <input type="text" bind:value={form.title} class="input" /></label></div>
    <div><label class="label">Description <input type="text" bind:value={form.description} class="input" /></label></div>
    <ImageUpload bind:images={uploadImages} projectId="gallery" />
    {#if form.image_url && uploadImages.length === 0}
      <div class="text-xs text-gray-400">Image actuelle : {form.image_url}</div>
    {/if}
    <div><label class="label">Catégorie <input type="text" bind:value={form.category} class="input" /></label></div>
    <div class="flex gap-2">
      <button on:click={save} class="btn-primary"><Save size={16} /> Enregistrer</button>
      <button on:click={reset} class="btn-secondary">Annuler</button>
    </div>
  </div>
{/if}

<div class="grid md:grid-cols-3 gap-4">
  {#each items as item}
    <div class="card p-3">
      <img src={item.image_url} alt={item.title} class="w-full h-40 object-cover rounded-xl mb-3" loading="lazy" />
      <h3 class="font-semibold text-sm">{item.title}</h3>
      <p class="text-xs text-gray-500 mt-1">{item.category}</p>
      <div class="flex items-center gap-1 mt-2">
        <button on:click={() => toggleFeatured(item.id, item.featured)} class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded">
          <Star size={14} class={item.featured ? 'fill-yellow-500 text-yellow-500' : 'text-gray-300'} />
        </button>
        <button on:click={() => edit(item)} class="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"><Pencil size={14} /></button>
        <button on:click={() => remove(item.id)} class="p-1 hover:bg-red-100 dark:hover:bg-red-900/30 rounded"><Trash2 size={14} class="text-red-500" /></button>
      </div>
    </div>
  {/each}
</div>