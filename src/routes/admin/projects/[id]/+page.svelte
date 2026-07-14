<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { CATEGORIES } from '$lib/types'
  import { goto } from '$app/navigation'
  import { page } from '$app/stores'
  import { onMount } from 'svelte'
  import { ArrowLeft, Save, Trash2, Sparkles, Eye, Plus, X } from 'lucide-svelte'
  import ImageUpload from '$lib/components/ImageUpload.svelte'

  let form = { title: '', slug: '', description: '', category: 'electricite', technologies: '', date: '', featured: false, github_repo: '', live_url: '' }
  let images: string[] = []
  let loading = true; let saving = false; let error = ''
  let id = ''
  let techInput = ''

  onMount(async () => {
    id = $page.params.id
    try {
      const { data, error: e } = await supabase.from('projects').select('*').eq('id', id).single()
      if (e) throw e
      if (data) {
        form = {
          title: data.title, slug: data.slug, description: data.description || '',
          category: data.category, technologies: data.technologies || '',
          date: data.date?.slice(0, 10) || '', featured: data.featured,
          github_repo: data.github_repo || '', live_url: data.live_url || '',
        }
        if (data.images?.length) images = data.images
      }
    } catch (e) { error = 'Projet introuvable' }
    finally { loading = false }
  })

  function autoSlug() {
    if (!form.slug) form.slug = form.title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  }

  function addTech() {
    const t = techInput.trim()
    if (!t) return
    const techs = form.technologies ? form.technologies.split(',').map(x => x.trim()) : []
    if (!techs.includes(t)) { techs.push(t); form.technologies = techs.join(', ') }
    techInput = ''
  }

  function removeTech(t: string) {
    const techs = form.technologies.split(',').map(x => x.trim()).filter(x => x !== t)
    form.technologies = techs.join(', ')
  }

  async function handleSubmit() {
    saving = true; error = ''
    try {
      const { error: e } = await supabase.from('projects').update({ ...form, images }).eq('id', id)
      if (e) throw e
      goto('/admin/projects')
    } catch (err: any) { error = err?.message || 'Erreur' }
    finally { saving = false }
  }

  async function handleDelete() {
    if (!confirm('Supprimer définitivement ?')) return
    try { await supabase.from('projects').delete().eq('id', id); goto('/admin/projects') }
    catch (e: any) { alert(e?.message) }
  }
</script>

<div class="max-w-4xl mx-auto space-y-6">
  <!-- Header -->
  <div class="flex items-center justify-between">
    <a href="/admin/projects" class="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-primary-600 transition-colors">
      <ArrowLeft size={16} /> Retour aux projets
    </a>
    <div class="flex items-center gap-2">
      <a href="/projets/{form.slug}" target="_blank" class="btn-ghost border border-gray-300 dark:border-gray-600 text-sm gap-2">
        <Eye size={16} /> Aperçu
      </a>
      <button on:click={handleDelete} class="btn-danger text-sm gap-2"><Trash2 size={16} /> Supprimer</button>
    </div>
  </div>

  {#if loading}
    <div class="flex justify-center py-20"><div class="animate-spin rounded-full h-10 w-10 border-4 border-primary-500 border-t-transparent" /></div>
  {:else}
    <form on:submit|preventDefault={handleSubmit} class="space-y-6">
      <!-- Title & Featured -->
      <div class="card p-6 space-y-4">
        <div class="flex items-start justify-between gap-4">
          <div class="flex-1">
            <label class="label">Titre du projet <input type="text" bind:value={form.title} required class="input text-lg font-semibold" placeholder="Ex: Installation électrique résidentielle" on:input={autoSlug} /></label>
          </div>
          <label class="flex items-center gap-2 cursor-pointer mt-6">
            <input type="checkbox" bind:checked={form.featured} class="w-4 h-4 rounded border-gray-300 text-primary-600 focus:ring-primary-500" />
            <span class="text-sm font-medium flex items-center gap-1">{#if form.featured}<Sparkles size={14} class="text-yellow-500" />{/if} À la une</span>
          </label>
        </div>
        <div class="grid md:grid-cols-3 gap-4">
          <div>
            <label class="label">Slug <input type="text" bind:value={form.slug} class="input text-sm font-mono" placeholder="generation-auto" /></label>
          </div>
          <div>
            <label class="label">Catégorie <select bind:value={form.category} class="input">
              {#each CATEGORIES as cat}<option value={cat.value}>{cat.label}</option>{/each}
            </select></label>
          </div>
          <div>
            <label class="label">Date <input type="date" bind:value={form.date} required class="input" /></label>
          </div>
        </div>
      </div>

      <!-- Description -->
      <div class="card p-6 space-y-3">
        <label class="label">Description <textarea bind:value={form.description} rows={10} class="input resize-none leading-relaxed" placeholder="Décris le projet en détail..." /></label>
        <p class="text-xs text-gray-400">Markdown non supporté pour l'instant, mais le texte brut est préservé avec les sauts de ligne.</p>
      </div>

      <!-- Images -->
      <div class="card p-6">
        <ImageUpload bind:images projectId={id} />
      </div>

      <!-- Technologies -->
      <div class="card p-6 space-y-3">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="label">Technologies</label>
        <div class="flex flex-wrap gap-1.5 mb-3">
          {#each (form.technologies ? form.technologies.split(',').map(t => t.trim()).filter(Boolean) : []) as tech}
            <span class="inline-flex items-center gap-1 px-2.5 py-1 rounded-lg bg-primary-50 dark:bg-primary-900/30 border border-primary-200 dark:border-primary-800 text-sm text-primary-700 dark:text-primary-300">
              {tech}
              <button type="button" on:click={() => removeTech(tech)} class="hover:text-red-500 transition-colors"><X size={14} /></button>
            </span>
          {/each}
        </div>
        <div class="flex gap-2">
          <input type="text" bind:value={techInput} on:keydown={(e) => e.key === 'Enter' && (e.preventDefault(), addTech())} class="input flex-1 text-sm" placeholder="Ajouter une technologie..." />
          <button type="button" on:click={addTech} class="btn-ghost border border-gray-300 dark:border-gray-600"><Plus size={16} /></button>
        </div>
      </div>

      <!-- Links -->
      <div class="card p-6 space-y-4">
        <h3 class="font-semibold text-sm uppercase tracking-wider text-gray-500">Liens</h3>
        <div class="grid md:grid-cols-2 gap-4">
          <div>
            <label class="label">GitHub (user/repo) <input type="text" bind:value={form.github_repo} class="input text-sm" placeholder="electrodev/mon-projet" /></label>
          </div>
          <div>
            <label class="label">URL live <input type="url" bind:value={form.live_url} class="input text-sm" placeholder="https://..." /></label>
          </div>
        </div>
      </div>

      <!-- Error -->
      {#if error}
        <div class="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-xl p-4 text-sm text-red-700 dark:text-red-400">{error}</div>
      {/if}

      <!-- Submit -->
      <div class="flex gap-3 pt-2">
        <button type="submit" disabled={saving} class="btn-primary gap-2 px-8">
          {#if saving}<div class="animate-spin rounded-full h-4 w-4 border-2 border-white border-t-transparent" /> Sauvegarde...{:else}<Save size={18} /> Enregistrer les modifications{/if}
        </button>
        <a href="/admin/projects" class="btn-secondary">Annuler</a>
      </div>
    </form>
  {/if}
</div>
