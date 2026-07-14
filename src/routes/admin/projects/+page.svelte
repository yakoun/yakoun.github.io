<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { CATEGORIES, CATEGORY_LABELS } from '$lib/types'
  import { onMount } from 'svelte'
  import { goto } from '$app/navigation'
  import {
    Plus, Search, Star, Pencil, Trash2, Github, ExternalLink,
    FolderKanban, Sparkles, ArrowUpDown, Grid, List as ListIcon,
    Filter, X, GripVertical, ImageOff
  } from 'lucide-svelte'

  let projects: any[] = []
  let loading = true
  let search = ''
  let viewMode: 'grid' | 'list' = 'grid'
  let categoryFilter = ''
  let sortMode: 'date' | 'title' = 'date'

  // GitHub sync modal
  let showGithub = false; let syncing = false; let githubUser = ''

  // Delete confirmation
  let deleting: string | null = null

  onMount(async () => {
    const { data } = await supabase.from('projects').select('*').order('date', { ascending: false })
    projects = data || []
    loading = false
  })

  async function syncGithub() {
    if (!githubUser) return
    syncing = true
    try {
      const res = await fetch('/api/github-sync', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ username: githubUser }) })
      const data = await res.json()
      if (!res.ok) throw new Error(data.error)
      const { data: refreshed } = await supabase.from('projects').select('*').order('date', { ascending: false })
      projects = refreshed || []
      showGithub = false
    } catch (e: any) { alert(e.message) } finally { syncing = false }
  }

  async function toggleFeatured(id: string, current: boolean) {
    await supabase.from('projects').update({ featured: !current }).eq('id', id)
    projects = projects.map(p => p.id === id ? { ...p, featured: !current } : p)
  }

  async function confirmDelete() {
    if (!deleting) return
    try {
      await supabase.from('projects').delete().eq('id', deleting)
      projects = projects.filter(p => p.id !== deleting)
      deleting = null
    } catch (e: any) { alert(e?.message) }
  }

  $: categories = [...new Set(projects.map(p => p.category))].filter(Boolean)
  $: featuredCount = projects.filter(p => p.featured).length

  $: sorted = [...projects].sort((a, b) => {
    if (sortMode === 'title') return a.title.localeCompare(b.title)
    return new Date(b.date || 0).getTime() - new Date(a.date || 0).getTime()
  })

  $: filtered = sorted.filter(p => {
    if (search && !p.title.toLowerCase().includes(search.toLowerCase())) return false
    if (categoryFilter && p.category !== categoryFilter) return false
    return true
  })

  $: stats = [
    { label: 'Total', value: projects.length, icon: FolderKanban, color: 'from-blue-500 to-blue-600' },
    { label: 'À la une', value: featuredCount, icon: Star, color: 'from-yellow-500 to-yellow-600' },
    { label: 'Catégories', value: categories.length, icon: Filter, color: 'from-purple-500 to-purple-600' },
    { label: 'Avec image', value: projects.filter(p => p.images?.length > 0).length, icon: ImageOff, color: 'from-green-500 to-green-600' },
  ]
</script>

