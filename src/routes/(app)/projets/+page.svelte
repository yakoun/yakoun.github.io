<script lang="ts">
  import { supabase } from '$lib/api/supabase'
  import { CATEGORIES, CATEGORY_LABELS } from '$lib/types'
  import { onMount } from 'svelte'
  import { Calendar, ArrowRight, Filter, Sparkles, Search, X } from 'lucide-svelte'

  let projects: any[] = []
  let loading = true
  let activeCategory = ''
  let searchQuery = ''

  onMount(async () => {
    try {
      const { data } = await supabase.from('projects').select('*').order('date', { ascending: false })
      projects = data || []
    } catch (_) { /* offline */ }
    loading = false
  })

  $: categories = [...new Set(projects.map(p => p.category))].filter(Boolean)
  $: featured = projects.filter(p => p.featured)

  $: filtered = projects.filter(p => {
    if (activeCategory && p.category !== activeCategory) return false
    if (searchQuery && !p.title.toLowerCase().includes(searchQuery.toLowerCase()) && !(p.description || '').toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })
</script>

<svelte:head><title>Projets — Portfolio</title></svelte:head>

<section class="pt-20 pb-16">
  <!-- Hero -->
  <div class="relative px-4 pt-8 pb-12 text-center overflow-hidden">
    <div class="absolute inset-0 bg-gradient-to-b from-primary-50/50 to-transparent dark:from-primary-950/20 pointer-events-none" />
    <div class="relative max-w-3xl mx-auto">
      <h1 class="text-4xl md:text-5xl font-bold tracking-tight mb-4">
        Mes <span class="text-primary-600">réalisations</span>
      </h1>
      <p class="text-lg text-gray-500 dark:text-gray-400 max-w-xl mx-auto">Des projets concrets, de l'électricité au développement web</p>
    </div>
  </div>

  <div class="max-w-6xl mx-auto px-4">
    <!-- Featured Projects -->
    {#if featured.length > 0 && !activeCategory}
      <div class="mb-12">
        <div class="flex items-center gap-2 mb-6">
          <Sparkles size={20} class="text-yellow-500" />
          <h2 class="text-xl font-bold">Projets à la une</h2>
        </div>
        <div class="grid md:grid-cols-2 gap-5">
          {#each featured.slice(0, 2) as project}
            <a href="/projets/{project.slug}" class="group relative rounded-2xl overflow-hidden bg-gradient-to-br from-primary-600 to-purple-700 text-white p-8 min-h-[280px] flex flex-col justify-end transition-transform duration-300 hover:scale-[1.02]">
              {#if project.images?.length > 0}
                <img src={project.images[0]} alt="" class="absolute inset-0 w-full h-full object-cover opacity-40 group-hover:opacity-50 transition-opacity" />
              {/if}
              <div class="relative">
                <span class="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-white/20 text-xs font-medium backdrop-blur-sm mb-3">
                  <Sparkles size={12} /> À la une
                </span>
                <h3 class="text-2xl font-bold mb-2">{project.title}</h3>
                <p class="text-white/80 text-sm line-clamp-2 mb-4">{project.description}</p>
                <span class="inline-flex items-center gap-1 text-sm font-medium text-white/90 group-hover:gap-2 transition-all">
                  Voir le projet <ArrowRight size={14} />
                </span>
              </div>
            </a>
          {/each}
        </div>
      </div>
    {/if}

    <!-- Filter Bar -->
    <div class="flex flex-wrap items-center gap-3 mb-8 p-4 rounded-2xl bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 shadow-sm">
      <Filter size={18} class="text-gray-400 flex-shrink-0" />
      <button on:click={() => activeCategory = ''}
        class="px-4 py-1.5 rounded-full text-sm font-medium transition-all {!activeCategory ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}">
        Tout
      </button>
      {#each categories as cat}
        <button on:click={() => activeCategory = cat}
          class="px-4 py-1.5 rounded-full text-sm font-medium transition-all capitalize {activeCategory === cat ? 'bg-primary-600 text-white shadow-lg shadow-primary-500/25' : 'bg-gray-100 dark:bg-gray-800 text-gray-600 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-gray-700'}">
          {CATEGORY_LABELS[cat] || cat.replace('-', ' ')}
        </button>
      {/each}
      <div class="flex-1 min-w-[150px] relative">
        <Search size={16} class="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
        <input type="text" placeholder="Rechercher..." bind:value={searchQuery} class="input pl-9 text-sm w-full" />
        {#if searchQuery}<button on:click={() => searchQuery = ''} class="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"><X size={16} /></button>{/if}
      </div>
    </div>

    <!-- Projects Grid -->
    {#if loading}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {#each [1,2,3,4,5,6] as _}
          <div class="rounded-2xl overflow-hidden animate-pulse bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800">
            <div class="h-48 bg-gray-200 dark:bg-gray-800" />
            <div class="p-5 space-y-2">
              <div class="h-5 bg-gray-200 dark:bg-gray-800 rounded w-3/4" />
              <div class="h-3 bg-gray-200 dark:bg-gray-800 rounded w-1/2" />
              <div class="h-8 bg-gray-200 dark:bg-gray-800 rounded" />
            </div>
          </div>
        {/each}
      </div>
    {:else if filtered.length === 0}
      <div class="text-center py-20">
        <div class="text-6xl mb-4 opacity-30">🔍</div>
        <p class="text-lg text-gray-500">Aucun projet trouvé</p>
        <button on:click={() => { activeCategory = ''; searchQuery = '' }} class="text-primary-600 text-sm mt-2 hover:underline">Réinitialiser</button>
      </div>
    {:else}
      <div class="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {#each filtered as project, i}
          <a href="/projets/{project.slug}" class="group rounded-2xl overflow-hidden bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 hover:border-primary-300 dark:hover:border-primary-700 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 animate-fade-in" style="animation-delay: {i * 80}ms">
            <!-- Image -->
            <div class="relative h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-800 dark:to-gray-900 overflow-hidden">
              {#if project.images?.length > 0}
                <img src={project.images[0]} alt={project.title} class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              {:else}
                <div class="absolute inset-0 flex items-center justify-center">
                  <span class="text-5xl font-bold text-gray-300 dark:text-gray-700">{project.title?.charAt(0)?.toUpperCase()}</span>
                </div>
              {/if}
              <div class="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              {#if project.featured}
                <span class="absolute top-3 left-3 px-2.5 py-1 rounded-full bg-yellow-500 text-white text-xs font-medium flex items-center gap-1 shadow-lg">
                  <Sparkles size={12} /> À la une
                </span>
              {/if}
            </div>
            <!-- Content -->
            <div class="p-5">
              <div class="flex items-center gap-2 mb-2">
                <span class="badge-primary text-xs">{CATEGORY_LABELS[project.category] || project.category}</span>
                {#if project.date}
                  <span class="text-xs text-gray-400 flex items-center gap-1"><Calendar size={12} />{new Date(project.date).toLocaleDateString('fr-FR', { year: 'numeric' })}</span>
                {/if}
              </div>
              <h3 class="font-semibold group-hover:text-primary-600 transition-colors">{project.title}</h3>
              <p class="text-sm text-gray-500 mt-2 line-clamp-2 leading-relaxed">{project.description || 'Aucune description'}</p>
              {#if project.technologies}
                <div class="flex flex-wrap gap-1.5 mt-3">
                  {#each project.technologies.split(',').slice(0, 3) as tech}
                    <span class="px-2 py-0.5 rounded-md bg-gray-100 dark:bg-gray-800 text-xs text-gray-600 dark:text-gray-400">{tech.trim()}</span>
                  {/each}
                  {#if project.technologies.split(',').length > 3}
                    <span class="text-xs text-gray-400">+{project.technologies.split(',').length - 3}</span>
                  {/if}
                </div>
              {/if}
            </div>
          </a>
        {/each}
      </div>
    {/if}
  </div>
</section>