<div class="space-y-6">
  <!-- Header -->
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div>
      <h1 class="text-3xl font-bold tracking-tight">Projets</h1>
      <p class="text-sm text-gray-500 mt-1">{projects.length} projet{projects.length > 1 ? 's' : ''} · {featuredCount} à la une</p>
    </div>
    <div class="flex items-center gap-2">
      <button on:click={() => showGithub = true} class="btn-ghost border border-gray-300 dark:border-gray-600 gap-2 text-sm">
        <Github size={16} /> Importer
      </button>
      <a href="/admin/projects/new" class="btn-primary gap-2 text-sm">
        <Plus size={16} /> Nouveau projet
      </a>
    </div>
  </div>

  <!-- Stats Cards -->
  <div class="grid grid-cols-2 md:grid-cols-4 gap-3">
    {#each stats as s}
      <div class="card p-4 flex items-center gap-3">
        <div class="w-10 h-10 rounded-xl bg-gradient-to-br {s.color} flex items-center justify-center text-white">
          <svelte:component this={s.icon} size={18} />
        </div>
        <div>
          <div class="text-2xl font-bold">{s.value}</div>
          <div class="text-xs text-gray-500">{s.label}</div>
        </div>
      </div>
    {/each}
  </div>

  <!-- Filters Bar -->
  <div class="card p-3 flex flex-wrap items-center gap-3">
    <div class="relative flex-1 min-w-[200px]">
      <Search size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
      <input type="text" placeholder="Rechercher un projet..." bind:value={search} class="input pl-9 text-sm" />
      {#if search}
        <button on:click={() => search = ''} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600">
          <X size={16} />
        </button>
      {/if}
    </div>
    <select bind:value={categoryFilter} class="input text-sm w-auto min-w-[130px]">
      <option value="">Toutes catégories</option>
      {#each categories as cat}
        <option value={cat}>{CATEGORY_LABELS[cat] || cat}</option>
      {/each}
    </select>
    <button on:click={() => sortMode = sortMode === 'date' ? 'title' : 'date'} class="btn-ghost border border-gray-300 dark:border-gray-600 gap-2 text-sm whitespace-nowrap">
      <ArrowUpDown size={14} /> {sortMode === 'date' ? 'Date' : 'Titre'}
    </button>
    <div class="flex items-center border border-gray-300 dark:border-gray-600 rounded-lg overflow-hidden">
      <button on:click={() => viewMode = 'grid'} class="p-2 {viewMode === 'grid' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}">
        <Grid size={16} />
      </button>
      <button on:click={() => viewMode = 'list'} class="p-2 {viewMode === 'list' ? 'bg-primary-100 dark:bg-primary-900/30 text-primary-600' : 'text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-800'}">
        <ListIcon size={16} />
      </button>
    </div>
  </div>

  <!-- Projects -->
  {#if loading}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each [1,2,3,4,5,6] as _}
        <div class="card p-0 overflow-hidden animate-pulse">
          <div class="h-40 bg-gray-200 dark:bg-gray-800" />
          <div class="p-4 space-y-2">
            <div class="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
            <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
            <div class="h-8 bg-gray-200 dark:bg-gray-800 rounded w-full" />
          </div>
        </div>
      {/each}
    </div>
  {:else if filtered.length === 0}
    <div class="card py-16 text-center">
      <FolderKanban size={48} class="mx-auto mb-4 text-gray-300" />
      <p class="text-gray-500">Aucun projet trouvé</p>
      {#if search || categoryFilter}
        <button on:click={() => { search = ''; categoryFilter = '' }} class="text-primary-600 text-sm mt-2 hover:underline">Réinitialiser les filtres</button>
      {/if}
    </div>
  {:else if viewMode === 'grid'}
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {#each filtered as project, i}
        <div class="card p-0 overflow-hidden group hover:shadow-lg transition-all duration-300 hover:-translate-y-1 animate-fade-in" style="animation-delay: {i * 50}ms">
          <!-- Image -->
          <div class="relative h-40 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
            {#if project.images?.length > 0}
              <img src={project.images[0]} alt={project.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            {:else}
              <div class="absolute inset-0 flex items-center justify-center">
                <span class="text-4xl font-bold text-gray-300 dark:text-gray-700">{project.title?.charAt(0)?.toUpperCase()}</span>
              </div>
            {/if}
            <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            <div class="absolute top-2 right-2 flex gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
              <a href="/admin/projects/{project.id}" class="p-1.5 rounded-lg bg-white/90 text-gray-700 hover:bg-white">
                <Pencil size={14} />
              </a>
              <button on:click={() => toggleFeatured(project.id, project.featured)} class="p-1.5 rounded-lg bg-white/90 {project.featured ? 'text-yellow-500' : 'text-gray-400'} hover:bg-white">
                <Star size={14} class={project.featured ? 'fill-yellow-500' : ''} />
              </button>
              <button on:click={() => deleting = project.id} class="p-1.5 rounded-lg bg-white/90 text-red-500 hover:bg-white">
                <Trash2 size={14} />
              </button>
            </div>
            {#if project.featured}
              <div class="absolute top-2 left-2 px-2 py-0.5 rounded-full bg-yellow-500 text-white text-xs font-medium flex items-center gap-1 shadow-lg">
                <Sparkles size={12} /> À la une
              </div>
            {/if}
          </div>
          <!-- Info -->
          <div class="p-4">
            <h3 class="font-semibold truncate group-hover:text-primary-600 transition-colors">{project.title}</h3>
            <div class="flex items-center gap-2 mt-1 mb-3">
              <span class="badge-primary text-xs">{CATEGORY_LABELS[project.category] || project.category}</span>
              {#if project.date}
                <span class="text-xs text-gray-400">{new Date(project.date).toLocaleDateString('fr-FR')}</span>
              {/if}
            </div>
            <p class="text-xs text-gray-500 line-clamp-2 leading-relaxed">{project.description || 'Aucune description'}</p>
            {#if project.technologies}
              <div class="flex flex-wrap gap-1 mt-3">
                {#each project.technologies.split(',').slice(0, 3) as tech}
                  <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">{tech.trim()}</span>
                {/each}
                {#if project.technologies.split(',').length > 3}
                  <span class="text-xs text-gray-400">+{project.technologies.split(',').length - 3}</span>
                {/if}
              </div>
            {/if}
          </div>
        </div>
      {/each}
    </div>
  {:else}
    <!-- List View -->
    <div class="space-y-2">
      {#each filtered as project}
        <div class="card p-4 flex items-center gap-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-all group">
          <div class="w-14 h-14 rounded-xl bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden flex-shrink-0">
            {#if project.images?.length > 0}
              <img src={project.images[0]} alt="" class="w-full h-full object-cover" />
            {:else}
              <div class="w-full h-full flex items-center justify-center text-lg font-bold text-gray-300">{project.title?.charAt(0)}</div>
            {/if}
          </div>
          <div class="flex-1 min-w-0">
            <div class="flex items-center gap-2">
              <h3 class="font-semibold truncate">{project.title}</h3>
              {#if project.featured}<Star size={14} class="text-yellow-500 fill-yellow-500 flex-shrink-0" />{/if}
            </div>
            <div class="flex items-center gap-2 mt-0.5">
              <span class="badge-primary text-xs">{CATEGORY_LABELS[project.category] || project.category}</span>
              {#if project.date}<span class="text-xs text-gray-400">{new Date(project.date).toLocaleDateString('fr-FR')}</span>{/if}
            </div>
          </div>
          <div class="flex items-center gap-1.5 opacity-0 group-hover:opacity-100 transition-opacity">
            <button on:click={() => toggleFeatured(project.id, project.featured)} class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 {project.featured ? 'text-yellow-500' : 'text-gray-400'}">
              <Star size={16} class={project.featured ? 'fill-yellow-500' : ''} />
            </button>
            <a href="/admin/projects/{project.id}" class="p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-500">
              <Pencil size={16} />
            </a>
            <button on:click={() => deleting = project.id} class="p-2 rounded-lg hover:bg-red-100 dark:hover:bg-red-900/30 text-red-500">
              <Trash2 size={16} />
            </button>
          </div>
        </div>
      {/each}
    </div>
  {/if}
</div>

<!-- GitHub Sync Modal -->
{#if showGithub}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-noninteractive-element-interactions -->
  <div role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" on:click={() => showGithub = false} on:keydown={(e) => e.key === 'Escape' && (showGithub = false)}>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-noninteractive-element-interactions -->
    <div class="card max-w-sm w-full space-y-4" on:click|stopPropagation>
      <h2 class="font-semibold">Importer depuis GitHub</h2>
      <p class="text-sm text-gray-500">Les repos publics seront importés comme projets.</p>
      <input type="text" bind:value={githubUser} placeholder="Nom d'utilisateur GitHub" class="input" />
      <div class="flex gap-2 justify-end">
        <button on:click={() => showGithub = false} class="btn-secondary text-sm">Annuler</button>
        <button on:click={syncGithub} disabled={!githubUser || syncing} class="btn-primary text-sm">{syncing ? 'Importation...' : 'Importer'}</button>
      </div>
    </div>
  </div>
{/if}

<!-- Delete Confirmation Modal -->
{#if deleting}
  <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-noninteractive-element-interactions -->
  <div role="dialog" aria-modal="true" class="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4" on:click={() => deleting = null} on:keydown={(e) => e.key === 'Escape' && (deleting = null)}>
    <!-- svelte-ignore a11y-click-events-have-key-events a11y-no-static-element-interactions a11y-noninteractive-element-interactions -->
    <div class="card max-w-sm w-full space-y-4" on:click|stopPropagation>
      <h2 class="font-semibold text-red-600">Supprimer le projet ?</h2>
      <p class="text-sm text-gray-500">Cette action est irréversible.</p>
      <div class="flex gap-2 justify-end">
        <button on:click={() => deleting = null} class="btn-secondary text-sm">Annuler</button>
        <button on:click={confirmDelete} class="btn-danger text-sm">Supprimer</button>
      </div>
    </div>
  </div>
{/if}
